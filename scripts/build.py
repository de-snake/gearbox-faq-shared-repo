from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

subprocess.run([sys.executable, str(ROOT / 'scripts' / 'render_faq_preview.py')], check=True)
shutil.copy2(ROOT / 'faq-preview.html', ROOT / 'index.html')
print(f'Refreshed {ROOT / "index.html"}')
