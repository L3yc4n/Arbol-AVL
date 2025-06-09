/* Constantes para mover la animacion*/
const INIT_X        = 500;
const INIT_Y        = 0;
const H_GAP         = 110;
const V_GAP         = 100;
const SP_FACTOR     = 1.6;
const NODE_MARGIN   = 28;

/* Nodo del AVL  */
class Node {
  constructor(value) {
    this.value   = value;
    this.left    = null;
    this.right   = null;
    this.height  = 1;
    this.x = 0;
    this.y = 0;
    this.dom = this._createNode();
  }

  _createNode() {
    const el = document.createElement('div');
    el.className     = 'node';
    el.textContent   = this.value;
    el.style.left    = '0px';
    el.style.top     = '0px';
    document.getElementById('tree').appendChild(el);
    this.edge = document.createElementNS(
      'http://www.w3.org/2000/svg', 'line'
    );
    this.edge.classList.add('con-flecha');
    document.getElementById('aristas').appendChild(this.edge);
    return el;
  }

  move(x, y, padre = null) {
    this.x = x;
    this.y = y;
    this.dom.style.left = `${x}px`;
    this.dom.style.top  = `${y}px`;
    this.dom.classList.add('bounce');

    if (padre) {
      const x1 = padre.x + 9;
      const y1 = padre.y + 10;
      const x2 = x + 9;
      const y2 = y + 19;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.hypot(dx, dy);
      const ox = (dx / dist) * NODE_MARGIN;
      const oy = (dy / dist) * NODE_MARGIN;
      this.edge.setAttribute('x1', x1 + ox);
      this.edge.setAttribute('y1', y1 + oy);
      this.edge.setAttribute('x2', x2 - ox);
      this.edge.setAttribute('y2', y2 - oy);
      this.edge.classList.add('linea-animada');
      this.edge.addEventListener(
        'animationend',
        () => this.edge.setAttribute('marker-end', 'url(#flecha)'),
        { once: true }
      );
    }
  }
}
//---------------------------------------------
//-------------Árbol AVL-------------------- //
//---------------------------------------------
class AVL {
  constructor() {
    this.root = null;
  }
  _height(node) {
    return node ? node.height : 0; 
  }
  _recalc(node) {
    node.height = Math.max(
      this._height(node.left),
      this._height(node.right)
    ) + 1;
  }

  _FE(node) {
    return this._height(node.right) - this._height(node.left);
  }

  _rotateRight(y) {
    const x  = y.left;
    const T2 = x.right;
    x.right = y;
    y.left  = T2;
    this._recalc(y);
    this._recalc(x);
    return x;
  }

  _rotateLeft(x) {
    const y  = x.right;
    const T2 = y.left;
    y.left  = x;
    x.right = T2;
    this._recalc(x);
    this._recalc(y);
    return y;
  }

  insert(node, value) {
    if (!node) return new Node(value);
    if (value < node.value) node.left  = this.insert(node.left, value);
    else if (value > node.value) node.right = this.insert(node.right, value);
    // duplicados ignorados
    this._recalc(node);
    const FE = this._FE(node);
    if (FE < -1 && value < node.left.value)        return this._rotateRight(node);
    if (FE >  1 && value > node.right.value)       return this._rotateLeft(node);
    if (FE < -1 && value > node.left.value) {
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }
    if (FE >  1 && value < node.right.value) {
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }
    return node;
  }

  reposition(node, x = INIT_X, y = INIT_Y, spacing = H_GAP, padre = null) {
    if (!node) return;
    node.move(x, y, padre);
    this.reposition(
      node.left,  x - spacing,     y + V_GAP, spacing / SP_FACTOR, node
    );
    this.reposition(
      node.right, x + spacing,     y + V_GAP, spacing / SP_FACTOR, node
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
  aristas.querySelectorAll('line').forEach(line => line.remove());
  input.value = '';
  const tree = new AVL();
  for (const v of values) {
    tree.root = tree.insert(tree.root, v);
    tree.reposition(tree.root);
    await sleep(1200); // 1.2 segundos de animaacion
  }
});
