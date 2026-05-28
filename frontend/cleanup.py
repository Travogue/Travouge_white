#!/usr/bin/env python3
from pathlib import Path

src_dir = Path('src')
exclude = {'vite-env.d.ts'}

# Remove .tsx files
for f in src_dir.rglob('*.tsx'):
    f.unlink()
    print(f'Deleted: {f}')

# Remove .ts files (except vite-env.d.ts)
for f in src_dir.rglob('*.ts'):
    if f.name not in exclude:
        f.unlink()
        print(f'Deleted: {f}')

print('Cleanup complete!')
