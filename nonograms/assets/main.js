import Puzzle from "./Puzzle.js";
import {getEasyPuzzle, getEasyPuzzleList} from "./puzzles/smoll.js";
import {getNormalPuzzle, getNormalPuzzleList} from "./puzzles/normal.js";
import getHeader from "./header.js";
import getMenu from "./menu.js";
import getModalWindow from "./modalW.js";
import getButton from "./button.js";

class Game {
    constructor() {
        this.easyPuzzleList = getEasyPuzzleList();
        this.NormalPuzzleList = getNormalPuzzleList();
        this.puzzle = new Puzzle(getEasyPuzzle(0, this.easyPuzzleList.length - 1));
        this.solveCeil = 0;

        this.mainTemplate = '<main class="main"></main>';
        this.namePuzzleElem = `<div class="name-puzzle">${this.puzzle.puzzleName}</div>`;
        this.puzzleElem = '<div class="list-wrapper"><ul class="list"></ul></div>';
    }

    createTemplate() {
        let menu = getMenu(
            'menu',
            ['Restart', ['New 5x5', ...this.easyPuzzleList], ['New 10x10', ...this.NormalPuzzleList]],
            'menu-item',
        )
        document.body.append(getHeader(menu))
        document.body.insertAdjacentHTML('beforeend', this.mainTemplate)
        document.querySelector('.main').insertAdjacentHTML('beforeend', this.namePuzzleElem)
        document.querySelector('.main').insertAdjacentHTML('beforeend', this.puzzleElem)
        
        this.openGreatModal = getModalWindow(
            'greatModal',
            'Congratulations!',
            'Great! You have solved the nonogram!',
            getButton('greatBtn', 'Okey', (e) => e.target.offsetParent.classList.remove('open')),
            'body'
        )
    }

    restartHandle(solveCeil) {
        const ceilArr = document.querySelectorAll('.ceil');
        ceilArr.forEach((v) => {
          if (v.classList.contains('fill')) v.classList.remove('fill');
        })
        console.log(solveCeil)
        return this.solveCeil = 0;
        
    }

    leftClickHandle(e) {
        if (!e.target.classList.contains('ceil')) return;

        let puzzleInds = e.target.id;
        let targetArr = this.puzzle.puzzle[+puzzleInds[0]];
        let targetCeil = targetArr[+puzzleInds[1]];

        e.target.classList.toggle('fill')

        if(targetCeil && e.target.classList.contains('fill')) this.solveCeil++;
        if(targetCeil && !e.target.classList.contains('fill')) this.solveCeil--;
        if(!targetCeil && e.target.classList.contains('fill')) this.solveCeil--;
        if(!targetCeil && !e.target.classList.contains('fill')) this.solveCeil++;
        if(!targetCeil && !e.target.classList.contains('fill')) console.log('ff')
        if(this.solveCeil === this.puzzle.trueCeil) {

            this.openGreatModal();
        }
        console.log(this.solveCeil)
    }

    createClueElems(clueArr, classClue) {
        let parElem = document.querySelector('.list-wrapper')

        let ulElem = document.createElement('ul')
        ulElem.classList.add(`clue-list${clueArr.length}`,`${classClue}`)
        clueArr.forEach((c) => {
            let elem = document.createElement('li')
            elem.classList.add('clue')

            c.forEach((el) => elem.insertAdjacentHTML('beforeend', `<span>${el}</span>`))
            ulElem.append(elem) 
        })
        parElem.append(ulElem)
    }
    
    render() {
        this.puzzle.getLineClue()
        this.puzzle.getColumnClue()
        this.createTemplate()
        this.createClueElems(this.puzzle.lineClue, 'lineClue')
        this.createClueElems(this.puzzle.columClue, 'columnClue')

        document.querySelector('.restart').addEventListener('click', () => this.restartHandle(this.solveCeil))

        let ulElem = document.querySelector('.list');
        ulElem.addEventListener('click', (e) => this.leftClickHandle(e))

        game.puzzle.puzzle.forEach((c, i) => {
            for (let n = 0; n < c.length; n++) {
                let elem = document.createElement('li');
                elem.classList.add('ceil');
                if (c.length === 10 && n === 5) elem.classList.add('divid-l')
                if (c.length === 10 && i === 5) elem.classList.add('divid-u')
                elem.id = `${i}${n}`;

                ulElem.append(elem)
                ulElem.classList.add(`l${c.length}`)
            }
        })
    }
}

let game = new Game();
game.render()
let ulElem = document.querySelector('.list');
//ulElem.addEventListener('click', (e) => game.leftClickHandle(e))
//document.querySelector('.restart').addEventListener('click', game.restartHandle)
console.log(game.puzzle)