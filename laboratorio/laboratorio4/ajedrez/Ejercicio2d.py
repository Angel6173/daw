from interpreter import draw
from chessPictures import *
nsquare= square.join(square.negative())
resultado_d= nsquare.horizontalRepeat(4)
draw(resultado_d)