from interpreter import draw
from chessPictures import *

blan = square
negr = square.negative()

f8 = rock.up(blan).join(negr).join(bishop.up(blan)).join(queen.up(negr)).join(king.up(blan)).join(bishop.up(negr)).join(knight.up(blan)).join(rock.up(negr))
f7 = pawn.up(negr).join(pawn.up(blan)).join(pawn.up(negr)).join(pawn.up(blan)).join(negr).join(pawn.up(blan)).join(pawn.up(negr)).join(pawn.up(blan))
f6 = blan.join(negr).join(knight.up(blan)).join(negr).join(blan).join(negr).join(blan).join(negr)
f5 = negr.join(blan).join(negr).join(blan).join(pawn.up(negr)).join(blan).join(negr).join(blan)
f4 = blan.join(negr).join(bishop.negative().up(blan)).join(negr).join(pawn.negative().up(blan)).join(negr).join(blan).join(negr)
f3 = negr.join(blan).join(negr).join(blan).join(negr).join(knight.negative().up(blan)).join(negr).join(blan)
f2 = pawn.negative().up(blan).join(pawn.negative().up(negr)).join(pawn.negative().up(blan)).join(pawn.negative().up(negr)).join(blan).join(pawn.negative().up(negr)).join(pawn.negative().up(blan)).join(pawn.negative().up(negr))
f1 = rock.negative().up(negr).join(knight.negative().up(blan)).join(bishop.negative().up(negr)).join(queen.negative().up(blan)).join(king.negative().up(negr)).join(blan).join(negr).join(rock.negative().up(blan))

tablero = f8.under(f7).under(f6).under(f5).under(f4).under(f3).under(f2).under(f1)

draw(tablero)
