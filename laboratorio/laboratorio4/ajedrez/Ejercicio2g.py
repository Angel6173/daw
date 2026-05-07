from interpreter import draw
from chessPictures import *
# filas del tablero
fila1 = square.join(square.negative()).horizontalRepeat(4)
fila2 = fila1.negative()

# piezas negras
fila_piezas_negras = rock.join(knight)
fila_piezas_negras = fila_piezas_negras.join(bishop)
fila_piezas_negras = fila_piezas_negras.join(queen)
fila_piezas_negras = fila_piezas_negras.join(king)
fila_piezas_negras = fila_piezas_negras.join(bishop)
fila_piezas_negras = fila_piezas_negras.join(knight)
fila_piezas_negras = fila_piezas_negras.join(rock)

fila_piezas_negras = fila_piezas_negras.up(fila1)

# peones negros
fila_peones_negros = pawn.horizontalRepeat(8).up(fila2)

# peones blancos
fila_peones_blancos = fila_peones_negros.negative()

# piezas blancas
fila_piezas_blancas = fila_piezas_negras.negative().up(fila2)

# parte vacía del tablero
centro = fila1.under(fila2)
centro = centro.verticalRepeat(2)

# tablero final
resultado_g = fila_piezas_negras
resultado_g = resultado_g.under(fila_peones_negros)
resultado_g = resultado_g.under(centro)
resultado_g = resultado_g.under(fila_peones_blancos)
resultado_g = resultado_g.under(fila_piezas_blancas)
draw(resultado_g)