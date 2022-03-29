"use strict";
// Si tratta di muovere i 3 cavalli (cavallo--rosso,cavallo--blue,cavallo--giallo)
// dal basso verso l'alto (bottom to top)
// in 31 step di 20px (l'altezza del campo è 600px + l'arrivo).
// Per ogni singolo cavallo lo step deve essere effettuato in un lasso di tempo
// casuale tra 300 a 800 ms
// Appena il primo dei tre cavalli raggiunge i 31 step vince e deve apparire la
// scritta presente nel div cavallo--vince
// Anche gli altri 2 cavalli devo arrivare al traguardo.

const altezzaCampo = 620;
//isOver è una variabile di stato che rappresenta l'andamento della gara
let isOver = false;

//funzione che si occupa di gestire la gara di un singolo cavallo
function cavallo(cvlElement, onFinish) {
    let steps = 31;
    const distance = 20;
    const timerMin = 300;
    const timerMax = 800;
    //contatore dei passi del cavallo
    let moves = 0;

    //funzione che gestisce la corsa del cavallo
    const corri = function() {
        //genero il lasso di tempo per il movimento
        const timeout = Math.trunc(
            Math.random() * (timerMax - timerMin) + timerMin
        );
        setTimeout(() => {
            //cambio la posizione con animazione
            cvlElement.style = `bottom:${
        moves * distance
      }px;transition: bottom ${timeout}ms linear;`;
            //incremento spostamenti
            moves++;

            if (moves < steps) {
                corri();
            } else {
                onFinish();
            }
        }, timeout);
    };

    //faccio partire il cavallo
    corri();
}

class Cavallo {
    constructor(cvlElement, steps, onFinish) {
        this.steps = steps;
        this.distance = 40;
        this.timerMin = 300;
        this.timerMax = 800;
        this.moves = 0;
        this.cvlElement = cvlElement;
        this.onFinish = onFinish;
        this.corri();
    }

    corri() {
        const timeout = Math.trunc(
            Math.random() * (this.timerMax - this.timerMin) + this.timerMin
        );
        setTimeout(() => {
            this.cvlElement.style = `bottom:${
        this.moves * this.distance
      }px;transition: bottom ${timeout}ms linear;`;
            this.moves++;

            if (this.moves < this.steps) {
                this.corri();
            } else {
                this.onFinish();
            }
        }, timeout);
    }
}

//per ogni corsia creo un cavallo
document.querySelectorAll(".corsia").forEach((corsia) => {
    //elemento DOM con la scritta del vincitore
    const response = corsia.querySelector(".cavallo--vince");
    //elemento DOM del cavallo corrente
    const cvl = corsia.querySelector(".cavallo");

    //creo il cavallo
    // cavallo(cvl, () => {
    //   //se nessun cavallo è ancora arrivato questo cavallo è il vincitore
    //   if (!isOver) {
    //     isOver = true;
    //     response.style = "top:250px; transition: top 1000ms ease-out;opacity:1;";
    //   }
    // });

    const newHorse = new Cavallo(cvl, altezzaCampo / 40, () => {
        if (!isOver) {
            isOver = true;
            response.style = "top:250px; transition: top 1000ms ease-out;opacity:1;";
        }
    });
    console.log(newHorse);
});