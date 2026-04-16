import { describe, expect, it } from 'vitest';
import { filterFaqDocument, parseFaqMarkdown } from './index';

const SAMPLE = `# Example FAQ

Intro line one.

Intro line two.

## General

### What is this?

This is a **test** entry.

- one
- two

### Where do I click?

Go to [Example](https://example.com).

## Governance

### Who decides?

Token holders do.`;

describe('parseFaqMarkdown', () => {
  it('parses title, intro, sections, questions, and block types', () => {
    const document = parseFaqMarkdown(SAMPLE);

    expect(document.title).toBe('Example FAQ');
    expect(document.sectionCount).toBe(2);
    expect(document.questionCount).toBe(3);
    expect(document.intro[0]).toEqual({ type: 'paragraph', text: 'Intro line one.' });
    expect(document.sections[0]?.id).toBe('general');
    expect(document.sections[0]?.questions[0]?.id).toBe('general-what-is-this');
    expect(document.sections[0]?.questions[0]?.blocks[1]).toEqual({
      type: 'list',
      items: ['one', 'two'],
    });
  });

  it('filters questions by search query', () => {
    const document = parseFaqMarkdown(SAMPLE);
    const filtered = filterFaqDocument(document, 'token');

    expect(filtered.sectionCount).toBe(1);
    expect(filtered.questionCount).toBe(1);
    expect(filtered.sections[0]?.title).toBe('Governance');
    expect(filtered.sections[0]?.questions[0]?.title).toBe('Who decides?');
  });
});
