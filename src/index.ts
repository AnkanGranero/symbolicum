const gridUL = document.querySelector(".grid") as HTMLUListElement;
const sizeSlider = document.getElementById("grid-size") as HTMLInputElement;
const sizeLabel = document.getElementById("size-label") as HTMLParagraphElement;
const patternSlider = document.getElementById("grid-pattern") as HTMLInputElement;
const patternLabel = document.getElementById("pattern-label") as HTMLParagraphElement;

const patterns = ["diamond", "square"];
let selectedPatternIndex = 0;

let gridSize = 9;
let margin = 0;
const numberOfSquares = gridSize * gridSize;
const mid = Math.floor(gridSize / 2);
let grid: Cell[] = [];
let color = "black";

type Cell = {
    x: number;
    y: number;
    color?: string
}


function createGrid() {
    grid.length = 0;
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            grid.push({ x, y })
        }
    }
}

function paintDiamondShape(): void {
    const mid = Math.floor(gridSize / 2);
    grid.forEach(cell => {
        const dist = Math.abs(mid - cell.y);
        const left = dist;
        const right = gridSize - 1 - dist;
        if (cell.x == left || cell.x === right) {
            cell.color = color;
        }
    });
}

function paintSquareShape(): void {

    if (margin < 0 || margin >= gridSize) {
        margin = 0;
    }

    const min = margin;
    const max = gridSize - margin - 1;



    grid.forEach(cell => {
        const { x, y } = cell;

        const isTopOrBottom = (y === min || y === max) && (x >= min && x <= max);
        const isLeftOrRigth = (x === min || x === max) && (y >= min && y <= max);
        if (isTopOrBottom || isLeftOrRigth) {
            cell.color = color;
        }
    })


}

function paintPattern() {


    switch (selectedPatternIndex) {

        case 0: {

            paintDiamondShape()
            break;
        }
        case 1: {
            paintSquareShape()
            break;
        }
    }
}

function renderGrid() {
    gridUL.innerHTML = "";
    paintPattern();

    grid.forEach((cell) => {
        const li = document.createElement("li");
        li.dataset.x = String(cell.x);
        li.dataset.y = String(cell.y);
        li.classList.add('cell');
        li.style.gridColumn = String(cell.x + 1);
        li.style.gridRow = String(cell.y + 1);
        if (cell.color) li.style.backgroundColor = cell.color;

        gridUL.appendChild(li);
    })


}

sizeSlider.addEventListener("input", (event: Event) => {
    event.preventDefault();
    const target = event.target;

    if (target && target.value) {

        gridSize = target.value
        sizeLabel.innerText = `${target.value} x ${target.value}`
        createGrid();
        renderGrid();
    }

})

patternSlider.addEventListener("input", (event: Event) => {
    event.preventDefault();
    const target = event.target;

    if (target && target.value) {

        selectedPatternIndex = Number(target.value)
        patternLabel.innerText = `${patterns[selectedPatternIndex]}`
        createGrid();
        renderGrid();
    }

})

createGrid();
renderGrid();

