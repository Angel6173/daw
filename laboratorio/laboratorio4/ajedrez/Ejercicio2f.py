from interpreter import draw
from chessPictures import *
nsquare= square.join(square.negative())
nnsquare= nsquare.horizontalRepeat(4)
nnnsquare= nnsquare.under(nnsquare.negative())
resultado_f= nnnsquare.verticalRepeat(2)
draw(resultado_f)