/**
 * Teaches the public method through an intentionally fictional lunch-service
 * example. No value is presented as observed market evidence; each number exists
 * only to show how a reader can move from meaning to arithmetic and back again.
 */
import type { ReactElement } from 'react';

import { exampleEvidence } from './methodologyContent';

export function WorkedExample(): ReactElement {
  return (
    <article className="worked-example">
      <header>
        <p className="example-status">Fictional numbers · not a market claim</p>
        <h3>Could a small lunch service work near a group of workshops?</h3>
        <p>
          Imagine workers often say that nearby lunch takes too long. That is a reason
          to ask a better question. It is not yet proof of a business.
        </p>
      </header>

      <section className="example-question" aria-labelledby="example-question-title">
        <p>Question we can investigate</p>
        <h4 id="example-question-title">
          Can a weekday service deliver 30 paid lunches a day within two miles, at $12
          each, while covering the named costs and following local rules?
        </h4>
      </section>

      <section className="example-calculation" aria-labelledby="calculation-title">
        <div>
          <p>Meaning before the formula</p>
          <h4 id="calculation-title">
            How many meals must be sold before the assumed monthly costs are covered?
          </h4>
        </div>
        <ol aria-label="Illustrative lunch-service calculation">
          <li>
            <span>Price paid for one meal</span>
            <strong>$12.00</strong>
          </li>
          <li>
            <span>Ingredients, packaging, payment, and delivery for one meal</span>
            <strong>− $7.00</strong>
          </li>
          <li className="calculation-result">
            <span>Money left from one meal to cover monthly costs</span>
            <strong>$5.00</strong>
          </li>
          <li>
            <span>Assumed monthly costs ÷ money left from each meal</span>
            <strong>$3,300 ÷ $5</strong>
          </li>
          <li className="calculation-result">
            <span>
              Illustrative <a href="#concept-break-even">break-even point</a>
            </span>
            <strong>660 meals a month</strong>
          </li>
        </ol>
        <p className="calculation-translation">
          <strong>In ordinary language:</strong> over 22 operating days, this version of
          the service needs to sell about 30 meals a day just to cover the costs we
          counted. That is a threshold to investigate. It is not a prediction that 30
          buyers will appear.
        </p>
      </section>

      <div className="example-ending">
        <section>
          <p>The strongest doubt</p>
          <h4>Complaints may not become repeat orders.</h4>
          <p>
            People may bring food from home, order only on unusual days, dislike a
            limited menu, or stop buying once the introductory test ends.
          </p>
        </section>
        <section>
          <p>A small next test</p>
          <h4>Offer paid, refundable pre-orders before buying equipment.</h4>
          <p>
            Test two scheduled lunch days with one workshop group, record repeat orders
            and real delivery time, and stop if the local legal or food-safety path is
            not clear.
          </p>
        </section>
      </div>
    </article>
  );
}

export function EvidencePath(): ReactElement {
  return (
    <ol className="evidence-path">
      {exampleEvidence.map((evidence, evidenceIndex) => (
        <li key={evidence.title}>
          <span>{String(evidenceIndex + 1).padStart(2, '0')}</span>
          <div>
            <h3>{evidence.title}</h3>
            <dl>
              <div>
                <dt>What it can show</dt>
                <dd>{evidence.shows}</dd>
              </div>
              <div>
                <dt>What it cannot show</dt>
                <dd>{evidence.doesNotShow}</dd>
              </div>
            </dl>
          </div>
        </li>
      ))}
    </ol>
  );
}
