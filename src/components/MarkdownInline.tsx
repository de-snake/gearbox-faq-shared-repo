import type { ReactElement } from 'react';

export function MarkdownInline({ text }: { text: string }) {
  const nodes: Array<string | ReactElement> = [];
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*(.+?)\*\*|`([^`]+)`/g;
  let lastIndex = 0;
  let tokenIndex = 0;

  for (const match of text.matchAll(tokenPattern)) {
    const start = match.index ?? 0;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    if (match[1] && match[2]) {
      nodes.push(
        <a
          href={match[2]}
          key={`link-${tokenIndex}`}
          rel="noreferrer noopener"
          target="_blank"
        >
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      nodes.push(<strong key={`bold-${tokenIndex}`}>{match[3]}</strong>);
    } else if (match[4]) {
      nodes.push(<code key={`code-${tokenIndex}`}>{match[4]}</code>);
    }

    lastIndex = start + match[0].length;
    tokenIndex += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}
