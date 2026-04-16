import type { FaqDocument } from './faq-types';

export function filterFaqDocument(document: FaqDocument, query: string): FaqDocument {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return document;
  }

  const sections = document.sections
    .map((section) => ({
      ...section,
      questions: section.questions.filter((question) =>
        question.plainText.toLowerCase().includes(normalizedQuery),
      ),
    }))
    .filter((section) => section.questions.length > 0);

  const questionCount = sections.reduce((sum, section) => sum + section.questions.length, 0);

  return {
    ...document,
    sections,
    sectionCount: sections.length,
    questionCount,
  };
}
