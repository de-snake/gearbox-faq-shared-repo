import type { FaqQuestion } from '../lib';
import { FaqBlocks } from './FaqBlocks';

export type FaqItemProps = {
  question: FaqQuestion;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onCopyLink: (id: string) => void;
  copiedId: string | null;
};

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
          <span aria-hidden="true" className="faq-toggle-icon">
            <span />
            <span />
          </span>
        </button>

        <button
          aria-label={`Copy link to ${question.title}`}
          className={`faq-link-button${isCopied ? ' faq-link-button-copied' : ''}`}
          onClick={() => onCopyLink(question.id)}
          type="button"
        >
          {isCopied ? 'Copied' : 'Copy link'}
        </button>
      </div>

      {isOpen ? (
        <div className="faq-answer" id={panelId}>
          <FaqBlocks blocks={question.blocks} />
        </div>
      ) : null}
    </article>
  );
}
