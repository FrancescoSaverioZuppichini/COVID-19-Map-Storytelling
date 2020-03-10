from pathlib import Path

out_dir = Path('./app/public/chapters')
N = 100

for i in range(N):
    file_path = out_dir / f'{i}.md'
    if not file_path.exists():
        with open(out_dir / f'{i}.md', 'w') as f:
            f.write('')
