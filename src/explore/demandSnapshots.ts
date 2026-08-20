/**
 * Supplies representative demand records for the first public Explore surface.
 * These records demonstrate the shape and usefulness of a future common demand
 * graph without implying that collection, persistence, or live demand exists.
 * Keep every value visibly identified as illustrative wherever it is rendered.
 */
export type DemandCategory = 'Home' | 'Mobility' | 'Tools' | 'Health';

export interface DemandSnapshot {
  identifier: string;
  title: string;
  category: DemandCategory;
  summary: string;
  representedPeople: number;
  trendPercent: number;
  targetPrice: number;
  availableSupply: 'none' | 'partial';
  variants: readonly { label: string; sharePercent: number }[];
  painPoints: readonly { label: string; sharePercent: number }[];
  regions: readonly { label: string; sharePercent: number }[];
  demandCurve: readonly { price: number; people: number }[];
}

export const demandSnapshots: readonly DemandSnapshot[] = [
  {
    identifier: 'quiet-room-cooling',
    title: 'Quiet room cooling without a large energy bill',
    category: 'Home',
    summary: 'Sleep-safe cooling for renters, with no permanent installation.',
    representedPeople: 18420,
    trendPercent: 11,
    targetPrice: 240,
    availableSupply: 'partial',
    variants: [
      { label: 'Bedroom quiet', sharePercent: 78 },
      { label: 'Renter-safe', sharePercent: 63 },
      { label: 'Low energy use', sharePercent: 59 },
    ],
    painPoints: [
      { label: 'Too loud at night', sharePercent: 74 },
      { label: 'Window does not fit', sharePercent: 51 },
      { label: 'Power cost', sharePercent: 46 },
    ],
    regions: [
      { label: 'North America', sharePercent: 42 },
      { label: 'South Asia', sharePercent: 31 },
      { label: 'Europe', sharePercent: 18 },
    ],
    demandCurve: [
      { price: 100, people: 18200 },
      { price: 200, people: 14200 },
      { price: 300, people: 8700 },
      { price: 400, people: 3900 },
      { price: 500, people: 1600 },
    ],
  },
  {
    identifier: 'stays-up-socks',
    title: 'Soft socks that stay up all day',
    category: 'Home',
    summary: 'Everyday socks that stay soft, breathe, and leave no elastic marks.',
    representedPeople: 12840,
    trendPercent: 7,
    targetPrice: 18,
    availableSupply: 'partial',
    variants: [
      { label: 'Seamless toe', sharePercent: 68 },
      { label: 'Wide calf', sharePercent: 46 },
      { label: 'Merino', sharePercent: 39 },
    ],
    painPoints: [
      { label: 'Slides down', sharePercent: 72 },
      { label: 'Loses softness', sharePercent: 55 },
      { label: 'Elastic marks', sharePercent: 41 },
    ],
    regions: [
      { label: 'North America', sharePercent: 47 },
      { label: 'Europe', sharePercent: 29 },
      { label: 'Other', sharePercent: 24 },
    ],
    demandCurve: [
      { price: 8, people: 12600 },
      { price: 12, people: 10300 },
      { price: 18, people: 7200 },
      { price: 24, people: 3800 },
      { price: 30, people: 1700 },
    ],
  },
  {
    identifier: 'compact-torque-sensor',
    title: 'Compact torque sensor below $25',
    category: 'Tools',
    summary: 'A 0–50 Nm sensor with ±1% accuracy for small robotics projects.',
    representedPeople: 9320,
    trendPercent: 24,
    targetPrice: 25,
    availableSupply: 'none',
    variants: [
      { label: 'Low quantity', sharePercent: 71 },
      { label: '30 mm maximum', sharePercent: 57 },
      { label: 'Open interface', sharePercent: 48 },
    ],
    painPoints: [
      { label: 'Current price', sharePercent: 82 },
      { label: 'Large minimum order', sharePercent: 64 },
      { label: 'Poor documentation', sharePercent: 44 },
    ],
    regions: [
      { label: 'South Asia', sharePercent: 38 },
      { label: 'North America', sharePercent: 33 },
      { label: 'Europe', sharePercent: 21 },
    ],
    demandCurve: [
      { price: 15, people: 9100 },
      { price: 25, people: 7600 },
      { price: 40, people: 4300 },
      { price: 70, people: 1800 },
      { price: 100, people: 620 },
    ],
  },
  {
    identifier: 'safe-cargo-bike',
    title: 'Weather-safe cargo bike for two children',
    category: 'Mobility',
    summary: 'Stable school transport with storage and useful rain protection.',
    representedPeople: 7460,
    trendPercent: 15,
    targetPrice: 1800,
    availableSupply: 'partial',
    variants: [
      { label: 'Two children', sharePercent: 73 },
      { label: 'Rain cover', sharePercent: 66 },
      { label: 'Apartment storage', sharePercent: 37 },
    ],
    painPoints: [
      { label: 'High price', sharePercent: 79 },
      { label: 'Theft risk', sharePercent: 58 },
      { label: 'Too wide', sharePercent: 35 },
    ],
    regions: [
      { label: 'Europe', sharePercent: 51 },
      { label: 'North America', sharePercent: 37 },
      { label: 'Other', sharePercent: 12 },
    ],
    demandCurve: [
      { price: 900, people: 7300 },
      { price: 1400, people: 6100 },
      { price: 1800, people: 4200 },
      { price: 2400, people: 1800 },
      { price: 3200, people: 640 },
    ],
  },
  {
    identifier: 'medication-organizer',
    title: 'Medication organizer that prevents missed doses',
    category: 'Health',
    summary: 'A private, simple reminder for people who do not want another app.',
    representedPeople: 6890,
    trendPercent: 9,
    targetPrice: 45,
    availableSupply: 'partial',
    variants: [
      { label: 'No subscription', sharePercent: 81 },
      { label: 'Caregiver signal', sharePercent: 54 },
      { label: 'Travel size', sharePercent: 36 },
    ],
    painPoints: [
      { label: 'Setup complexity', sharePercent: 69 },
      { label: 'Privacy', sharePercent: 61 },
      { label: 'Hard to refill', sharePercent: 34 },
    ],
    regions: [
      { label: 'North America', sharePercent: 49 },
      { label: 'Europe', sharePercent: 28 },
      { label: 'Other', sharePercent: 23 },
    ],
    demandCurve: [
      { price: 20, people: 6700 },
      { price: 35, people: 5600 },
      { price: 45, people: 4100 },
      { price: 70, people: 1900 },
      { price: 100, people: 700 },
    ],
  },
];

export const demandCategories: readonly ('All' | DemandCategory)[] = [
  'All',
  'Home',
  'Mobility',
  'Tools',
  'Health',
];
