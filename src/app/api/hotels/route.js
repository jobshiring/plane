import { NextResponse } from 'next/server';

const ACTOR_SLUG = 'parseforge~hotel-booking-sites-direct-hotel-websites-scraper';

function mapApifyHotelToExpected(apifyHotel) {
  if (!apifyHotel) apifyHotel = {};
  
  // Try to extract common fields from different possible Apify response formats
  const name = apifyHotel.hotelName || apifyHotel.name || apifyHotel.title || 'Unknown Hotel';
  const city = apifyHotel.city || apifyHotel.location?.city || 'Unknown Location';
  
  // Try to get a price
  let price = 0;
  if (typeof apifyHotel.lowestNightlyRate === 'number') price = apifyHotel.lowestNightlyRate;
  else if (typeof apifyHotel.price === 'number') price = apifyHotel.price;
  else if (typeof apifyHotel.pricePerNight === 'number') price = apifyHotel.pricePerNight;
  
  // Get stars
  let stars = 0;
  if (typeof apifyHotel.starRating === 'number') stars = apifyHotel.starRating;
  else if (typeof apifyHotel.stars === 'number') stars = apifyHotel.stars;
  
  // Get guest rating
  let rating = 0;
  if (typeof apifyHotel.guestRating === 'number') rating = apifyHotel.guestRating;
  else if (typeof apifyHotel.rating === 'number') rating = apifyHotel.rating;
  
  // Get image
  let image = apifyHotel.image || apifyHotel.photo || apifyHotel.picture || 'hotel_1.jpg';
  // If image is an object, try to get url
  if (image && typeof image === 'object') {
    image = image.url || image.src || 'hotel_1.jpg';
  }
  
  return {
    id: apifyHotel.hotelId || apifyHotel.id || apifyHotel.url || `hotel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: name,
    location: city,
    price: price,
    stars: stars,
    rating: rating,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'unknown-hotel',
    hotelAmenities: apifyHotel.amenities || apifyHotel.hotelAmenities || [],
    roomAmenities: apifyHotel.roomAmenities || [],
    image: image,
    viewing: Math.floor(Math.random() * 20) + 1,
    ratingText: apifyHotel.guestRatingCategory || apifyHotel.ratingText || 'Guest Rating',
    reviews: apifyHotel.reviewCount || apifyHotel.reviews || 0,
  };
}

async function getRunStatus(token, runId) {
  let url = `https://api.apify.com/v2/actor-runs/${runId}`;
  if (token) url += `?token=${token}`;
  
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Apify get run status failed: ${res.status} ${txt}`);
  }
  return res.json();
}

async function startActorRun(token, input) {
  const url = `https://api.apify.com/v2/acts/${ACTOR_SLUG}/runs?token=${token}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input), // Don't wrap in { input: ... }
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Apify start run failed: ${res.status} ${txt}`);
  }
  return res.json();
}

async function fetchRunDataset(token, runId, maxItems = 100) {
  // First check if run is finished
  let runStatus;
  try {
    runStatus = await getRunStatus(token, runId);
  } catch (e) {
    console.warn('Could not get run status, proceeding anyway', e);
  }
  
  // Only try to get dataset if run is finished
  const isFinished = runStatus?.data?.status === 'SUCCEEDED' || 
                     runStatus?.data?.status === 'FAILED' || 
                     runStatus?.data?.status === 'ABORTED' || 
                     runStatus?.data?.status === 'TIMED_OUT';
  
  if (!isFinished && runStatus) {
    console.log('Run not finished yet, status:', runStatus?.data?.status);
    return [];
  }
  
  // Try without token first for public datasets
  let url = `https://api.apify.com/v2/actor-runs/${runId}/dataset/items?format=json&clean=true&limit=${maxItems}`;
  let res = await fetch(url);
  
  // If that fails and we have a token, try with token
  if (!res.ok && token) {
    url = `https://api.apify.com/v2/actor-runs/${runId}/dataset/items?format=json&clean=true&limit=${maxItems}&token=${token}`;
    res = await fetch(url);
  }
  
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Apify fetch dataset failed: ${res.status} ${txt}`);
  }
  const rawItems = await res.json();
  console.log('Raw Apify items:', rawItems.slice(0, 3));
  // Filter out error items
  const validItems = rawItems.filter(item => !item.error && !item.errorType);
  const mapped = validItems.map(mapApifyHotelToExpected);
  console.log('Mapped items:', mapped.slice(0, 3));
  return mapped;
}

export async function POST(req) {
  try {
    const token = process.env.APIFY_TOKEN;
    console.log('APIFY_TOKEN available:', !!token);
    if (!token) return NextResponse.json({ error: 'Missing APIFY_TOKEN' }, { status: 500 });

    const body = await req.json();
    console.log('POST /api/hotels received body:', body);

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
    console.log('Starting Apify run with input:', input);

    // If a runId was supplied, try to fetch its dataset instead of starting a new run
    if (body.runId) {
      console.log('Using existing runId:', body.runId);
      const items = await fetchRunDataset(token, body.runId, body.maxItems);
      return NextResponse.json({ runId: body.runId, items });
    }

    const run = await startActorRun(token, input);
    console.log('Apify run started:', run);
    return NextResponse.json({ runId: run.data?.id || run.id || null, run });
  } catch (err) {
    console.error('POST /api/hotels error:', err);
    return NextResponse.json({ error: err.message || String(err), stack: err.stack }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const token = process.env.APIFY_TOKEN;
    const url = new URL(req.url);
    const runId = url.searchParams.get('runId');
    const maxItems = url.searchParams.get('maxItems') || 100;
    if (!runId) return NextResponse.json({ error: 'runId query param required' }, { status: 400 });

    console.log('GET /api/hotels fetching runId:', runId);
    const items = await fetchRunDataset(token, runId, maxItems);
    return NextResponse.json({ runId, items });
  } catch (err) {
    console.error('GET /api/hotels error:', err);
    return NextResponse.json({ error: err.message || String(err), stack: err.stack }, { status: 500 });
  }
}
