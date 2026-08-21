/** Plain-language promises for what a public case must help a reader understand. */
export const caseAnatomy = [
  {
    title: 'The question',
    detail:
      'What are we trying to understand, for which people, in which place, over what time, and before which real decision?',
  },
  {
    title: 'What people do',
    detail:
      'What do people buy, repair, replace, wait for, work around, or go without—and what pressures or limits shape those actions?',
  },
  {
    title: 'What already exists',
    detail:
      'Which products, services, habits, and informal solutions already help, and why might a new offer be better or worse?',
  },
  {
    title: 'How it would work',
    detail:
      'Who would make, move, sell, repair, finance, and permit it—and where could the real-world path break?',
  },
  {
    title: 'The money, in words',
    detail:
      'What each number represents, where it came from, what it leaves out, and what would happen if an assumption changed.',
  },
  {
    title: 'Ideas with a history',
    detail:
      'Why people developed concepts such as incentives, cash flow, and break-even; how they help; and where they can mislead.',
  },
  {
    title: 'The other explanation',
    detail:
      'What else could produce the same evidence, who disagrees, what we may have missed, and what could make the idea fail.',
  },
  {
    title: 'The next small test',
    detail:
      'The smallest lawful and respectful action that can teach us something important before inventory, debt, or hiring.',
  },
  {
    title: 'The path behind it',
    detail:
      'The exact sources, dates, reasoning, open questions, corrections, and deeper reading behind each important statement.',
  },
] as const;

export const researchSteps = [
  [
    'Ask',
    'What are we actually trying to decide?',
    'Turn a broad idea into a question about named people, a real place, a period of time, and a choice someone may have to make.',
  ],
  [
    'Observe',
    'What are people saying and doing?',
    'Compare words with purchases, prices, delays, workarounds, alternatives, and local conditions without pretending any one signal reveals the whole truth.',
  ],
  [
    'Understand',
    'Which ideas help us make sense of it?',
    'Explain important concepts from their human purpose outward: why the idea was needed, how it developed, how it is used, and where people still disagree.',
  ],
  [
    'Calculate',
    'What do the numbers mean in ordinary language?',
    'Name every input and unit, show the arithmetic, then translate the result back into a sentence a reader can question.',
  ],
  [
    'Challenge',
    'What else could be true?',
    'Look for contrary evidence, hidden constraints, missing voices, and the strongest explanation that does not support the idea.',
  ],
  [
    'Try',
    'What is the smallest honest next step?',
    'Test the uncertainty most likely to change the decision before making a larger or harder-to-reverse commitment.',
  ],
] as const;

export const trustPrinciples = [
  [
    'The clear explanation comes first',
    'A reader should understand the question and present answer without learning our internal process or specialist vocabulary.',
  ],
  [
    'Important words open up',
    'A concept can lead to its everyday meaning, the human problem it answered, its history, formal use, limits, disagreements, and original sources.',
  ],
  [
    'Sources open at the point of use',
    'An important statement leads to the exact record behind it, who produced it, when, for what purpose, and why it can support this use.',
  ],
  [
    'Numbers become sentences again',
    'A formula never gets the last word. We explain what relationship it represents, what must be assumed, and what changing an input would mean.',
  ],
  [
    'Disagreement has a proper home',
    'The strongest contrary explanation, unresolved questions, and evidence that would change our mind stay beside the conclusion.',
  ],
  [
    'Corrections remain part of the story',
    'When understanding changes, readers can see what changed, why it changed, and which new fact or argument caused the revision.',
  ],
] as const;
