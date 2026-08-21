/** Public reading paths whose ideas shaped the lab, paired with their honest limits. */
export const learningSources = [
  {
    title: 'Searching without quietly choosing the answer',
    source: 'Cochrane Handbook · searching for and selecting studies',
    href: 'https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-04',
    borrowed:
      'Plan where to look, record what was searched, and preserve why material was included or left out.',
    limit:
      'A careful search can still miss private, informal, inaccessible, unpublished, or differently described evidence.',
  },
  {
    title: 'Separating cause from a pattern that travels with it',
    source: 'Hernán and Robins · Causal Inference: What If',
    href: 'https://miguelhernan.org/whatifbook',
    borrowed:
      'Name the comparison we actually care about and expose what must be assumed before calling something a cause.',
    limit:
      'A clear diagram or method does not make its assumptions true, and a result from one setting may not travel to another.',
  },
  {
    title: 'Keeping the path from a source to what we publish',
    source: 'W3C · PROV data model',
    href: 'https://www.w3.org/TR/prov-dm/',
    borrowed:
      'Record what came from where, who or what changed it, and which version a reader is seeing.',
    limit:
      'A perfect history of how information moved does not prove that the information is true.',
  },
  {
    title: 'Comparing real choices, costs, and uncertainty',
    source: 'HM Treasury · The Green Book',
    href: 'https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government/the-green-book-2026',
    borrowed:
      'Compare a proposal with real alternatives, state whose costs and benefits count, and show what uncertainty does to the choice.',
    limit:
      'A public-policy guide is not a small-business rulebook; founder survival, cash, local values, and affected people still need their own view.',
  },
  {
    title: 'Making cost estimates inspectable',
    source: 'U.S. Government Accountability Office · Cost Estimating Guide',
    href: 'https://www.gao.gov/products/gao-20-195g',
    borrowed:
      'Show the scope, inputs, assumptions, time period, sensitivity, and how an estimate will be checked against what later happens.',
    limit:
      'A disciplined estimate is still an estimate. Small-business conditions can change faster than a formal model.',
  },
  {
    title: 'Giving the opposing view a real job',
    source: 'UK Ministry of Defence · Red Teaming Handbook',
    href: 'https://www.gov.uk/government/publications/a-guide-to-red-teaming',
    borrowed:
      'Ask someone to build serious alternatives, look for weak assumptions, and explain which challenge changed the decision.',
    limit:
      'Renaming the same person as a critic does not make the challenge independent or remove that person’s blind spots.',
  },
] as const;
