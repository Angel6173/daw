from colors import *

class Picture:
  def __init__(self, img):
    self.img = img;

  def __eq__(self, other):
    return self.img == other.img

  def _invColor(self, color):
    if color not in inverter:
      return color
    return inverter[color]

  def verticalMirror(self):
    """ Devuelve el espejo vertical de la imagen """
    vertical = []
    for value in self.img:
      vertical.append(value[::-1])
    return Picture(vertical)

  def horizontalMirror(self):
    
    return Picture(self.img[::-1])

  def negative(self):
    """ Devuelve un negativo de la imagen """
    negative_img =[]
    for value in self.img:
      filas="" 
      for color in value:
        filas += self._invColor(color)
      negative_img.append(filas)
    return Picture(negative_img)

  def join(self, p):
    """ Devuelve una nueva figura poniendo la figura del argumento 
        al lado derecho de la figura actual """
    join =[]
    for value in range(len(self.img)):
      join.append(self.img[value]+p.img[value])
      
    return Picture(join)

  def up(self, p):
    nueva = []

    for i in range(len(self.img)):

      fila = ""

      for j in range(len(self.img[i])):

        # si el pixel de la imagen actual es vacío
        # usa el pixel del fondo
        if self.img[i][j] == " ":
          fila += p.img[i][j]
        else:
          fila += self.img[i][j]

      nueva.append(fila)

    return Picture(nueva)
  def under(self, p):
    """ Devuelve una nueva figura poniendo la figura p sobre la
        figura actual """
    under_img = p.img + self.img
    return Picture(under_img)
  
  def horizontalRepeat(self, n):
    """ Devuelve una nueva figura repitiendo la figura actual al costado
        la cantidad de veces que indique el valor de n """
    repeat = []

    for fila in self.img:
      repeat.append(fila * n)

    return Picture(repeat)

  def verticalRepeat(self, n):
    """ Devuelve una nueva figura repitiendo la figura hacia abajo """
    repeat = []

    for i in range(n):
      repeat += self.img

    return Picture(repeat)

  #Extra: Sólo para realmente viciosos 
  def rotate(self):
    """Devuelve una figura rotada en 90 grados, puede ser en sentido horario
    o antihorario"""
    
    filas = len(self.img)
    columnas = len(self.img[0])

    rotated = []

    for c in range(columnas):
      nueva_fila = ""
      for f in range(filas - 1, -1, -1):
        nueva_fila += self.img[f][c]
      rotated.append(nueva_fila)

    return Picture(rotated)