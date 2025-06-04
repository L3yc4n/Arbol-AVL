 class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
        this.contador = 1;
        this.altura = 1;
    }

    getValor() {
        return this.valor;
    }

    setValor(valor) {
        this.valor = valor;
    }

    getIzquierda() {
        return this.izquierda;
    }

    setIzquierda(izquierda) {
        this.izquierda = izquierda;
    }

    getDerecha() {
        return this.derecha;
    }

    setDerecha(derecha) {
        this.derecha = derecha;
    }

    getContador() {
        return this.contador;
    }

    incrementarContador() {
        this.contador++;
    }

    getAltura() {
        return this.altura;
    }

    setAltura(altura) {
        this.altura = altura;
    }
}

class ABB {
    constructor() {
        this.raiz = null; 
    }
    altura(ptr) {
        if (ptr === null) {
            return 0;
        } else {
            return ptr.getAltura();
        }
    }

    agregar(ptr, valor) {
        if (ptr === null) {
            return new Nodo(valor);
        } else {
            if (valor < ptr.getValor()) {
                ptr.setIzquierda(this.agregar(ptr.getIzquierda(), valor));
            } else if (valor > ptr.getValor()) {
                ptr.setDerecha(this.agregar(ptr.getDerecha(), valor));
            } else {
                ptr.incrementarContador();
            }
        }
        ptr.setAltura(
            Math.max(this.altura(ptr.getIzquierda()), this.altura(ptr.getDerecha())) + 1
        );
        return this.equilibrar(ptr);
    }

    rDer(ptr) {
        let aux = ptr.getIzquierda();
        ptr.setIzquierda(aux.getDerecha());
        aux.setDerecha(ptr);

        ptr.setAltura(
            Math.max(this.altura(ptr.getIzquierda()), this.altura(ptr.getDerecha())) + 1
        );
        aux.setAltura(
            Math.max(this.altura(aux.getIzquierda()), this.altura(aux.getDerecha())) + 1
        );
        return aux;
    }

    rIzq(ptr) {
        let aux = ptr.getDerecha();
        ptr.setDerecha(aux.getIzquierda());
        aux.setIzquierda(ptr);

        ptr.setAltura(
            Math.max(this.altura(ptr.getIzquierda()), this.altura(ptr.getDerecha())) + 1
        );
        aux.setAltura(
            Math.max(this.altura(aux.getIzquierda()), this.altura(aux.getDerecha())) + 1
        );
        return aux;
    }
    FE(ptr) {
        return this.altura(ptr.getDerecha()) - this.altura(ptr.getIzquierda());
    }

    equilibrar(ptr) {
        if (this.FE(ptr) > 1) {
            if (this.FE(ptr.getDerecha()) < 0) {
                ptr.setDerecha(this.rDer(ptr.getDerecha()));
            }
            ptr = this.rIzq(ptr);
        } else if (this.FE(ptr) < -1) {
            if (this.FE(ptr.getIzquierda()) > 0) {
                ptr.setIzquierda(this.rIzq(ptr.getIzquierda()));
            }
            ptr = this.rDer(ptr);
        }
        return ptr;
    }
    preorden(ptr) {
        if (ptr !== null) {
            this.preorden(ptr.getIzquierda());
            console.log(ptr.getValor() + " - " + ptr.getAltura());
            this.preorden(ptr.getDerecha());
        }
    }
}

document.getElementById("confirmar").addEventListener("click", () => {
    const input = document.getElementById("numeros");
    const resultadoDiv = document.querySelector(".result");
    resultadoDiv.innerHTML = "Resultado:<br>";

    if (!input.value.trim()) {
        alert("Ingresa números separados por coma.");
        return;
    }
    const numeros = input.value.split(",").map(n => n.trim()).filter(n => n !== "").map(Number);

    if (numeros.some(isNaN)) {
        alert("Todos los valores deben ser números válidos.");
        return;
    }

    const arbol = new ABB();
    numeros.forEach(n => {
        arbol.raiz = arbol.agregar(arbol.raiz, n);
    });

    function mostrarPreorden(nodo) {
        if (nodo !== null) {
            mostrarPreorden(nodo.getIzquierda());
            const p = document.createElement("p");
            p.textContent = `${nodo.getValor()} - Altura: ${nodo.getAltura()}`;
            resultadoDiv.appendChild(p);
            mostrarPreorden(nodo.getDerecha());
        }
    }
    mostrarPreorden(arbol.raiz);
});
