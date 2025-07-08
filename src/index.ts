const gridUL = document.querySelector(".grid") as HTMLUListElement;
const slider = document.getElementById("grid-size") as HTMLInputElement;
const sizeLabel = document.getElementById("size-label") as HTMLParagraphElement;

let size = 9;
const numberOfSquares = size * size;
const mid = Math.floor(size / 2);
let grid: Cell[] = [];
let color = "black";

type Cell = {
    x: number;
    y: number;
    color?: string
}


function createGrid() {
    grid.length = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            grid.push({ x, y })
        }
    }
}

function paintDiamondShape(): void {
    const mid = Math.floor(size / 2);
    grid.forEach(cell => {
        const dist = Math.abs(mid - cell.y);
        const left = dist;
        const right = size - 1 - dist;
        if (cell.x == left || cell.x === right) {
            cell.color = color;
        }
    });
}

function renderGrid() {
    gridUL.innerHTML = "";

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

slider.addEventListener("input", (event: Event) => {
    event.preventDefault();
    const target = event.target;

    if (target && target.value) {

        size = target.value
        sizeLabel.innerText = `${target.value} x ${target.value}` 
        createGrid();
        paintDiamondShape();
        renderGrid();
    }

})

createGrid();
paintDiamondShape();
renderGrid();

