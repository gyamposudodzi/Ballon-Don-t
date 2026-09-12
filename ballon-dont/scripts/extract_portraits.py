"""Crop flyer circles and polish online portraits into /public/portraits."""

from __future__ import annotations

import io
import json
import os
import urllib.parse
import urllib.request

import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FLYERS = os.path.join(ROOT, "public", "flyers")
OUT = os.path.join(ROOT, "public", "portraits")
os.makedirs(OUT, exist_ok=True)

SIZE = 720

# Hardcoded from the 819x1024 Yashit posters (cx, cy, r)
YASHIT = {
    "yashit-1.jpg": {
        "guglielmo-vicario": (210, 230, 126),
        "fernando-muslera": (511, 229, 126),
        "filip-jorgenson": (210, 550, 124),
        "lucas-chevalier": (512, 551, 125),
        "luca-zidane": (210, 872, 126),
    },
    "yashit-2.jpg": {
        "michele-di-gregorio": (510, 229, 125),
        "altay-bayindir": (208, 552, 123),
        "antonin-kinsky": (507, 548, 123),
        "giorgi-mamardashvili": (207, 873, 126),
    },
}

WIKI = {
    "alvaro-arbeloa": "Álvaro_Arbeloa",
    "arne-slot": "Arne_Slot",
    "liam-rosenior": "Liam_Rosenior",
    "igor-tudor": "Igor_Tudor",
    "thomas-frank": "Thomas_Frank_(football_manager)",
    "ruben-amorim": "Rúben_Amorim",
    "robert-sanchez": "Robert_Sánchez",
}

PLAYER_FLYERS = [
    "jordan-ayew",
    "eduardo-camavinga",
    "florian-wirtz",
    "alexander-isak",
    "randal-kolo-muani",
    "jadon-sancho",
    "alejandro-garnacho",
    "liam-delap",
    "ferran-torres",
    "edon-zhegrova",
    "noni-madueke",
    "leon-goretzka",
    "cristiano-ronaldo",
    "jeremie-frimpong",
    "savinho",
    "rafael-leao",
    "gavi",
    "alexander-sorloth",
    "franco-mastantuono",
    "leroy-sane",
    "phil-foden",
    "mathys-tel",
]

CLUB_FLYERS = ["chelsea", "ac-milan", "tottenham", "real-madrid", "juventus"]


def polish(im: Image.Image) -> Image.Image:
    im = ImageOps.exif_transpose(im).convert("RGB")
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = max(0, (h - side) // 2 - side // 18)
    im = im.crop((left, top, left + side, top + side))
    im = im.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.08)
    im = ImageEnhance.Color(im).enhance(1.06)
    im = ImageEnhance.Sharpness(im).enhance(1.15)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=80, threshold=3))
    return im


def crop_circle(path: str, cx: float, cy: float, r: float) -> Image.Image:
    im = Image.open(path).convert("RGB")
    pad = r * 1.06
    box = (cx - pad, cy - pad, cx + pad, cy + pad)
    return polish(im.crop(box))


def detect_main_circle(path: str) -> tuple[float, float, float]:
    bgr = cv2.imread(path)
    h, w = bgr.shape[:2]
    roi = bgr[0 : int(h * 0.62), 0 : int(w * 0.78)]
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (9, 9), 2)
    circles = cv2.HoughCircles(
        gray,
        cv2.HOUGH_GRADIENT,
        dp=1.15,
        minDist=180,
        param1=130,
        param2=42,
        minRadius=150,
        maxRadius=250,
    )
    if circles is None:
        return (w * 0.32, h * 0.28, min(w, h) * 0.27)
    x, y, r = max(circles[0], key=lambda c: c[2])
    return float(x), float(y), float(r)


def save(im: Image.Image, slug: str) -> str:
    dest = os.path.join(OUT, f"{slug}.jpg")
    im.save(dest, "JPEG", quality=90, optimize=True)
    return dest


def wiki_image(title: str) -> Image.Image:
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(title)}"
    req = urllib.request.Request(url, headers={"User-Agent": "BallonDontPortraitBot/1.0"})
    with urllib.request.urlopen(req, timeout=30) as res:
        data = json.loads(res.read().decode("utf-8"))
    src = data.get("originalimage", {}).get("source") or data.get("thumbnail", {}).get("source")
    if not src:
        raise RuntimeError(f"No image for {title}")
    req = urllib.request.Request(src, headers={"User-Agent": "BallonDontPortraitBot/1.0"})
    with urllib.request.urlopen(req, timeout=30) as res:
        raw = res.read()
    return polish(Image.open(io.BytesIO(raw)))


def main() -> None:
    for flyer, people in YASHIT.items():
        path = os.path.join(FLYERS, flyer)
        for slug, (cx, cy, r) in people.items():
            dest = save(crop_circle(path, cx, cy, r), slug)
            print("yashit", slug, dest)

    for slug in PLAYER_FLYERS + CLUB_FLYERS:
        path = os.path.join(FLYERS, f"{slug}.jpg")
        if not os.path.exists(path):
            print("missing flyer", slug)
            continue
        cx, cy, r = detect_main_circle(path)
        dest = save(crop_circle(path, cx, cy, r), slug)
        print("flyer", slug, round(cx), round(cy), round(r), dest)

    for slug, title in WIKI.items():
        try:
            dest = save(wiki_image(title), slug)
            print("wiki", slug, dest)
        except Exception as exc:
            print("wiki fail", slug, exc)


if __name__ == "__main__":
    main()
