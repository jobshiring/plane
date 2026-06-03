import { NextResponse } from 'next/server';

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const APIFY_API_BASE = 'https://api.apify.com/v2';
const APIFY_ACTOR_IDS = {
  skyscanner: process.env.APIFY_ACTOR_ID || 'makework36~flight-price-scraper',
  kayak: process.env.APIFY_ACTOR_ID_KAYAK || 'shahidirfan~kayak-flights-scraper',
};

if (!APIFY_API_TOKEN) {
  throw new Error('Missing required environment variable APIFY_API_TOKEN');
}

function normalizeCabinClass(value) {
  const mapping = {
    economy: 'ECONOMY',
    'economy-premium': 'PREMIUM_ECONOMY',
    'premium_economy': 'PREMIUM_ECONOMY',
    business: 'BUSINESS',
    first: 'FIRST',
  };
  return mapping[value?.toLowerCase()] || value?.toUpperCase() || 'ECONOMY';
}

function getActorId(provider) {
  const key = String(provider || 'skyscanner').toLowerCase();
  return APIFY_ACTOR_IDS[key] || APIFY_ACTOR_IDS.skyscanner;
}

function buildKayakSearchUrl(input) {
  const origin = String(input.origin || input.originCode || '').toUpperCase();
  const destination = String(input.destination || input.destinationCode || '').toUpperCase();
  const departDate = String(input.departDate || input.departureDate || '').trim();
  const returnDate = String(input.returnDate || input.return_date || '').trim();
  const tripType = String(input.tripType || input.type || '').toLowerCase();

  const routeSegment = `${origin}-${destination}`;
  let url = `https://www.kayak.com/flights/${routeSegment}/${departDate}`;

  if (tripType === 'round' && returnDate) {
    url += `/${returnDate}`;
  }

  return url;
}

function buildApifyInput(provider, input) {
  if (String(provider).toLowerCase() === 'kayak') {
    const url = buildKayakSearchUrl(input);
    if (!url) {
      throw new Error('Kayak input requires origin, destination, and departDate.');
    }
    return { url };
  }

  return {
    ...input,
    cabinClass: normalizeCabinClass(input?.cabinClass || input?.class),
  };
}

async function getRunDatasetId(runId) {
  const url = `${APIFY_API_BASE}/actor-runs/${runId}?token=${APIFY_API_TOKEN}`;
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Apify run lookup failed: ${response.status} ${response.statusText} - ${body}`);
  }

  const json = await response.json();
  return json?.data?.defaultDatasetId;
}

async function startApifyRun(actorId, provider, input) {
  const normalizedInput = buildApifyInput(provider, input);

  const runUrl = `${APIFY_API_BASE}/actors/${actorId}/runs?waitForFinish=60&token=${APIFY_API_TOKEN}`;

  const runResponse = await fetch(runUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(normalizedInput),
  });

  if (!runResponse.ok) {
    const errorBody = await runResponse.text();
    throw new Error(`Apify run failed: ${runResponse.status} ${runResponse.statusText} - ${errorBody}`);
  }

  const runJson = await runResponse.json();
  const datasetId = runJson?.data?.defaultDatasetId;

  if (!datasetId) {
    throw new Error('Apify run did not return a dataset ID.');
  }

  const datasetUrl = `${APIFY_API_BASE}/datasets/${datasetId}/items?clean=1&limit=1000&token=${APIFY_API_TOKEN}`;
  const datasetResponse = await fetch(datasetUrl, {
    method: 'GET',
  });

  if (!datasetResponse.ok) {
    const errorBody = await datasetResponse.text();
    throw new Error(`Skyscanner API dataset fetch failed: ${datasetResponse.status} ${datasetResponse.statusText} - ${errorBody}`);
  }

  const datasetItems = await datasetResponse.json();
  return datasetItems;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const provider = body.provider || 'skyscanner';
    const runId = body.runId;
    const actorId = getActorId(provider);
    let datasetId;

    if (runId) {
      datasetId = await getRunDatasetId(runId);
    } else {
      const runResult = await startApifyRun(actorId, provider, body);
      return NextResponse.json({ items: runResult });
    }

    if (!datasetId) {
      throw new Error('Unable to resolve dataset ID for provided run ID.');
    }

    const datasetUrl = `${APIFY_API_BASE}/datasets/${datasetId}/items?clean=1&limit=1000&token=${APIFY_API_TOKEN}`;
    const datasetResponse = await fetch(datasetUrl, { method: 'GET' });

    if (!datasetResponse.ok) {
      const errorBody = await datasetResponse.text();
      throw new Error(`Apify dataset fetch failed: ${datasetResponse.status} ${datasetResponse.statusText} - ${errorBody}`);
    }

    const items = await datasetResponse.json();
    return NextResponse.json({ items });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message || 'Unknown Skyscanner API error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
