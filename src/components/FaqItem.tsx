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
    <svg aria-hidden="true" className="faq-icon-svg" viewBox="0 0 20 20">
      <path d="M8.5 11.5 11.5 8.5" />
      <path d="M6.2 13.8 4.8 15.2a3.25 3.25 0 1 1-4.6-4.6l2.9-2.9a3.25 3.25 0 0 1 4.6 0" />
      <path d="M13.8 6.2 15.2 4.8a3.25 3.25 0 1 0-4.6-4.6l-2.9 2.9a3.25 3.25 0 0 0 0 4.6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="faq-icon-svg" viewBox="0 0 20 20">
      <path d="M4.5 10.5 8 14l7.5-7.5" />
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
