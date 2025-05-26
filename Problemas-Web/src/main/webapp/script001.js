function verificarBalanceo() {
      const formula = document.getElementById('formula').value;
      const pila = [];
      const apertura = ['[', '{', '('];
      const cierre = [']', '}', ')'];
      const e1 = '({})[]'
      const e2 = '{[()]}'
      const e3 = '({[)]}'

      for (let i = 0; i < formula.length; i++) {
        const c = formula[i];
        if (apertura.includes(c)) {
          pila.push(c);
        } else if (cierre.includes(c)) {
          if (pila.length === 0) {
            document.getElementById('resultado').innerText = "No balanceado";
            return;
          }
          const cTemp = pila[pila.length - 1];
          const indice = apertura.indexOf(cTemp);
          if (cierre[indice] === c) {
            pila.pop();
          } else {
            document.getElementById('resultado').innerText = "No balanceado";
            return;
          }
        }
      }

      if (pila.length !== 0) {
        document.getElementById('resultado').innerText = "No balanceado";
      } else {
        document.getElementById('resultado').innerText = "Balanceado";
      }
    }