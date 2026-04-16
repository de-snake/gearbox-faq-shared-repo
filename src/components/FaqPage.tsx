import { useEffect, useMemo, useState } from 'react';
import { filterFaqDocument } from '../lib';
import type { FaqBrand, FaqDocument } from '../lib';
import { FaqBlocks } from './FaqBlocks';
import { FaqItem } from './FaqItem';
import { FaqSectionNav } from './FaqSectionNav';

function getQuestionIds(faqDocument: FaqDocument): string[] {
  return faqDocument.sections.flatMap((section) => section.questions.map((question) => question.id));
}

function formatQuestionCount(count: number, label = 'question'): string {
  return `${count} ${label}${count === 1 ? '' : 's'}`;
}

export function FaqPage({ brand, document: faqDocument }: { brand: FaqBrand; document: FaqDocument }) {
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const filteredDocument = useMemo(
    () => filterFaqDocument(faqDocument, query),
    [faqDocument, query],
  );
  const allFilteredIds = useMemo(() => getQuestionIds(filteredDocument), [filteredDocument]);

  useEffect(() => {
    const title = brand.titleSuffix
      ? `${faqDocument.title} | ${brand.titleSuffix}`
      : faqDocument.title;
    window.document.title = title;
  }, [brand.titleSuffix, faqDocument.title]);

  useEffect(() => {
    const syncFromHash = () => {
      const targetId = window.location.hash.replace(/^#/, '');
      if (!targetId) {
        return;
      }

      const exists = faqDocument.sections.some((section) =>
        section.questions.some((question) => question.id === targetId),
      );

      if (!exists) {
        return;
      }

      setOpenIds((current) => {
        const next = new Set(current);
        next.add(targetId);
        return next;
      });

      window.setTimeout(() => {
        window.document.getElementById(targetId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 30);
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [faqDocument]);

  useEffect(() => {
    if (!copiedId) {
      return;
    }

    const timeout = window.setTimeout(() => setCopiedId(null), 1200);
    return () => window.clearTimeout(timeout);
  }, [copiedId]);

  const matchLabel = query.trim()
    ? `${formatQuestionCount(filteredDocument.questionCount, 'matching question')}`
    : `${formatQuestionCount(faqDocument.questionCount)} across ${faqDocument.sectionCount} sections`;

  const handleToggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setOpenIds(new Set(allFilteredIds));
  };

  const handleCollapseAll = () => {
    setOpenIds(new Set());
  };

  const handleCopyLink = async (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
    } catch {
      window.location.hash = id;
      setCopiedId(id);
    }
  };

  return (
    <main className="faq-shell">
      <section className="faq-hero">
        <div className="faq-eyebrow-row">
          <span className="faq-eyebrow">{brand.eyebrow}</span>
          <span className="faq-stats-pill">{matchLabel}</span>
        </div>
        <h1 className="faq-title">{faqDocument.title}</h1>
        <p className="faq-description">{brand.description}</p>
        <div className="faq-intro">
          <FaqBlocks blocks={faqDocument.intro} />
        </div>
        <div className="faq-link-row">
          {brand.links.map((link) => (
            <a
              className="faq-link-pill"
              href={link.url}
              key={link.url}
              rel="noreferrer noopener"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section aria-label="FAQ controls" className="faq-toolbar">
        <label className="faq-search-field">
          <span>Search</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions, terms, or answers"
            type="search"
            value={query}
          />
        </label>

        <div className="faq-toolbar-actions">
          <button className="faq-secondary-button" onClick={handleExpandAll} type="button">
            Expand visible
          </button>
          <button className="faq-secondary-button" onClick={handleCollapseAll} type="button">
            Collapse all
          </button>
        </div>
      </section>

      <FaqSectionNav sections={filteredDocument.sections} />

      <section className="faq-sections">
        {filteredDocument.sections.length === 0 ? (
          <div className="faq-empty-state">
            <h2>No questions matched.</h2>
            <p>Try a broader term or clear the search.</p>
          </div>
        ) : (
          filteredDocument.sections.map((section) => (
            <section className="faq-section" id={section.id} key={section.id}>
              <div className="faq-section-head">
                <h2>{section.title}</h2>
                <span>{formatQuestionCount(section.questions.length)}</span>
              </div>

              <div className="faq-section-list">
                {section.questions.map((question) => (
                  <FaqItem
                    copiedId={copiedId}
                    isOpen={query.trim() ? true : openIds.has(question.id)}
                    key={question.id}
                    onCopyLink={handleCopyLink}
                    onToggle={handleToggle}
                    question={question}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </section>
    </main>
  );
}
