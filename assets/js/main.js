function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const difficultySelect = document.getElementById('difficultySelect');
const playButton = document.getElementById('playButton');
const gridHTML = document.getElementById('gridHTML');

document.body.style.backgroundColor = 'aquamarine'

let randomBombs = [];
let safeNumbers = [];
let caselle = [];

let resultOverlay;

playButton.addEventListener('click', function () {

    gridHTML.innerHTML = '';
    randomBombs = [];
    safeNumbers = [];

    if (difficultySelect.value == 100) {

        document.body.style.backgroundColor = 'aquamarine';

    } else if (difficultySelect.value == 81) {

        document.body.style.backgroundColor = 'orange';

    } else if (difficultySelect.value == 49) {

        document.body.style.backgroundColor = 'coral';
    }

    while (randomBombs.length < 16) {

        let singleBomb = randomNum(1, difficultySelect.value);

        if (!randomBombs.includes(singleBomb)) {

            randomBombs.push(singleBomb);
        }
    }

    let box;

    for (let i = 1; i <= difficultySelect.value; i++) {

        box = document.createElement('div');
        box.classList.add('box', 'd-flex', 'justify-content-center', 'align-items-center', 'fw-bold');

        if (difficultySelect.value == 100) {

            box.classList.add('easy', 'fs-3');

        } else if (difficultySelect.value == 81) {

            box.classList.add('normal', 'fs-2');

        } else if (difficultySelect.value == 49) {

            box.classList.add('hard', 'fs-1');
        }

        box.addEventListener('click', function () {

            this.classList.toggle('active');
            console.log(this.innerText);


            if (randomBombs.includes(+this.innerText)) {

                console.log('hai preso una bomba');

                resultOverlay.classList.remove('d-none');
                resultOverlay.innerHTML = '<h1>Hai perso</h1>'

                for (let i = 0; i < caselle.length; i++) {

                    if (randomBombs.includes(+caselle[i].innerText)) {

                        caselle[i].style.backgroundColor = 'grey';
                        caselle[i].classList.add('active');
                        caselle[i].innerText = ''
                        caselle[i].innerHTML = '<img src="./assets/img/bomb.png" alt="bomba">'
                    }

                    this.style.backgroundColor = 'red';
                }


            } else {

                console.log('casella buona')
                this.style.backgroundColor = 'green'
                safeNumbers.push(+this.innerText);

                if (safeNumbers.length == (difficultySelect.value - randomBombs.length)) {

                    console.log('Hai evitato tutte le bombe');

                    resultOverlay.classList.remove('d-none');
                    resultOverlay.innerHTML = '<h1>Hai perso</h1>'
                }
            }

            console.log(safeNumbers);
            resultOverlay.innerHTML += `<span>Il tuo punteggio è di ${safeNumbers.length}</span>`
        })

        box.textContent = i;

        gridHTML.append(box);
    }

    caselle = gridHTML.querySelectorAll('div');

    resultOverlay = document.createElement('div');
    resultOverlay.classList.add('overlay', 'fw-bold', 'text-white', 'd-none');
    gridHTML.append(resultOverlay);

    console.log(randomBombs);
})