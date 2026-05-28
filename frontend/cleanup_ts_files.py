from pathlib import Path
for pattern in ['*.tsx', '*.ts', '*.d.ts']:
    for f in Path('src').glob(pattern):
        try:
            f.unlink()
            print(f'Deleted {f}')
        except Exception as e:
            print(f'Failed to delete {f}: {e}')
