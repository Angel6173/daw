from interpreter import draw
from chessPictures import *
nknigth = knight.join(knight.negative())
resultado_a = nknigth.under(nknigth.negative())
draw(resultado_a)