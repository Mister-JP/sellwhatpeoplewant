/** Renders one inspectable claim-to-decision trace from any validated case document. */
import type { ReactElement } from 'react';

import type { OpportunityCaseDocument } from '../model';

interface CaseProofPanelProperties {
  document: OpportunityCaseDocument;
}

const publicationCheckLabels: Record<
  OpportunityCaseDocument['publicationGates'][number]['gateKind'],
  string
> = {
  scope_provenance: 'scope and sources',
  evidence_inference: 'evidence and reasoning',
  economics_decision: 'economics and decision',
  adversarial_safety: 'strong objections and safety',
  public_artifact_accessibility: 'readability and accessibility',
};

function CaseGateSummary({
  gates,
}: {
  gates: OpportunityCaseDocument['publicationGates'];
}): ReactElement {
  return (
    <section className="case-gates" aria-labelledby="case-gates-title">
      <div>
        <p className="method-kicker">Five checks before publication</p>
        <h4 id="case-gates-title">One badge cannot make the whole case true</h4>
      </div>
      <ul>
        {gates.map((gate) => (
          <li data-gate-outcome={gate.outcome} key={gate.id}>
            <span>{publicationCheckLabels[gate.gateKind]}</span>
            <strong>{gate.outcome.replaceAll('_', ' ')}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface CaseTrace {
  inference: OpportunityCaseDocument['inferences'][number];
  premise: OpportunityCaseDocument['claims'][number];
  conclusion: OpportunityCaseDocument['claims'][number];
  record: OpportunityCaseDocument['extractedRecords'][number];
  source: OpportunityCaseDocument['sources'][number];
  sourceAppraisal: OpportunityCaseDocument['sourceAppraisals'][number];
  concept: OpportunityCaseDocument['concepts'][number];
  recommendedAlternative: OpportunityCaseDocument['alternatives'][number];
}

function resolveCaseTrace(document: OpportunityCaseDocument): CaseTrace {
  const inference = document.inferences[0];
  const premise = document.claims.find((claim) =>
    inference?.premiseClaimIds.includes(claim.id),
  );
  const conclusion = document.claims.find(
    (claim) => claim.id === inference?.conclusionClaimId,
  );
  const record = document.extractedRecords.find((item) =>
    premise?.extractedRecordIds.includes(item.id),
  );
  const source = document.sources.find((item) => item.id === record?.sourceId);
  const sourceAppraisal = document.sourceAppraisals.find(
    (appraisal) => appraisal.sourceId === source?.id,
  );
  const concept = document.concepts.find((item) =>
    inference?.relatedConceptIds.includes(item.id),
  );
  const recommendedAlternative = document.alternatives.find(
    (alternative) =>
      alternative.id === document.recommendation.recommendedAlternativeId,
  );

  if (
    inference === undefined ||
    premise === undefined ||
    conclusion === undefined ||
    record === undefined ||
    source === undefined ||
    sourceAppraisal === undefined ||
    concept === undefined ||
    recommendedAlternative === undefined
  ) {
    throw new Error('The case proof panel requires one complete argument trace.');
  }

  return {
    inference,
    premise,
    conclusion,
    record,
    source,
    sourceAppraisal,
    concept,
    recommendedAlternative,
  };
}

function CaseReasoningTrace({ trace }: { trace: CaseTrace }): ReactElement {
  return (
    <ol className="argument-trace" aria-label="How this reasoning was built">
      <li data-object-kind="source">
        <span>Read the source</span>
        <strong>
          <a href={trace.source.url}>
            {trace.source.publisher ?? trace.source.creators.join(', ')}
          </a>
        </strong>
        <p>{trace.source.title}</p>
        <small>
          Why it carries weight: {trace.sourceAppraisal.strengths.join('; ')}. What it
          cannot show: {trace.sourceAppraisal.limitations.join('; ')}.
        </small>
      </li>
      <li data-object-kind="record">
        <span>What the source says</span>
        <strong>{trace.record.locatorWithinSource}</strong>
        <p>{trace.record.extraction}</p>
      </li>
      <li data-object-kind="claim">
        <span>What we can safely say</span>
        <strong>{trace.premise.confidence.label ?? 'Bounded to this source'}</strong>
        <p>{trace.premise.statement}</p>
      </li>
      <li data-object-kind="concept">
        <span>Useful idea</span>
        <strong>{trace.concept.name}</strong>
        <p>{trace.concept.plainMeaning}</p>
      </li>
      <li data-object-kind="inference">
        <span>Why this follows</span>
        <strong>Reasoning in plain language</strong>
        <p>{trace.inference.reasoning}</p>
      </li>
      <li data-object-kind="decision">
        <span>What this supports now</span>
        <strong>{trace.recommendedAlternative.name}</strong>
        <p>{trace.conclusion.statement}</p>
      </li>
    </ol>
  );
}

export function CaseProofPanel({ document }: CaseProofPanelProperties): ReactElement {
  const trace = resolveCaseTrace(document);

  return (
    <article className="case-proof-panel" aria-labelledby="proof-panel-title">
      <header className="case-proof-header">
        <div>
          <p className="method-kicker">Working example · version {document.version}</p>
          <h3 id="proof-panel-title">{document.title}</h3>
        </div>
        <dl>
          <div>
            <dt>Status</dt>
            <dd>{document.status}</dd>
          </div>
          <div>
            <dt>Evidence cutoff</dt>
            <dd>{document.evidenceCutoff}</dd>
          </div>
        </dl>
      </header>

      <CaseReasoningTrace trace={trace} />

      <CaseGateSummary gates={document.publicationGates} />

      <aside className="case-correction">
        <span>What changed</span>
        <p>{document.changeSets[0]?.publicNotice}</p>
      </aside>
    </article>
  );
}
