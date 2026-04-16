import type { FaqBlock, FaqDocument, FaqSection } from './faq-types';

type DraftQuestion = {
  title: string;
  lines: string[];
};

type DraftSection = {
  title: string;
  questions: DraftQuestion[];
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildBlocks(lines: string[]): FaqBlock[] {
  const blocks: FaqBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? '';

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (index < lines.length) {
        const candidate = lines[index]?.trim() ?? '';
        if (!candidate.startsWith('- ')) {
          break;
        }
        items.push(candidate.slice(2).trim());
        index += 1;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const candidate = lines[index]?.trim() ?? '';
      if (!candidate || candidate.startsWith('- ')) {
        break;
      }
      paragraphLines.push(candidate);
      index += 1;
    }

    if (paragraphLines.length > 0) {
      blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') });
    }
  }

  return blocks;
}

function flattenBlocks(blocks: FaqBlock[]): string {
  return blocks
    .map((block) => (block.type === 'paragraph' ? block.text : block.items.join(' ')))
    .join(' ')
    .trim();
}

export function parseFaqMarkdown(markdown: string): FaqDocument {
  const lines = markdown.split(/\r?\n/);

  let title = 'FAQ';
  const introLines: string[] = [];
  const sectionDrafts: DraftSection[] = [];
  let currentSection: DraftSection | null = null;
  let currentQuestion: DraftQuestion | null = null;

  for (const rawLine of lines) {
    const stripped = rawLine.trim();

    if (stripped === '---') {
      continue;
    }

    if (stripped.startsWith('# ')) {
      title = stripped.slice(2).trim();
      continue;
    }

    if (stripped.startsWith('## ')) {
      currentSection = { title: stripped.slice(3).trim(), questions: [] };
      sectionDrafts.push(currentSection);
      currentQuestion = null;
      continue;
    }

    if (stripped.startsWith('### ')) {
      if (!currentSection) {
        currentSection = { title: 'FAQ', questions: [] };
        sectionDrafts.push(currentSection);
      }

      currentQuestion = { title: stripped.slice(4).trim(), lines: [] };
      currentSection.questions.push(currentQuestion);
      continue;
    }

    if (!currentSection && !currentQuestion) {
      introLines.push(stripped);
      continue;
    }

    if (currentQuestion) {
      currentQuestion.lines.push(stripped);
    }
  }

  const sections: FaqSection[] = sectionDrafts.map((section) => ({
    id: slugify(section.title),
    title: section.title,
    questions: section.questions.map((question) => {
      const blocks = buildBlocks(question.lines);
      return {
        id: slugify(`${section.title}-${question.title}`),
        title: question.title,
        blocks,
        plainText: `${question.title} ${flattenBlocks(blocks)}`.trim(),
      };
    }),
  }));

  const questionCount = sections.reduce((sum, section) => sum + section.questions.length, 0);

  return {
    title,
    intro: buildBlocks(introLines),
    sections,
    sectionCount: sections.length,
    questionCount,
  };
}
