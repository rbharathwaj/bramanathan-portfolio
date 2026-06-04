// ── Travel places data ────────────────────────────────────────────────────────
//
// PHOTO NAMING CONVENTION (drop files in public/travel/<slug>/):
//   cover.jpg        — shown on the postcard card and as the page hero
//   1.jpg, 2.jpg, … — gallery photos, numbered sequentially with no gaps
//
// Supported formats: .jpg / .jpeg / .JPG / .JPEG  (all tried automatically)
// coords: [longitude, latitude] — used for world map marker placement
// ─────────────────────────────────────────────────────────────────────────────

export const PLACES = [
  {
    id: 1, slug: 'london',
    name: 'London', region: 'United Kingdom', flagCode: 'gb',
    coords: [-0.13, 51.51],
    content: {
      memories:        '[Write your London memories here — what you saw, felt, experienced]',
      recommendations: '[Restaurants, museums, neighbourhoods worth visiting]',
      tips:            '[Tips for someone visiting London for the first time]',
    },
  },
  {
    id: 2, slug: 'leeds',
    name: 'Leeds', region: 'United Kingdom', flagCode: 'gb',
    coords: [-1.55, 53.80],
    content: {
      memories:        '[Your Leeds memories]',
      recommendations: '[What to do and see in Leeds]',
      tips:            '[Tips for visiting Leeds]',
    },
  },
  {
    id: 3, slug: 'singapore',
    name: 'Singapore', region: 'Singapore', flagCode: 'sg',
    coords: [103.82, 1.35],
    content: {
      memories:        '[Your Singapore memories]',
      recommendations: '[Best hawker centres, gardens, neighbourhoods]',
      tips:            '[Tips for visiting Singapore]',
    },
  },
  {
    id: 14, slug: 'liverpool',
    name: 'Liverpool', region: 'United Kingdom', flagCode: 'gb',
    coords: [-2.99, 53.41],
    content: {
      memories:        '[Your Liverpool memories]',
      recommendations: '[The Beatles, waterfront, what to see]',
      tips:            '[Tips for visiting Liverpool]',
    },
  },
  {
    id: 15, slug: 'york',
    name: 'York', region: 'United Kingdom', flagCode: 'gb',
    coords: [-1.08, 53.96],
    content: {
      memories:        '[Your York memories]',
      recommendations: '[The Shambles, York Minster, things to do]',
      tips:            '[Tips for visiting York]',
    },
  },
  {
    id: 4, slug: 'vietnam',
    name: 'Vietnam', region: 'Vietnam', flagCode: 'vn',
    coords: [107.0, 16.5],
    content: {
      memories:        '[Your Vietnam memories — cities you visited, food, people]',
      recommendations: '[Places to eat, things to do, where to go]',
      tips:            '[Tips for visiting Vietnam]',
    },
  },
  {
    id: 5, slug: 'nashville',
    name: 'Nashville', region: 'Tennessee, USA', flagCode: 'us',
    coords: [-86.78, 36.16],
    content: {
      memories:        '[Your Nashville memories]',
      recommendations: '[Music venues, food, things to do]',
      tips:            '[Tips for visiting Nashville]',
    },
  },
  {
    id: 6, slug: 'atlanta',
    name: 'Atlanta', region: 'Georgia, USA', flagCode: 'us',
    coords: [-84.39, 33.75],
    content: {
      memories:        '[Your Atlanta memories]',
      recommendations: '[Things to do and see in Atlanta]',
      tips:            '[Tips for visiting Atlanta]',
    },
  },
  {
    id: 7, slug: 'las-vegas',
    name: 'Las Vegas', region: 'Nevada, USA', flagCode: 'us',
    coords: [-115.14, 36.17],
    content: {
      memories:        '[Your Las Vegas memories]',
      recommendations: '[Shows, food, things beyond the strip]',
      tips:            '[Tips for visiting Las Vegas]',
    },
  },
  {
    id: 16, slug: 'chicago',
    name: 'Chicago', region: 'Illinois, USA', flagCode: 'us',
    coords: [-87.63, 41.88],
    content: {
      memories:        '[Your Chicago memories]',
      recommendations: '[Architecture, food, things to do]',
      tips:            '[Tips for visiting Chicago]',
    },
  },
  {
    id: 17, slug: 'seattle',
    name: 'Seattle', region: 'Washington, USA', flagCode: 'us',
    coords: [-122.33, 47.61],
    content: {
      memories:        '[Your Seattle memories]',
      recommendations: '[Pike Place, coffee culture, things to do]',
      tips:            '[Tips for visiting Seattle]',
    },
  },
  {
    id: 9, slug: 'orlando',
    name: 'Orlando', region: 'Florida, USA', flagCode: 'us',
    coords: [-81.38, 28.54],
    content: {
      memories:        '[Your Orlando memories]',
      recommendations: '[Parks, things to do beyond the theme parks]',
      tips:            '[Tips for visiting Orlando]',
    },
  },
  {
    id: 11, slug: 'south-karnataka',
    name: 'South Karnataka Biking', region: 'Karnataka, India', flagCode: 'in',
    coords: [76.6, 12.3],
    content: {
      memories:        '[Your biking trip memories — routes, roads, landscapes, what made it special]',
      recommendations: '[Best routes, food stops, towns worth visiting]',
      tips:            '[Tips for a biking trip through South Karnataka]',
    },
  },
  {
    id: 12, slug: 'andaman',
    name: 'Andaman Islands', region: 'India', flagCode: 'in',
    coords: [92.66, 11.74],
    content: {
      memories:        '[Your Andaman memories — beaches, water, islands you visited]',
      recommendations: '[Best beaches, dives, places to stay]',
      tips:            '[Tips for visiting the Andaman Islands]',
    },
  },
  {
    id: 13, slug: 'rajasthan',
    name: 'Rajasthan', region: 'India', flagCode: 'in',
    coords: [75.79, 26.91],
    content: {
      memories:        '[Your Rajasthan memories — forts, deserts, cities, colours]',
      recommendations: '[Forts, cities, food, experiences]',
      tips:            '[Tips for visiting Rajasthan]',
    },
  },
];

export const BUCKET_LIST = [
  'Iceland',
  'Germany',
  'China',
  'Los Angeles, USA',
];
