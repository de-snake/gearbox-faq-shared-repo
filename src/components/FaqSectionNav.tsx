import type { FaqSection } from '../lib';

export function FaqSectionNav({ sections }: { sections: FaqSection[] }) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <nav aria-label="FAQ sections" className="faq-section-nav">
      {sections.map((section) => (
        <a className="faq-section-chip" href={`#${section.id}`} key={section.id}>
          {section.title}
          <span>{section.questions.length}</span>
        </a>
      ))}
    </nav>
  );
}
