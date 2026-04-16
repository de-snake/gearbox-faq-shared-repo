import type { FaqBlock } from '../lib';
import { MarkdownInline } from './MarkdownInline';

export function FaqBlocks({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'list') {
          return (
            <ul className="faq-copy-list" key={`list-${index}`}>
              {block.items.map((item) => (
                <li key={item}>
                  <MarkdownInline text={item} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p className="faq-copy-paragraph" key={`paragraph-${index}`}>
            <MarkdownInline text={block.text} />
          </p>
        );
      })}
    </>
  );
}
