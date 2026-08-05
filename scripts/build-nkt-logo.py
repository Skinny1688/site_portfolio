"""Generate NKT Studio logo SVG — modular monogram, font-independent wordmark."""
from __future__ import annotations

import math
from pathlib import Path

BLACK = "#111318"
ORANGE = "#FF5A1F"

S = 28.0
H = 140.0
PAD = 16.0
TOP = PAD
BOT = TOP + H
MID = TOP + H / 2
HALF = S / 2

N_LEFT = PAD
GAP = H - S
STEM = N_LEFT + S + GAP
STEM_R = STEM + S

JX = STEM_R
JY = MID
RISE = H / 2
RUN = RISE * 0.92


def end_point(sign: int) -> tuple[float, float]:
    length = math.hypot(RUN, RISE)
    uy = (sign * RISE) / length
    py = RUN / length  # perp y abs from (-uy, ux) with ux=RUN/L
    y1 = JY + sign * RISE - sign * abs(py) * HALF
    x1 = JX + abs(y1 - JY) * (RUN / RISE)
    return x1, y1


def arm_poly(sign: int) -> list[tuple[float, float]]:
    """Constant-thickness diagonal. Start buried in shared stem so the visible
    apex is a single point on the stem's right edge; stem is painted on top."""
    x1, y1 = end_point(sign)
    dx, dy = x1 - JX, y1 - JY
    L = math.hypot(dx, dy)
    ux, uy = dx / L, dy / L
    ppx, ppy = -uy, ux

    # Deep bury under stem (stem width = S)
    back = S * 0.92
    sx, sy = JX - ux * back, JY - uy * back
    # Tiny forward seal into T join
    fwd = 0.5
    ex, ey = x1 + ux * fwd, y1 + uy * fwd

    return [
        (sx + ppx * HALF, sy + ppy * HALF),
        (sx - ppx * HALF, sy - ppy * HALF),
        (ex - ppx * HALF, ey - ppy * HALF),
        (ex + ppx * HALF, ey + ppy * HALF),
    ]


up_pts = arm_poly(-1)
lo_pts = arm_poly(+1)

arms_right = max(
    max(p[0] for p in up_pts),
    max(p[0] for p in lo_pts),
)
# Hard flush with T
T_LEFT = arms_right - 1.25
OVER = S * 0.85
T_BAR_W = S + 2 * OVER
T_STEM_X = T_LEFT + (T_BAR_W - S) / 2

mono_right = T_LEFT + T_BAR_W
mono_cx = (PAD + mono_right) / 2

n_diag = [
    (N_LEFT + S, TOP),
    (STEM, BOT - S),
    (STEM, BOT),
    (N_LEFT + S, TOP + S),
]


def path_d(pts: list[tuple[float, float]]) -> str:
    return "M " + " L ".join(f"{x:.3f} {y:.3f}" for x, y in pts) + " Z"


LH = 17.0
SW = 3.0
gap = 4.2
adv = {"S": 13.0, "T": 12.5, "U": 13.5, "D": 13.5, "I": 3.0, "O": 14.0}
word = "STUDIO"
total_w = sum(adv[c] for c in word) + gap * (len(word) - 1)
start_x = mono_cx - total_w / 2
base = BOT + 34


def studio_svg() -> str:
    parts: list[str] = []
    x = start_x
    for ch in word:
        w = adv[ch]
        top = base - LH
        mid = base - LH / 2
        if ch == "S":
            parts += [
                f'<rect x="{x:.3f}" y="{top:.3f}" width="{w:.3f}" height="{SW:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x:.3f}" y="{mid - SW/2:.3f}" width="{w:.3f}" height="{SW:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x:.3f}" y="{base - SW:.3f}" width="{w:.3f}" height="{SW:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x:.3f}" y="{top:.3f}" width="{SW:.3f}" height="{LH/2 + SW/2:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x + w - SW:.3f}" y="{mid - SW/2:.3f}" width="{SW:.3f}" height="{LH/2 + SW/2:.3f}" fill="{BLACK}"/>',
            ]
        elif ch == "T":
            parts.append(
                f'<rect x="{x:.3f}" y="{top:.3f}" width="{w:.3f}" height="{SW:.3f}" fill="{BLACK}"/>'
            )
            parts.append(
                f'<rect x="{x + (w - SW) / 2:.3f}" y="{top:.3f}" width="{SW:.3f}" height="{LH:.3f}" fill="{BLACK}"/>'
            )
        elif ch == "U":
            parts += [
                f'<rect x="{x:.3f}" y="{top:.3f}" width="{SW:.3f}" height="{LH - SW:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x + w - SW:.3f}" y="{top:.3f}" width="{SW:.3f}" height="{LH - SW:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x:.3f}" y="{base - SW:.3f}" width="{w:.3f}" height="{SW:.3f}" fill="{BLACK}"/>',
            ]
        elif ch == "D":
            parts += [
                f'<rect x="{x:.3f}" y="{top:.3f}" width="{SW:.3f}" height="{LH:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x:.3f}" y="{top:.3f}" width="{w - SW:.3f}" height="{SW:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x:.3f}" y="{base - SW:.3f}" width="{w - SW:.3f}" height="{SW:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x + w - SW:.3f}" y="{top + SW:.3f}" width="{SW:.3f}" height="{LH - 2 * SW:.3f}" fill="{BLACK}"/>',
            ]
        elif ch == "I":
            parts.append(
                f'<rect x="{x:.3f}" y="{top:.3f}" width="{w:.3f}" height="{LH:.3f}" fill="{BLACK}"/>'
            )
        elif ch == "O":
            parts += [
                f'<rect x="{x:.3f}" y="{top:.3f}" width="{w:.3f}" height="{SW:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x:.3f}" y="{base - SW:.3f}" width="{w:.3f}" height="{SW:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x:.3f}" y="{top:.3f}" width="{SW:.3f}" height="{LH:.3f}" fill="{BLACK}"/>',
                f'<rect x="{x + w - SW:.3f}" y="{top:.3f}" width="{SW:.3f}" height="{LH:.3f}" fill="{BLACK}"/>',
            ]
        x += w + gap
    return "".join(parts)


vb_w = mono_right + PAD
vb_h = base + PAD

mono = f'''  <g id="monogram">
    <rect x="{N_LEFT:.3f}" y="{TOP:.3f}" width="{S:.3f}" height="{H:.3f}" fill="{BLACK}"/>
    <path d="{path_d(n_diag)}" fill="{BLACK}"/>
    <path d="{path_d(lo_pts)}" fill="{BLACK}"/>
    <path d="{path_d(up_pts)}" fill="{ORANGE}"/>
    <rect x="{STEM:.3f}" y="{TOP:.3f}" width="{S:.3f}" height="{H:.3f}" fill="{BLACK}"/>
    <rect x="{T_LEFT:.3f}" y="{TOP:.3f}" width="{T_BAR_W:.3f}" height="{S:.3f}" fill="{BLACK}"/>
    <rect x="{T_STEM_X:.3f}" y="{TOP:.3f}" width="{S:.3f}" height="{H:.3f}" fill="{BLACK}"/>
  </g>
  <g id="wordmark">{studio_svg()}</g>'''

svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w:.3f} {vb_h:.3f}" role="img" aria-label="NKT Studio">
  <title>NKT Studio</title>
{mono}
</svg>
'''

demo = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w:.3f} {vb_h:.3f}" role="img" aria-label="NKT Studio">
  <title>NKT Studio</title>
  <rect width="100%" height="100%" fill="#FFFFFF"/>
{mono}
</svg>
'''

out_dir = Path(__file__).resolve().parents[1] / "public"
out_dir.mkdir(parents=True, exist_ok=True)
(out_dir / "nkt-studio-logo.svg").write_text(svg, encoding="utf-8")
(out_dir / "nkt-studio-logo-demo-white.svg").write_text(demo, encoding="utf-8")
print(f"viewBox 0 0 {vb_w:.2f} {vb_h:.2f}")
print(f"apex ({JX:.1f},{JY:.1f}) T_LEFT={T_LEFT:.2f}")
