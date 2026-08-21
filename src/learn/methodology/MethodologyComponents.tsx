/**
 * Renders the repeated reading paths on the public "How we know" page. The
 * components keep progressive disclosure semantic: the main idea is always
 * readable, while details deepen it without becoming a prerequisite.
 */
import type { ReactElement, ReactNode } from 'react';

import {
  breakEvenPath,
  ordinaryResearchQuestions,
  pageLinks,
  questionEvolution,
} from './methodologyContent';
import { learningSources } from './methodologySources';

interface SectionHeadingProperties {
  code: string;
  id: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({
  code,
  id,
  title,
  children,
}: SectionHeadingProperties): ReactElement {
  return (
    <header className="method-section-heading">
      <p className="method-kicker">{code}</p>
      <h2 id={id}>{title}</h2>
      {children === undefined ? null : <p>{children}</p>}
    </header>
  );
}

export function MethodologyNav(): ReactElement {
  return (
    <nav className="methodology-nav" aria-label="On this page">
      <p>Follow the path</p>
      <ol>
        {pageLinks.map(([href, label]) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function OrdinaryQuestionGrid(): ReactElement {
  return (
    <ol className="ordinary-question-grid">
      {ordinaryResearchQuestions.map(([question, explanation], questionIndex) => (
        <li key={question}>
          <span>{String(questionIndex + 1).padStart(2, '0')}</span>
          <h3>{question}</h3>
          <p>{explanation}</p>
        </li>
      ))}
    </ol>
  );
}

export function QuestionLadder(): ReactElement {
  return (
    <ol className="question-ladder">
      {questionEvolution.map((questionStep, questionIndex) => (
        <li key={questionStep.question}>
          <span>{String(questionIndex + 1).padStart(2, '0')}</span>
          <div>
            <h3>{questionStep.question}</h3>
            <p>{questionStep.lesson}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ConceptPath(): ReactElement {
  return (
    <article className="concept-path" id="concept-break-even">
      <header>
        <p>One word, opened up</p>
        <h3>Break-even</h3>
        <p>
          This is not merely a definition. It is the path from a human problem to a
          useful tool—and then to the places where the tool stops helping.
        </p>
      </header>
      <div>
        {breakEvenPath.map(([title, explanation], pathIndex) => (
          <details key={title} open={pathIndex === 0}>
            <summary>
              <span>{String(pathIndex + 1).padStart(2, '0')}</span>
              <strong>{title}</strong>
            </summary>
            <p>{explanation}</p>
          </details>
        ))}
      </div>
    </article>
  );
}

export function SourceShelf(): ReactElement {
  return (
    <div className="source-shelf">
      {learningSources.map((reading, readingIndex) => (
        <article key={reading.href}>
          <span>{String(readingIndex + 1).padStart(2, '0')}</span>
          <h3>{reading.title}</h3>
          <a href={reading.href}>{reading.source}</a>
          <dl>
            <div>
              <dt>What we learned</dt>
              <dd>{reading.borrowed}</dd>
            </div>
            <div>
              <dt>Where it stops</dt>
              <dd>{reading.limit}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}
