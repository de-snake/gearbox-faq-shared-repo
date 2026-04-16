from __future__ import annotations

import html
import re
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "faq.md"
OUTPUT = ROOT / "faq-preview.html"

BOLD_RE = re.compile(r"\*\*(.+?)\*\*")
CODE_RE = re.compile(r"`([^`]+)`")
LINK_RE = re.compile(r"\[([^\]]+)\]\((https?://[^)]+)\)")


@dataclass
class Question:
    title: str
    lines: list[str] = field(default_factory=list)


@dataclass
class Section:
    title: str
    questions: list[Question] = field(default_factory=list)


def render_inline(text: str) -> str:
    escaped = html.escape(text)
    escaped = BOLD_RE.sub(r"<strong>\1</strong>", escaped)
    escaped = CODE_RE.sub(r"<code>\1</code>", escaped)
    escaped = LINK_RE.sub(r'<a href="\2" target="_blank" rel="noreferrer noopener">\1</a>', escaped)
    return escaped


def render_blocks(lines: list[str]) -> str:
    blocks: list[str] = []
    i = 0
    while i < len(lines):
        if not lines[i]:
            i += 1
            continue

        if lines[i].startswith("- "):
            items = []
            while i < len(lines) and lines[i].startswith("- "):
                items.append(f"<li>{render_inline(lines[i][2:].strip())}</li>")
                i += 1
            blocks.append("<ul>" + "".join(items) + "</ul>")
            continue

        para_lines = []
        while i < len(lines) and lines[i] and not lines[i].startswith("- "):
            para_lines.append(lines[i])
            i += 1
        blocks.append(f"<p>{render_inline(' '.join(para_lines))}</p>")

    return "\n".join(blocks)


def parse_markdown() -> tuple[str, list[str], list[Section]]:
    lines = SOURCE.read_text().splitlines()

    title = "Gearbox FAQ"
    intro: list[str] = []
    sections: list[Section] = []
    current_section: Section | None = None
    current_question: Question | None = None

    for raw_line in lines:
        stripped = raw_line.strip()

        if stripped == "---":
            continue

        if stripped.startswith("# "):
            title = stripped[2:].strip()
            continue

        if stripped.startswith("## "):
            current_section = Section(title=stripped[3:].strip())
            sections.append(current_section)
            current_question = None
            continue

        if stripped.startswith("### "):
            current_question = Question(title=stripped[4:].strip())
            if current_section is None:
                current_section = Section(title="FAQ")
                sections.append(current_section)
            current_section.questions.append(current_question)
            continue

        if current_question is None and current_section is None:
            intro.append(stripped)
        elif current_question is not None:
            current_question.lines.append(stripped)

    return title, intro, sections


def build_html(title: str, intro: list[str], sections: list[Section]) -> str:
    intro_html = render_blocks(intro)

    section_items = []
    for section in sections:
        question_items = []
        for question in section.questions:
            question_items.append(
                f'''<details class="faq-item">
  <summary>
    <span class="faq-question">{html.escape(question.title)}</span>
    <span class="faq-icon" aria-hidden="true"></span>
  </summary>
  <div class="faq-answer">{render_blocks(question.lines)}</div>
</details>'''
            )
        section_items.append(
            f'''<section class="faq-section">
      <div class="faq-section-head">
        <h2 class="faq-section-title">{html.escape(section.title)}</h2>
      </div>
      <div class="faq-section-list">
        {''.join(question_items)}
      </div>
    </section>'''
        )

    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)}</title>
  <style>
    :root {{
      --bg: #0b0d12;
      --panel: #12161d;
      --panel-2: #171c24;
      --border: rgba(255, 255, 255, 0.08);
      --text: #f4f7fb;
      --muted: #a9b4c7;
      --soft: #8894a9;
      --accent: #8b5cf6;
      --max: 860px;
      color-scheme: dark;
    }}

    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top, rgba(139, 92, 246, 0.10), transparent 32%),
        var(--bg);
      color: var(--text);
    }}

    main {{
      width: min(var(--max), calc(100% - 28px));
      margin: 0 auto;
      padding: 48px 0 72px;
    }}

    .hero {{
      margin-bottom: 28px;
      padding: 4px 2px 0;
    }}

    .eyebrow {{
      color: var(--soft);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }}

    h1 {{
      margin: 0;
      font-size: clamp(2rem, 5vw, 3.25rem);
      line-height: 1.02;
      letter-spacing: -0.045em;
      font-weight: 700;
    }}

    .intro {{
      margin-top: 16px;
      max-width: 760px;
      color: var(--muted);
      font-size: 1rem;
      line-height: 1.75;
    }}

    .intro p {{ margin: 0; }}

    .faq-sections {{
      display: grid;
      gap: 28px;
    }}

    .faq-section {{
      display: grid;
      gap: 12px;
    }}

    .faq-section-head {{
      display: flex;
      align-items: center;
      gap: 14px;
      margin: 0 2px;
    }}

    .faq-section-head::after {{
      content: "";
      flex: 1 1 auto;
      height: 1px;
      background: var(--border);
    }}

    .faq-section-title {{
      margin: 0;
      color: var(--soft);
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }}

    .faq-section-list {{
      display: grid;
      gap: 12px;
    }}

    .faq-item {{
      border: 1px solid var(--border);
      border-radius: 18px;
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)), var(--panel);
      overflow: hidden;
      transition: border-color 0.16s ease, background 0.16s ease;
    }}

    .faq-item[open] {{
      border-color: rgba(139, 92, 246, 0.28);
      background: var(--panel-2);
    }}

    .faq-item summary {{
      list-style: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      padding: 18px 20px;
      user-select: none;
    }}

    .faq-item summary::-webkit-details-marker {{ display: none; }}

    .faq-question {{
      font-size: 1.02rem;
      line-height: 1.45;
      font-weight: 620;
      color: var(--text);
    }}

    .faq-icon {{
      position: relative;
      flex: 0 0 auto;
      width: 24px;
      height: 24px;
    }}

    .faq-icon::before,
    .faq-icon::after {{
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 12px;
      height: 1.8px;
      background: var(--muted);
      border-radius: 999px;
      transform: translate(-50%, -50%);
      transition: 0.16s ease;
    }}

    .faq-icon::after {{
      transform: translate(-50%, -50%) rotate(90deg);
    }}

    .faq-item[open] .faq-icon::after {{
      opacity: 0;
      transform: translate(-50%, -50%) rotate(90deg) scaleX(0);
    }}

    .faq-answer {{
      padding: 0 20px 20px;
      color: var(--muted);
      font-size: 0.97rem;
      line-height: 1.72;
    }}

    .faq-answer p {{ margin: 0 0 12px; }}
    .faq-answer p:last-child {{ margin-bottom: 0; }}
    .faq-answer ul {{ margin: 0; padding-left: 20px; }}
    .faq-answer li {{ margin: 8px 0; }}
    .faq-answer a {{
      color: #c9b3ff;
      text-decoration: none;
      border-bottom: 1px solid rgba(201, 179, 255, 0.35);
    }}
    .faq-answer a:hover {{
      color: #dfd2ff;
      border-bottom-color: rgba(223, 210, 255, 0.6);
    }}

    strong {{ color: var(--text); }}
    code {{
      font-family: "JetBrains Mono", ui-monospace, monospace;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      padding: 0.1rem 0.38rem;
      font-size: 0.92em;
    }}

    @media (max-width: 720px) {{
      main {{ width: min(var(--max), calc(100% - 20px)); padding-top: 34px; }}
      .faq-sections {{ gap: 22px; }}
      .faq-item summary {{ padding: 16px 16px; }}
      .faq-answer {{ padding: 0 16px 16px; }}
      .faq-section-head {{ gap: 10px; }}
    }}
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <div class="eyebrow">Gearbox Protocol</div>
      <h1>{html.escape(title)}</h1>
      <div class="intro">{intro_html}</div>
    </section>

    <section class="faq-sections" aria-label="FAQ sections">
      {''.join(section_items)}
    </section>
  </main>
</body>
</html>'''


def main() -> None:
    title, intro, sections = parse_markdown()
    OUTPUT.write_text(build_html(title, intro, sections))
    print(f"Wrote {OUTPUT}")
    print(f"Sections: {len(sections)}")
    print(f"Questions: {sum(len(section.questions) for section in sections)}")


if __name__ == "__main__":
    main()
