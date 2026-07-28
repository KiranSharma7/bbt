from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "graphics" / "open-book-cta"
OUTPUT.mkdir(parents=True, exist_ok=True)


def build_bhagavad_gita_book() -> None:
    cover = Image.open(ROOT / "assets" / "books" / "en-bg.jpeg").convert("RGBA")
    height = 650
    scale = height / cover.height
    cover = cover.resize(
        (round(cover.width * scale), height),
        Image.Resampling.LANCZOS,
    )

    spine = 28
    board = 7
    pages = 15
    width = cover.width + spine + pages + board * 2
    total_height = cover.height + pages + board * 2

    book = Image.new("RGBA", (width, total_height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(book)
    front_x = spine + board
    front_y = board

    draw.rectangle(
        (
            front_x + pages,
            front_y + pages,
            front_x + cover.width + pages,
            front_y + cover.height + pages,
        ),
        fill=(235, 227, 208, 255),
        outline=(170, 154, 122, 155),
        width=1,
    )
    for offset in range(3, pages, 3):
        draw.line(
            (
                front_x + cover.width + offset,
                front_y + offset,
                front_x + cover.width + offset,
                front_y + cover.height + offset,
            ),
            fill=(170, 154, 122, 130),
            width=1,
        )

    draw.polygon(
        (
            (board, board + 4),
            (front_x, front_y),
            (front_x, front_y + cover.height),
            (board, front_y + cover.height + 7),
        ),
        fill=(165, 25, 49, 255),
    )
    draw.line(
        (board + 5, board + 10, board + 5, front_y + cover.height),
        fill=(244, 245, 248, 78),
        width=2,
    )

    draw.rectangle(
        (
            front_x - board,
            front_y - board,
            front_x + cover.width + board,
            front_y + cover.height + board,
        ),
        fill=(45, 42, 74, 255),
    )
    book.alpha_composite(cover, (front_x, front_y))

    rotated = book.rotate(
        -12.0,
        resample=Image.Resampling.BICUBIC,
        expand=True,
    )
    margin = 78
    canvas = Image.new(
        "RGBA",
        (rotated.width + margin * 2, rotated.height + margin * 2),
        (0, 0, 0, 0),
    )
    alpha = rotated.getchannel("A")
    shadow = Image.new("RGBA", rotated.size, (44, 31, 18, 0))
    shadow.putalpha(alpha.point(lambda value: round(value * 0.28)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(19))
    canvas.alpha_composite(shadow, (margin + 23, margin + 27))
    canvas.alpha_composite(rotated, (margin, margin))

    bounds = canvas.getbbox()
    if bounds:
        canvas = canvas.crop(bounds)
    canvas.save(OUTPUT / "book-bhagavad-gita-open-door.png", optimize=True)


if __name__ == "__main__":
    build_bhagavad_gita_book()
    print(f"Built Open Book CTA assets in {OUTPUT}")
