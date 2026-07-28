from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "graphics" / "worldwide-delivery"
OUTPUT.mkdir(parents=True, exist_ok=True)


def cover_edge_color(image: Image.Image) -> tuple[int, int, int, int]:
    sample = image.convert("RGB").resize((1, 1), Image.Resampling.LANCZOS)
    red, green, blue = sample.getpixel((0, 0))
    return (
        max(18, int(red * 0.55)),
        max(18, int(green * 0.55)),
        max(18, int(blue * 0.55)),
        255,
    )


def make_book_mockup(
    source_name: str,
    output_name: str,
    angle: float,
    target_height: int,
) -> None:
    source = ROOT / "assets" / "books" / source_name
    cover = Image.open(source).convert("RGBA")
    scale = target_height / cover.height
    cover = cover.resize(
        (round(cover.width * scale), target_height),
        Image.Resampling.LANCZOS,
    )

    board_pad = 7
    page_depth = 15
    book_width = cover.width + board_pad * 2
    book_height = cover.height + board_pad * 2

    book = Image.new(
        "RGBA",
        (book_width + page_depth + 6, book_height + page_depth + 6),
        (0, 0, 0, 0),
    )
    draw = ImageDraw.Draw(book)

    board_color = cover_edge_color(cover)
    draw.rectangle(
        (page_depth, page_depth, page_depth + book_width, page_depth + book_height),
        fill=board_color,
    )

    page_left = board_pad + 4
    page_top = board_pad + 5
    page_right = page_left + cover.width
    page_bottom = page_top + cover.height
    for offset in range(page_depth, 0, -3):
        tone = 222 + min(22, offset)
        draw.rectangle(
            (
                page_left + offset,
                page_top + offset,
                page_right + offset,
                page_bottom + offset,
            ),
            fill=(tone, tone - 6, tone - 18, 255),
            outline=(173, 159, 128, 170),
            width=1,
        )

    book.alpha_composite(cover, (board_pad, board_pad))

    rotated = book.rotate(
        angle,
        resample=Image.Resampling.BICUBIC,
        expand=True,
    )

    margin = 52
    canvas = Image.new(
        "RGBA",
        (rotated.width + margin * 2, rotated.height + margin * 2),
        (0, 0, 0, 0),
    )
    alpha = rotated.getchannel("A")
    shadow = Image.new("RGBA", rotated.size, (43, 31, 21, 0))
    shadow.putalpha(alpha.point(lambda value: round(value * 0.30)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))
    canvas.alpha_composite(shadow, (margin + 17, margin + 22))
    canvas.alpha_composite(rotated, (margin, margin))

    bounds = canvas.getbbox()
    if bounds:
        canvas = canvas.crop(bounds)
    canvas.save(OUTPUT / output_name, optimize=True)


def make_web_map() -> None:
    source = OUTPUT / "engraved-world-map.png"
    if not source.exists():
        return
    image = Image.open(source).convert("RGB")
    image.save(
        OUTPUT / "engraved-world-map.webp",
        "WEBP",
        quality=88,
        method=6,
    )


def make_ink_map() -> None:
    """Cut the cream plate away so only the engraved linework survives.

    The lossless source paints its lines onto an opaque cream field. Laying
    that rectangle over the page paper leaves a visible seam, and hiding it
    with mix-blend-mode fails because `main` isolates blending. Instead the
    field becomes alpha: darkness drives opacity, and every remaining pixel
    is repainted in one warm ink so page CSS can dial the weight.
    """
    source = OUTPUT / "engraved-world-map.png"
    if not source.exists():
        return

    luminance = Image.open(source).convert("L")
    field = 250
    gain = 2.1
    alpha = luminance.point(
        lambda value: min(255, round(max(0, field - value) * gain))
    )

    ink = Image.new("RGBA", luminance.size, (58, 54, 46, 255))
    ink.putalpha(alpha)
    ink.save(
        OUTPUT / "engraved-world-map-ink.webp",
        "WEBP",
        quality=90,
        method=6,
        exact=True,
    )


if __name__ == "__main__":
    make_web_map()
    make_ink_map()
    make_book_mockup("en-lob.jpeg", "book-light-of-bhagavata.png", -7.0, 520)
    make_book_mockup("en-ssr.jpeg", "book-self-realization.png", 6.0, 540)
    make_book_mockup("en-pqpa.jpeg", "book-perfect-questions.png", 4.0, 500)
    print(f"Built Worldwide Delivery assets in {OUTPUT}")
