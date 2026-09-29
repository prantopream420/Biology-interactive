"""Generate the launcher icon PNGs without third-party deps (pure zlib+struct).

Draws the app mark: a cyan DNA-ish double helix on the slate-950 background used
by the app's Android chrome. Rendered at the mipmap densities Android expects.
"""
import os
import struct
import zlib

BG = (2, 6, 23)        # slate-950
CYAN = (34, 211, 238)  # cyan-400
DEEP = (8, 47, 73)

SIZES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}


def write_png(path, pixels, size):
    raw = b"".join(
        b"\x00" + b"".join(bytes(pixels[y][x]) for x in range(size))
        for y in range(size)
    )

    def chunk(tag, data):
        c = tag + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c))

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(raw, 9))
    png += chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(png)


def render(size):
    s = size
    # Supersample 3x for smooth curves.
    ss = 3
    n = s * ss
    acc = [[(0.0, 0.0, 0.0) for _ in range(s)] for _ in range(s)]

    # Helix rails: two sine curves offset in phase.
    amp = 0.26
    mid = 0.5
    freq = 1.35
    phase = [0.0, 0.55]

    def in_rail(x, y, ph):
        cx = mid + amp * (1 if ph == 0 else -1) * 0.0
        # y = f(x) for this strand
        t = (x - cx) / 0.5
        if abs(t) > 1.0:
            return False
        yy = mid + amp * _sin(freq * 3.14159 * (t * 0.5 + 0.5) + ph)
        return abs(y - yy) < 0.055

    def _sin(v):
        import math
        return math.sin(v)

    def in_rung(x, y, ph):
        cx = mid
        t = (x - cx) / 0.5
        if abs(t) > 1.0:
            return False
        ya = mid + amp * _sin(freq * 3.14159 * (t * 0.5 + 0.5) + phase[0])
        yb = mid + amp * _sin(freq * 3.14159 * (t * 0.5 + 0.5) + phase[1])
        lo, hi = min(ya, yb), max(ya, yb)
        if lo <= y <= hi and abs(y - lo) < 0.03 and abs(y - hi) < 0.03:
            return True
        return False

    for py in range(n):
        for px in range(n):
            x = (px + 0.5) / n
            y = (py + 0.5) / n

            # Rounded-square background mask (Android masks legacy icons lightly).
            r = 0.22
            inx = min(x, 1 - x)
            iny = min(y, 1 - y)
            if inx < r and iny < r:
                dx, dy = r - inx, r - iny
                if (dx * dx + dy * dy) ** 0.5 > r:
                    continue

            color = BG
            if in_rail(x, y, 0.0) or in_rail(x, y, 1.0):
                color = CYAN
            elif in_rung(x, y, 0):
                color = DEEP
            else:
                # Soft radial vignette glow.
                d = ((x - 0.5) ** 2 + (y - 0.5) ** 2) ** 0.5
                g = max(0.0, 1.0 - d / 0.62) ** 2 * 0.16
                color = tuple(int(BG[i] + (CYAN[i] - BG[i]) * g) for i in range(3))

            ox, oy = px // ss, py // ss
            cr, cg, cb = acc[oy][ox]
            acc[oy][ox] = (cr + color[0], cg + color[1], cb + color[2])

    total = ss * ss
    return [[
        (int(acc[y][x][0] / total), int(acc[y][x][1] / total), int(acc[y][x][2] / total))
        for x in range(s)
    ] for y in range(s)]


def main():
    out_root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "res")
    for folder, size in SIZES.items():
        d = os.path.join(out_root, folder)
        os.makedirs(d, exist_ok=True)
        pixels = render(size)
        write_png(os.path.join(d, "ic_launcher.png"), pixels, size)
        write_png(os.path.join(d, "ic_launcher_round.png"), pixels, size)
        print(f"wrote {folder}/ic_launcher.png ({size}x{size})")


if __name__ == "__main__":
    main()
