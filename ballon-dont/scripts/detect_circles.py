import os
import cv2

p = r"c:\Users\DELL\Documents\Github\Ballon-Don-t\ballon-dont\public\flyers"
for f in ["yashit-1.jpg", "yashit-2.jpg", "jordan-ayew.jpg", "chelsea.jpg"]:
    im = cv2.imread(os.path.join(p, f))
    g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    g = cv2.medianBlur(g, 7)
    h, w = g.shape
    circles = cv2.HoughCircles(
        g,
        cv2.HOUGH_GRADIENT,
        dp=1.2,
        minDist=80,
        param1=80,
        param2=35,
        minRadius=70,
        maxRadius=280,
    )
    print(f, w, h, "circles", None if circles is None else len(circles[0]))
    if circles is not None:
        for c in sorted(circles[0], key=lambda x: (x[1], x[0])):
            print(" ", [round(float(v), 1) for v in c])
