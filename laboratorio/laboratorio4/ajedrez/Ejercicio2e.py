from interpreter import draw
from chessPictures import *
nsquare= square.join(square.negative())
resultado_e= nsquare.horizontalRepeat(4).negative()
draw(resultado_e)