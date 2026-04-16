import type { FaqQuestion } from '../lib';
import { FaqBlocks } from './FaqBlocks';

export type FaqItemProps = {
  question: FaqQuestion;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onCopyLink: (id: string) => void;
  copiedId: string | null;
};

function LinkIcon() {
  return (
    <svg aria-hidden="true" className="faq-icon-svg" viewBox="0 0 24 24">
      <path d="m10.5 13.5 3-3" />
      <path d="m8.25 16.5-1.5 1.5a3.75 3.75 0 1 1-5.303-5.303l3-3a3.75 3.75 0 0 1 5.303 0" />
      <path d="m15.75 7.5 1.5-1.5a3.75 3.75 0 1 1 5.303 5.303l-3 3a3.75 3.75 0 0 1-5.303 0" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="faq-icon-svg" viewBox="0 0 24 24">
      <path d="M5 12.5 9.25 16.75 19 7" />
    </svg>
  );
}

export function FaqItem({
  question,
  isOpen,
  onToggle,
  onCopyLink,
  copiedId,
}: FaqItemProps) {
  const panelId = `${question.id}-panel`;
  const isCopied = copiedId === question.id;

  return (
    <article className={`faq-item${isOpen ? ' faq-item-open' : ''}`} id={question.id}>
      <div className="faq-item-head">
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          className="faq-toggle"
          onClick={() => onToggle(question.id)}
          type="button"
        >
          <span className="faq-question-title">{question.title}</span>
        </button>

        <div className="faq-item-actions">
          <button
            aria-label={`${isCopied ? 'Copied link to' : 'Copy link to'} ${question.title}`}
            className={`faq-icon-button faq-link-button${isCopied ? ' faq-link-button-copied' : ''}`}
            onClick={() => onCopyLink(question.id)}
            type="button"
          >
            {isCopied ? <CheckIcon /> : <LinkIcon />}
          </button>

          <button
            aria-controls={panelId}
            aria-expanded={isOpen}
            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${question.title}`}
            className={`faq-icon-button faq-toggle-button${isOpen ? ' faq-toggle-button-open' : ''}`}
            onClick={() => onToggle(question.id)}
            type="button"
          >
            <span aria-hidden="true" className="faq-toggle-icon">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="faq-answer" id={panelId}>
          <FaqBlocks blocks={question.blocks} />
        </div>
      ) : null}
    </article>
  );
}
