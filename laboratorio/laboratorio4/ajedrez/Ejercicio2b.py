from interpreter import draw
from chessPictures import *
nknigth = knight.join(knight.negative())
resultado_b = nknigth.under(nknigth.verticalMirror())
draw(resultado_b)