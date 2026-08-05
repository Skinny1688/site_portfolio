from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageDraw

BLACK = (0x11, 0x13, 0x18, 255)
ORANGE = (0xFF, 0x5A, 0x1F, 255)
WHITE = (255, 255, 255, 255)

svg = Path(r"C:\portfolio\public\nkt-studio-logo.svg").read_text(encoding="utf-8")
vb = re.search(r'viewBox="0 0 ([0-9.]+) ([0-9.]+)"', svg)
assert vb
vb_w, vb_h = float(vb.group(1)), float(vb.group(2))
scale = 5
img = Image.new("RGBA", (int(vb_w * scale), int(vb_h * scale)), WHITE)
draw = ImageDraw.Draw(img)


def rect(x, y, w, h, color):
    draw.rectangle(
        [x * scale, y * scale, (x + w) * scale, (y + h) * scale],
        fill=color,
    )


def poly(pts, color):
    draw.polygon([(x * scale, y * scale) for x, y in pts], fill=color)


def parse_nums(s: str) -> list[float]:
    return [float(n) for n in re.findall(r"[-+]?\d*\.\d+|[-+]?\d+", s)]


for x, y, w, h, fill in re.findall(
    r'<rect x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)" fill="([^"]+)"',
    svg,
):
    color = ORANGE if fill.upper() == "#FF5A1F" else BLACK
    rect(float(x), float(y), float(w), float(h), color)

for dpath, fill in re.findall(r'<path[^>]*d="([^"]+)"[^>]*fill="([^"]+)"', svg):
    color = ORANGE if fill.upper() == "#FF5A1F" else BLACK
    # evenodd hole support: two subpaths
    subs = re.split(r"(?=M )", dpath.strip())
    subs = [s for s in subs if s.strip()]
    if len(subs) == 2 and "evenodd" in svg[svg.find(dpath) - 80 : svg.find(dpath)]:
        outer = parse_nums(subs[0])
        inner = parse_nums(subs[1])
        poly(list(zip(outer[0::2], outer[1::2])), color)
        # cut hole with white then... on white bg use white hole
        poly(list(zip(inner[0::2], inner[1::2])), WHITE)
    else:
        nums = parse_nums(dpath)
        poly(list(zip(nums[0::2], nums[1::2])), color)

out = Path(r"C:\portfolio\public\nkt-studio-logo.png")
img.save(out)
print(f"saved {out} {img.size}")
