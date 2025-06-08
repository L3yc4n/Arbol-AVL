class Nodo {
  constructor(valor, x = 0, y = 0) {
    this.valor      = valor;
    this.izquierda  = null;
    this.derecha    = null;
    this.contador   = 1;
    this.altura     = 1;

    /* --- coordenadas + div visual --- */
    this.x = x;
    this.y = y;
    this.dom = this.#crearDom();
  }

  #crearDom() {
    const d = document.createElement("div");
    d.className = "node";
    d.textContent = this.valor;
    d.style.left = this.x + "px";
    d.style.top  = this.y + "px";
    document.getElementById("tree").appendChild(d);
    return d;
  }

  mover(x, y) {
    this.x = x;
    this.y = y;
    this.dom.style.left = x + "px";
    this.dom.style.top  = y + "px";
  }

  /* getters convencionales, por si los usas en otra parte */
  getValor()            { return this.valor; }
  getIzquierda()        { return this.izquierda; }
  getDerecha()          { return this.derecha; }
  getAltura()           { return this.altura; }
  setIzquierda(n)       { this.izquierda = n; }
  setDerecha(n)         { this.derecha   = n; }
  setAltura(h)          { this.altura    = h; }
  incrementarContador() { this.contador++; }
}

/* =========================================================
   Árbol AVL   
   ========================================================= */
class AVL {
  constructor() { this.raiz = null; }

  /* altura segura */
  altura(n) { return n ? n.getAltura() : 0; }

  /* --------- Rotaciones básicas --------- */
  rDer(y) {
    const x  = y.getIzquierda();
    const T2 = x.getDerecha();
    x.setDerecha(y);
    y.setIzquierda(T2);

    y.setAltura(Math.max(this.altura(y.getIzquierda()),
                         this.altura(y.getDerecha())) + 1);
    x.setAltura(Math.max(this.altura(x.getIzquierda()),
                         this.altura(x.getDerecha())) + 1);
    return x;
  }

  rIzq(x) {
    const y  = x.getDerecha();
    const T2 = y.getIzquierda();
    y.setIzquierda(x);
    x.setDerecha(T2);

    x.setAltura(Math.max(this.altura(x.getIzquierda()),
                         this.altura(x.getDerecha())) + 1);
    y.setAltura(Math.max(this.altura(y.getIzquierda()),
                         this.altura(y.getDerecha())) + 1);
    return y;
  }

  FE(n) { return this.altura(n?.getDerecha()) - this.altura(n?.getIzquierda()); }

  /* --------- Inserción con coords iniciales --------- */
  agregar(n, val, x = 500, y = 40, sp = 120) {
    if (!n) return new Nodo(val, x, y);

    if (val < n.getValor())
      n.setIzquierda(this.agregar(n.getIzquierda(), val, x - sp, y + 80, sp / 1.5));
    else if (val > n.getValor())
      n.setDerecha(this.agregar(n.getDerecha(),   val, x + sp, y + 80, sp / 1.5));
    else
      n.incrementarContador();                        // valor duplicado

    /* actualizar altura y equilibrar */
    n.setAltura(Math.max(this.altura(n.getIzquierda()),
                         this.altura(n.getDerecha())) + 1);

    /* equilibrio */
    const fe = this.FE(n);

    // LL
    if (fe < -1 && val < n.getIzquierda().getValor()) return this.rDer(n);
    // RR
    if (fe >  1 && val > n.getDerecha().getValor())   return this.rIzq(n);
    // LR
    if (fe < -1 && val > n.getIzquierda().getValor()) {
      n.setIzquierda(this.rIzq(n.getIzquierda()));
      return this.rDer(n);
    }
    // RL
    if (fe >  1 && val < n.getDerecha().getValor()) {
      n.setDerecha(this.rDer(n.getDerecha()));
      return this.rIzq(n);
    }
    return n;
  }

  /* --------- Recolocar nodos en pantalla --------- */
  reposicionar(n, x = 500, y = 40, sp = 120) {
    if (!n) return;
    n.mover(x, y);
    this.reposicionar(n.getIzquierda(), x - sp, y + 80, sp / 1.5);
    this.reposicionar(n.getDerecha(),   x + sp, y + 80, sp / 1.5);
  }
}

/* =========================================================
   Lógica UI: leer entrada, insertar secuencialmente, animar
   ========================================================= */
const sleep = ms => new Promise(r => setTimeout(r, ms));

document.getElementById("confirmar").addEventListener("click", async () => {
  const raw = document.getElementById("numeros").value.trim();
  if (!raw) { alert("Ingresa números separados por coma."); return; }

  const nums = raw.split(",").map(s => +s.trim()).filter(n => !isNaN(n));
  if (!nums.length) { alert("Todos los valores deben ser números."); return; }

  /* reiniciar escenario */
  document.getElementById("tree").innerHTML = "";
  const arbol = new AVL();

  /* insertar uno a uno con retardo para ver la animación */
  for (const n of nums) {
    arbol.raiz = arbol.agregar(arbol.raiz, n);  // inserta + balancea
    arbol.reposicionar(arbol.raiz);             // mueve nodos
    await sleep(900);                           // espera 0.9  s
  }
});
