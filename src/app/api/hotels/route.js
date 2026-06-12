import { NextResponse } from 'next/server';

const ACTOR_SLUG = 'parseforge~hotel-booking-sites-direct-hotel-websites-scraper';

async function startActorRun(token, input) {
  const url = `https://api.apify.com/v2/acts/${ACTOR_SLUG}/runs?token=${token}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Apify start run failed: ${res.status} ${txt}`);
  }
  return res.json();
}

async function fetchRunDataset(token, runId, maxItems = 100) {
  const url = `https://api.apify.com/v2/actor-runs/${runId}/dataset/items?format=json&clean=true&limit=${maxItems}&token=${token}`;
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Apify fetch dataset failed: ${res.status} ${txt}`);
  }
  return res.json();
}

export async function POST(req) {
  try {
    const token = process.env.APIFY_TOKEN;
    if (!token) return NextResponse.json({ error: 'Missing APIFY_TOKEN' }, { status: 500 });

    const body = await req.json();

    // Map expected actor input fields. The actor accepts `locationSlug` or `locationId`.
    const input = {
      locationSlug: body.locationSlug,
      locationId: body.locationId,
      checkinDate: body.checkinDate,
      checkoutDate: body.checkoutDate,
      adults: body.adults ?? 1,
      rooms: body.rooms ?? 1,
      maxItems: body.maxItems ?? 50,
      minStarRating: body.minStarRating,
      minGuestRating: body.minGuestRating,
      freeBreakfastOnly: body.freeBreakfastOnly,
      freeCancellationOnly: body.freeCancellationOnly,
      propertyTypes: body.propertyTypes,
    };

    // If a runId was supplied, try to fetch its dataset instead of starting a new run
    if (body.runId) {
      const items = await fetchRunDataset(token, body.runId, body.maxItems);
      return NextResponse.json({ runId: body.runId, items });
    }

    const run = await startActorRun(token, input);
    return NextResponse.json({ runId: run.data?.id || run.id || null, run });
  } catch (err) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const token = process.env.APIFY_TOKEN;
    if (!token) return NextResponse.json({ error: 'Missing APIFY_TOKEN' }, { status: 500 });

    const url = new URL(req.url);
    const runId = url.searchParams.get('runId');
    const maxItems = url.searchParams.get('maxItems') || 100;
    if (!runId) return NextResponse.json({ error: 'runId query param required' }, { status: 400 });

    const items = await fetchRunDataset(token, runId, maxItems);
    return NextResponse.json({ runId, items });
  } catch (err) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
