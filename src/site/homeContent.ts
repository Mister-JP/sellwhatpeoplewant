/** Stable public vocabulary for explaining what an Opportunity Case contains. */
export const caseAnatomy = [
  {
    title: 'The proposition',
    detail:
      'What could be built, imported, distributed, repaired, or provided, for whom, and in which market.',
  },
  {
    title: 'The observed gap',
    detail:
      'What appears unavailable, overpriced, slow, unreliable, inconvenient, or poorly adapted compared with real alternatives.',
  },
  {
    title: 'Demand evidence',
    detail:
      'Who experiences the problem, who may pay, and what purchases, shortages, substitutions, searches, or interviews actually show.',
  },
  {
    title: 'Market structure',
    detail:
      'Competitors, channels, margins, regulation, local institutions, and the forces that could preserve or erase the gap.',
  },
  {
    title: 'The execution path',
    detail:
      'Suppliers, production or import steps, licenses, people, timing, dependencies, and practical bottlenecks.',
  },
  {
    title: 'Unit economics',
    detail:
      'Landed cost, price, working capital, financing, labor, acquisition, cash cycle, break-even, and editable scenarios.',
  },
  {
    title: 'The failure case',
    detail:
      'Contrary evidence, competing explanations, fragile assumptions, ruin conditions, and what remains recoverable.',
  },
  {
    title: 'The next experiment',
    detail:
      'The smallest lawful and ethical action that reduces decisive uncertainty before inventory, debt, or hiring.',
  },
  {
    title: 'The evidence trail',
    detail:
      'Claim-level sources, dates, calculations, conflicts, uncertainty, local limits, corrections, and revision history.',
  },
] as const;

export const researchSteps = [
  [
    'Bound',
    'Which decision are we informing?',
    'Name the market, customer, time window, proposition, and commitment at stake before gathering evidence.',
  ],
  [
    'Triangulate',
    'What is happening beyond what people say?',
    'Compare behaviour, prices, purchases, shortages, substitutes, trade, procurement, interviews, and local conditions.',
  ],
  [
    'Model',
    'What must be true for the business to work?',
    'Connect supply, regulation, labor, capital, timing, price, and volume in an editable operating model.',
  ],
  [
    'Attack',
    'What is the strongest case against it?',
    'Seek hidden incumbents, selection effects, contrary evidence, fragile assumptions, and conditions for ruin.',
  ],
  [
    'Test',
    'What is the cheapest useful next step?',
    'Test the uncertainty most likely to reverse the decision before making a larger commitment.',
  ],
] as const;

export const trustPrinciples = [
  [
    'Claims keep their type',
    'Observed facts, sourced estimates, calculations, interpretations, hypotheses, and recommendations never collapse into one voice.',
  ],
  [
    'Numbers show their work',
    'Material calculations expose inputs, formulas, dates, currencies, jurisdictions, and ranges that readers can change.',
  ],
  [
    'The opposing case remains visible',
    'Each publication seeks evidence that weakens its thesis and states what observation would change the conclusion.',
  ],
  [
    'Local evidence stays local',
    'Evidence from another place remains an analogue until its transfer is justified.',
  ],
  [
    'Corrections do not erase history',
    'Each case preserves what changed, why it changed, and which source, calculation, or observation caused the revision.',
  ],
  [
    'Commercial influence stays separate',
    'Payment cannot purchase a favorable conclusion, ranking, confidence label, or omission of material risk.',
  ],
] as const;
