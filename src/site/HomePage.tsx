/**
 * States the product promise without pretending the unfinished demand dataset is
 * already live. The page sells the direction and routes curious readers to the
 * system map while keeping the seller mechanism exactly as narrow as researched:
 * one platform-led interview and one external buying link.
 */
import type { ReactElement } from 'react';

export function HomePage(): ReactElement {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div>
          <p className="eyebrow">A shared map of what people want</p>
          <h1>Make demand visible. Make useful work easier to find.</h1>
        </div>
        <div className="hero-explanation">
          <p>
            SellWhatPeopleWant gathers small signals of human demand into one public
            picture—so people can find what serves them and builders can find something
            genuinely worth doing.
          </p>
          <a className="text-link" href="/learn/system-map">
            Explore how the idea works <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="public-promise" aria-label="The public promise">
        <p className="promise-number">01</p>
        <div>
          <h2>A useful result, not another destination to learn.</h2>
          <p>
            Agents and humans should discover relevant pages through ordinary web
            search. Each page must help with the question at hand and make the larger
            picture of demand clearer in return.
          </p>
        </div>
        <p className="promise-aside">
          Open to read. Useful to cite. Structured for machines. Legible to people.
        </p>
      </section>

      <section className="home-sections">
        <article id="demand">
          <p className="eyebrow">Demand</p>
          <h2>Say the need once.</h2>
          <p>
            Similar wants gather around one shared need. New information sharpens that
            need instead of producing another nearly identical post.
          </p>
        </article>
        <article id="sellers">
          <p className="eyebrow">Sellers</p>
          <h2>Explain the product once.</h2>
          <p>
            The platform conducts an interview informed by existing demand, then
            publishes a clear explanation and the seller&apos;s external buying link.
          </p>
        </article>
        <article id="about">
          <p className="eyebrow">Why this exists</p>
          <h2>Demand can reveal purpose.</h2>
          <p>
            When unmet needs are visible, another human can recognize work worth
            doing—and the person with the need has a better chance of being served.
          </p>
        </article>
      </section>
    </main>
  );
}
