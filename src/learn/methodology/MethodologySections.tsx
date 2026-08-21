/**
 * Composes the public explanation from a human question outward. Each section is
 * understandable on its own, and later sections deepen rather than redefine the
 * plain account given first.
 */
import type { ReactElement } from 'react';

import {
  ConceptPath,
  OrdinaryQuestionGrid,
  QuestionLadder,
  SectionHeading,
  SourceShelf,
} from './MethodologyComponents';
import { EvidencePath, WorkedExample } from './MethodologyExample';
import {
  disagreementQuestions,
  numberReadingQuestions,
  presentLimits,
} from './methodologyContent';

function BasicIdeaSection(): ReactElement {
  return (
    <section className="method-section" id="idea" aria-labelledby="idea-title">
      <SectionHeading
        code="01 · The basic idea"
        id="idea-title"
        title="Knowledge should have a visible path, not a wall of authority."
      >
        We do not ask a reader to accept a conclusion because it sounds professional. We
        explain it with familiar human questions, then leave the route to deeper
        understanding open.
      </SectionHeading>
      <OrdinaryQuestionGrid />
      <aside className="expertise-note">
        <strong>Clear language does not make expertise unnecessary.</strong>
        <p>
          Experienced people often notice hidden constraints, measurement problems, and
          rare failures that a beginner will miss. Their title is not proof, but their
          knowledge may be essential. We make the reasons inspectable and say when
          qualified legal, safety, technical, accounting, or local judgment is still
          needed.
        </p>
      </aside>
    </section>
  );
}

function ExampleSection(): ReactElement {
  return (
    <section className="method-section" id="example" aria-labelledby="example-title">
      <SectionHeading
        code="02 · A simple example"
        id="example-title"
        title="One ordinary question, followed all the way down."
      >
        The example below is invented only to show how the explanation works. Notice how
        an observation becomes a question, a calculation becomes a sentence, and the
        unanswered part becomes the next test.
      </SectionHeading>
      <WorkedExample />
    </section>
  );
}

function QuestionsSection(): ReactElement {
  return (
    <section
      className="method-section"
      id="questions"
      aria-labelledby="questions-title"
    >
      <SectionHeading
        code="03 · Making the question"
        id="questions-title"
        title="Good questions are made, not found."
      >
        A broad question can hide the people, values, place, price, and decision that
        matter. We show how the question changed so a reader can see what each version
        includes—and what it quietly leaves outside.
      </SectionHeading>
      <QuestionLadder />
      <p className="method-note">
        A narrow question is not the whole truth. It is an honest piece of the truth
        that can be investigated without pretending to answer everything at once.
      </p>
    </section>
  );
}

function ConceptsSection(): ReactElement {
  return (
    <section className="method-section" id="concepts" aria-labelledby="concepts-title">
      <SectionHeading
        code="04 · Opening a word"
        id="concepts-title"
        title="An important concept should lead somewhere."
      >
        We begin with the human problem a concept was built to address. Then we show how
        people made it more precise, how it is used today, what it assumes, where it
        fails, and where a reader can continue into the original work.
      </SectionHeading>
      <ConceptPath />
    </section>
  );
}

function EvidenceSection(): ReactElement {
  return (
    <section className="method-section" id="evidence" aria-labelledby="evidence-title">
      <SectionHeading
        code="05 · Reading evidence"
        id="evidence-title"
        title="Every piece of evidence can answer only certain questions."
      >
        A source does not become universal truth because it is official, measured, or
        popular. We say what the record can support here, what it cannot support, who
        produced it, under which conditions, and when it may become too old to use.
      </SectionHeading>
      <EvidencePath />
      <aside className="action-evidence-note">
        <strong>A purchase is evidence, not mind-reading.</strong>
        <p>
          Paying shows that a transaction happened at a particular price, time, and set
          of available choices. It does not reveal a person’s complete values, prove
          they had a good alternative, or promise they will buy again. Words matter;
          actions matter; the conditions around both matter.
        </p>
      </aside>
    </section>
  );
}

function NumbersSection(): ReactElement {
  return (
    <section className="method-section" id="numbers" aria-labelledby="numbers-title">
      <SectionHeading
        code="06 · Understanding numbers"
        id="numbers-title"
        title="A number is a compressed sentence."
      >
        Mathematics can make a relationship exact and checkable. It should not hide what
        humans are trying to represent. Before and after a formula, we answer the
        questions below in ordinary language.
      </SectionHeading>
      <ol className="number-questions">
        {numberReadingQuestions.map((question, questionIndex) => (
          <li key={question}>
            <span>{String(questionIndex + 1).padStart(2, '0')}</span>
            <p>{question}</p>
          </li>
        ))}
      </ol>
      <blockquote className="number-principle">
        <p>
          “Thirty meals a day” is not impressive because it came from arithmetic. Its
          meaning depends on whether the costs are complete, whether the service can
          deliver 30 meals, and whether 30 people will actually pay.
        </p>
      </blockquote>
    </section>
  );
}

function DisagreementSection(): ReactElement {
  return (
    <section
      className="method-section"
      id="disagreement"
      aria-labelledby="disagreement-title"
    >
      <SectionHeading
        code="07 · Disagreement and open ends"
        id="disagreement-title"
        title="Good-looking research can still be wrong."
      >
        Human knowledge is built from limited observations, tools, language, and
        judgment. A finished-looking page must not hide those limits. We keep the
        unfinished edges visible and useful.
      </SectionHeading>
      <div className="disagreement-grid">
        {disagreementQuestions.map((question, questionIndex) => (
          <article key={question.title}>
            <span>{String(questionIndex + 1).padStart(2, '0')}</span>
            <h3>{question.title}</h3>
            <p>{question.detail}</p>
          </article>
        ))}
      </div>
      <p className="method-note">
        The goal is not to perform doubt about everything. It is to show exactly where
        doubt lives, how much it matters, and what could teach us something new.
      </p>
    </section>
  );
}

function SourcesSection(): ReactElement {
  return (
    <section
      className="method-section method-sources"
      id="sources"
      aria-labelledby="sources-title"
    >
      <SectionHeading
        code="08 · Sources behind our approach"
        id="sources-title"
        title="We show what we borrowed—and where it stops."
      >
        No single field supplies a complete way to understand a business. These are a
        few of the public works that shaped how we search, reason, calculate, preserve
        sources, and invite challenge.
      </SectionHeading>
      <SourceShelf />
      <section className="present-limits" aria-labelledby="present-limits-title">
        <p className="method-kicker">What we still need to learn</p>
        <h3 id="present-limits-title">This approach is unfinished too.</h3>
        <ol>
          {presentLimits.map((limit, limitIndex) => (
            <li key={limit}>
              <span>{String(limitIndex + 1).padStart(2, '0')}</span>
              <p>{limit}</p>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}

export function MethodologySections(): ReactElement {
  return (
    <div className="methodology-article">
      <BasicIdeaSection />
      <ExampleSection />
      <QuestionsSection />
      <ConceptsSection />
      <EvidenceSection />
      <NumbersSection />
      <DisagreementSection />
      <SourcesSection />
    </div>
  );
}
