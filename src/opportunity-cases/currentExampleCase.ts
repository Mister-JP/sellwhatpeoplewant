/** Validates the public learning example once before a case renderer sees it. */
import learningExample from '../../architecture/examples/opportunity-case-learning-example.json';
import { parseOpportunityCase } from './model';

export const currentExampleCase = parseOpportunityCase(learningExample);
