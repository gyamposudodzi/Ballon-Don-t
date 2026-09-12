import io
import json
import os
import ssl
import urllib.parse
import urllib.request

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FLYERS = os.path.join(ROOT, "public", "flyers")
OUT = os.path.join(ROOT, "public", "portraits")
SIZE = 720

CTX = ssl._create_unverified_context()

WIKI = {
    "alvaro-arbeloa": "Álvaro_Arbeloa",
    "arne-slot": "Arne_Slot",
    "liam-rosenior": "Liam_Rosenior",
    "igor-tudor": "Igor_Tudor",
    "thomas-frank": "Thomas_Frank_(football_manager)",
    "ruben-amorim": "Rúben_Amorim",
    "robert-sanchez": "Robert_Sánchez",
}

FIX_CROPS = {
    "alejandro-garnacho": ("alejandro-garnacho.jpg", 255, 265, 215),
    "ac-milan": ("ac-milan.jpg", 250, 250, 210),
}


def polish(im: Image.Image) -> Image.Image:
    im = ImageOps.exif_transpose(im).convert("RGB")
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = max(0, (h - side) // 2 - side // 16)
    im = im.crop((left, top, left + side, top + side))
    im = im.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.08)
    im = ImageEnhance.Color(im).enhance(1.06)
    im = ImageEnhance.Sharpness(im).enhance(1.15)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=80, threshold=3))
    return im


def save(im: Image.Image, slug: str) -> None:
    dest = os.path.join(OUT, f"{slug}.jpg")
    im.save(dest, "JPEG", quality=90, optimize=True)
    print("saved", dest)


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "BallonDontPortraitBot/1.0"})
    with urllib.request.urlopen(req, timeout=40, context=CTX) as res:
        return res.read()


for slug, (flyer, cx, cy, r) in FIX_CROPS.items():
    im = Image.open(os.path.join(FLYERS, flyer)).convert("RGB")
    pad = r * 1.06
    save(polish(im.crop((cx - pad, cy - pad, cx + pad, cy + pad))), slug)

for slug, title in WIKI.items():
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(title)}"
    try:
        data = json.loads(fetch(url).decode("utf-8"))
        src = data.get("originalimage", {}).get("source") or data.get("thumbnail", {}).get("source")
        if not src:
            print("no image", slug, data.get("title"))
            continue
        save(polish(Image.open(io.BytesIO(fetch(src)))), slug)
    except Exception as exc:
        print("fail", slug, exc)
