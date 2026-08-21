/**
 * Supplies the plain-language learning paths on the public "How we know" page.
 * These examples explain the lab's habits without pretending to be market research.
 */
export const pageLinks = [
  ['#idea', 'The basic idea'],
  ['#example', 'A simple example'],
  ['#questions', 'Making a useful question'],
  ['#concepts', 'Opening an important word'],
  ['#evidence', 'Reading evidence'],
  ['#numbers', 'Understanding the numbers'],
  ['#disagreement', 'Disagreement and open ends'],
  ['#sources', 'Sources behind our approach'],
] as const;

export const ordinaryResearchQuestions = [
  ['What happened?', 'Begin with what can actually be seen, heard, counted, or found.'],
  [
    'What does it mean?',
    'Explain the idea in ordinary language before using a formal name.',
  ],
  [
    'How do we know?',
    'Show the source, the path from the source, and the limits of that path.',
  ],
  [
    'What else could explain it?',
    'Keep a serious alternative beside the explanation we currently prefer.',
  ],
  [
    'What would change our mind?',
    'Name the observation that would weaken or reverse the present answer.',
  ],
  [
    'What should we try next?',
    'Learn with the smallest lawful, respectful, and useful real-world test.',
  ],
] as const;

export const questionEvolution = [
  {
    question: 'Is lunch delivery a good business?',
    lesson:
      'Too broad. “Good” has no owner, place, price, time, alternative, or decision attached to it.',
  },
  {
    question: 'Do workshop workers want faster lunch?',
    lesson:
      'Closer, but “want” could mean a complaint, a preference, or a willingness to pay. Those are not the same thing.',
  },
  {
    question: 'Will workers near these workshops pay $12 for delivered lunch?',
    lesson:
      'Now price and people are visible. We still need a distance, a time period, a service promise, costs, and a decision.',
  },
  {
    question:
      'Can a weekday service deliver 30 paid lunches a day within two miles, at $12 each, during a four-week test, while covering the named costs and following local rules?',
    lesson:
      'This can be investigated. It says who, where, when, at what price, under which conditions, and what must be learned before a larger commitment.',
  },
] as const;

export const exampleEvidence = [
  {
    title: 'A repeated complaint',
    shows:
      'Some workers experience lunch as slow or inconvenient, in the situations where we heard them.',
    doesNotShow:
      'That enough people will pay $12, order often, or choose this service.',
  },
  {
    title: 'A dated map of menus, prices, and travel times',
    shows:
      'Which visible alternatives existed nearby when we checked, and how those options compared.',
    doesNotShow:
      'Every informal seller, future competitor, actual wait time, or the quality people experience.',
  },
  {
    title: 'Paid, refundable pre-orders at $12',
    shows:
      'That named people were willing to act at that price under the exact test conditions.',
    doesNotShow:
      'A whole market, repeat buying, profitable delivery, or what people would do under different conditions.',
  },
  {
    title: 'Supplier quotes and a timed delivery route',
    shows:
      'A current estimate of specific costs and whether one proposed route can physically work.',
    doesNotShow:
      'Future prices, every operational surprise, food safety compliance, or a scalable business.',
  },
] as const;

export const breakEvenPath = [
  [
    'Human meaning',
    'The point where the money coming in covers the costs we chose to count. Below it, the activity loses money on those terms; above it, some money remains.',
  ],
  [
    'Why the idea exists',
    'People needed a way to ask a very practical question: how much must be sold before the operation pays for itself?',
  ],
  [
    'How it became more formal',
    'Accounting separated costs that stay roughly fixed from costs that rise with each sale. That made the practical question calculable and comparable.',
  ],
  [
    'The compact form',
    'Fixed monthly costs ÷ money left from each sale = sales needed to cover those costs.',
  ],
  [
    'What it helps with',
    'It exposes whether the required sales volume looks plausible and which cost or price assumption matters most.',
  ],
  [
    'What it does not know',
    'It cannot prove buyers will appear. It may hide cash timing, unpaid labor, taxes, waste, financing, capacity, risk, and anything the researcher forgot to count.',
  ],
] as const;

export const numberReadingQuestions = [
  'What human or physical thing does this number represent?',
  'Was it observed, quoted, calculated, or simply assumed?',
  'Which unit, currency, place, and period does it belong to?',
  'Why are these quantities being related to each other?',
  'What has been left outside the calculation?',
  'Which input could change the answer enough to change the decision?',
] as const;

export const disagreementQuestions = [
  {
    title: 'What does not fit?',
    detail:
      'Keep awkward observations, failed searches, missing people, and evidence against the idea instead of smoothing the story around them.',
  },
  {
    title: 'What is the strongest other story?',
    detail:
      'Perhaps lunch feels slow because one road is temporarily closed, or people complain but prefer bringing food from home. Build the alternative as carefully as the favored explanation.',
  },
  {
    title: 'What would settle something important?',
    detail:
      'State what new observation would change the answer, then choose a small test that can genuinely produce either result.',
  },
] as const;

export const presentLimits = [
  'We have not yet shown that ordinary readers understand a complete published case; the first case must test that with real readers.',
  'Public records leave out informal activity, private agreements, inaccessible data, and people who were never asked.',
  'Prices, laws, competitors, and local conditions can change after a source is checked.',
  'A clear explanation cannot replace qualified legal, safety, medical, engineering, accounting, or local operating judgment when those are required.',
  'Our current reading is weighted toward English-language and institutional sources. Other knowledge traditions and lived experience need deliberate inclusion.',
] as const;
