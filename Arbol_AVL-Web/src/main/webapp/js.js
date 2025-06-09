/* Constantes para moverr la animacion*/
const posicionX = 500;//posiciion del div x
const posicionY = 0;  // posicion del vi y
const A_Horizontal = 200;  // alturas entre nodos
const A_Vertical = 100; 
const factorSeparacion  = 2.2; //factor entre separacion de cada nodo
const margenNodo = 38;  // tamaño de la linea que une a nodos

/* Nodo del AVL  */
class Node {
  constructor(value) {
    this.value    = value; // valor ingresado "11,22,10"
    this.izquierdo = null; 
    this.derecho   = null;
    this.altura    = 1;
    this.x = 0;
    this.y = 0;
    this.nodo = this._createNode(); //divNodo
  }

  _createNode() {
    const nodoDiv = document.createElement('div'); // crear un elemento div, lo llamo nodoDiv 
    nodoDiv.className     = 'node'; // utilizo la clase node en css
    nodoDiv.textContent   = this.value;  // valores "11,12,13"
    nodoDiv.style.left    = '0px'; // posiciones absolutas en la esquinas, luego en css se centra el node
    nodoDiv.style.top     = '0px';
    document.getElementById('tree').appendChild(nodoDiv); // añade los nodoDiv al div tree
    this.flecha = document.createElementNS(
      'http://www.w3.org/2000/svg', 'line'); // creo un svg de la clase linea
    this.flecha.classList.add('con-flecha');
    document.getElementById('aristas').appendChild(this.flecha); //añado las flechas al div aristas
    return nodoDiv;
  }
  // Esta parte es para mover los nodosDivs -- es mejor solo explicar la logica del balanceo
  mover(x, y, padre = null) {
    this.x = x;
    this.y = y;
    this.nodo.style.left = `${x}px`;  // posiciones ingresadas para utilizar
    this.nodo.style.top  = `${y}px`;
    this.nodo.classList.add('bounce'); // utilizo la animacion bounce-la de css

    if (padre) {
      const x1 = padre.x + 9; // se calcula las coordenas del nodo Padre para el nuevo nodo
      const y1 = padre.y + 10;
      const x2 = x + 9;
      const y2 = y + 19;
      const dx = x2 - x1; // diferencias de abcisas 
      const dy = y2 - y1; // diferencia de ordenadas
      const dist = Math.hypot(dx, dy);  // distania entre 2 puntos
      const ox = (dx / dist) * margenNodo;  // cordendas finales para mover *
      const oy = (dy / dist) * margenNodo; // el margen nodo, es el tamaño de la flecha a nodo,
      this.flecha.setAttribute('x1', x1 + ox); //Establece las coordenadas de la línea SVG 
      this.flecha.setAttribute('y1', y1 + oy);  //para que conecte desde el nodo padre hasta el nodo hijo.
      this.flecha.setAttribute('x2', x2 - ox);
      this.flecha.setAttribute('y2', y2 - oy);
      this.flecha.classList.add('linea-animada');// Añade una clase CSS para aplicar alguna animación visual
      this.flecha.addEventListener(
        'animationend',
        () => this.flecha.setAttribute('marker-end', 'url(#flecha)'),
        { once: true }
      ); //Luego le añade una flecha al final de la línea SVG, usando un marcador SVG (marker-end).
    }
  }
}
//---------------------------------------------
//-------------Árbol AVL-------------------- //
//---------------------------------------------
class AVL {
  constructor() {
    this.raiz = null; // La raíz del árbol AVL
  }

  // Devuelve la altura de un nodo (o 0 si es nulo)
  _altura(nodo) {
    return nodo ? nodo.altura : 0;
  }

  // Recalcula la altura de un nodo según sus hijos
  _recalcularAltura(nodo) {
    nodo.altura = Math.max(
      this._altura(nodo.izquierdo),
      this._altura(nodo.derecho)
    ) + 1;
  }

  // Calcula el factor de equilibrio de un nodo
  _factorEquilibrio(nodo) {
    return this._altura(nodo.derecho) - this._altura(nodo.izquierdo);
  }

  // Rotación simple a la derecha (caso izquierda-izquierda)
  _rotarDerecha(nodoDesbalanceado) {
    const nuevaRaiz = nodoDesbalanceado.izquierdo;
    const subArbolDerecho = nuevaRaiz.derecho;

    nuevaRaiz.derecho = nodoDesbalanceado;
    nodoDesbalanceado.izquierdo = subArbolDerecho;

    this._recalcularAltura(nodoDesbalanceado);
    this._recalcularAltura(nuevaRaiz);

    return nuevaRaiz;
  }

  // Rotación simple a la izquierda (caso derecha-derecha)
  _rotarIzquierda(nodoDesbalanceado) {
    const nuevaRaiz = nodoDesbalanceado.derecho;
    const subArbolIzquierdo = nuevaRaiz.izquierdo;

    nuevaRaiz.izquierdo = nodoDesbalanceado;
    nodoDesbalanceado.derecho = subArbolIzquierdo;

    this._recalcularAltura(nodoDesbalanceado);
    this._recalcularAltura(nuevaRaiz);

    return nuevaRaiz;
  }

  // Inserta un valor en el árbol y mantiene el balance
  insertar(nodo, valor) {
    if (!nodo) return new Node(valor); // Nuevo nodo si está vacío

    // Recursión hacia izquierda o derecha según el valor
    if (valor < nodo.value)
      nodo.izquierdo = this.insertar(nodo.izquierdo, valor);
    else if (valor > nodo.value)
      nodo.derecho = this.insertar(nodo.derecho, valor);

    // Recalcula altura y balancea
    this._recalcularAltura(nodo);
    const fe = this._factorEquilibrio(nodo);

    // Cuatro posibles casos de desbalance
    if (fe < -1 && valor < nodo.izquierdo.value)
      return this._rotarDerecha(nodo);
    if (fe > 1 && valor > nodo.derecho.value)
      return this._rotarIzquierda(nodo);
    if (fe < -1 && valor > nodo.izquierdo.value) {
      nodo.izquierdo = this._rotarIzquierda(nodo.izquierdo);
      return this._rotarDerecha(nodo);
    }
    if (fe > 1 && valor < nodo.derecho.value) {
      nodo.derecho = this._rotarDerecha(nodo.derecho);
      return this._rotarIzquierda(nodo);
    }

    return nodo; // ya balanceado
  }

  // Posiciona visualmente cada nodo en el DOM
  reposition(nodo, x = posicionX, y = posicionY, espacio = A_Horizontal, padre = null) {
    if (!nodo) return;
    nodo.mover(x, y, padre);
    this.reposition(
      nodo.izquierdo, x - espacio, y + A_Vertical, espacio / factorSeparacion, nodo
    );
    this.reposition(
      nodo.derecho,  x + espacio, y + A_Vertical, espacio / factorSeparacion, nodo
    );
  }
}


/* Lógica de UI (interfaz de usuario)*/
const sleep = ms => new Promise(r => setTimeout(r, ms));

document.getElementById('confirmar').addEventListener('click', async () => {
  const input = document.getElementById('numeros');
  const values = input.value.trim().split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
  if (!values.length) {
    alert('Ingresa números válidos separados por coma.');
    return;
  }
  document.getElementById('tree').innerHTML = '';
  const aristas = document.getElementById('aristas');
  aristas.querySelectorAll('line').forEach(line => line.remove());
  input.value = '';
  const tree = new AVL();
  for (const v of values) {
    tree.raiz = tree.insertar(tree.raiz, v);
    tree.reposition(tree.raiz);
    await sleep(1200); // 1.2 segundos de animaacion
  }
});
