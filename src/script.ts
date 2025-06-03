import { NumberTile } from './number.js';

const size: number = 10;
const numbers: NumberTile[] = [];
createGrid(size)
randomizeNumbers()

function createGrid(size: number): void {
    const grid = document.createElement('div');
    grid.className = 'grid-container';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    const fragment = document.createDocumentFragment();

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-item';
            cell.id = `cell-${x}-${y}`;
            const cellSize = `${90 / size}vh`;
            cell.style.height = cellSize;
            cell.style.lineHeight = cellSize;
            cell.style.fontSize = `${(90 / size) * 0.8}vh`;

            fragment.appendChild(cell);
        }
    }

    grid.appendChild(fragment);
    document.body.appendChild(grid);
}
function randomizeNumbers(): void {
    const maxTiles = size * size - 1;
    const placed: Set<string> = new Set();
    for (let value = 1; value <= maxTiles; value++) {
        let x = randomcord();
        let y = randomcord();
        while (!isfree(x, y) || placed.has(`${x},${y}`)) {
            x = randomcord();
            y = randomcord();
        }
        const tile = new NumberTile(value, numbers, size);
        tile.setPosition(x, y);
        numbers.push(tile);
        placed.add(`${x},${y}`);
    }
}
function isfree(x: number, y: number): boolean {
    const index = y * size + x;
    const cell = document.querySelector(`.grid-item:nth-child(${index + 1})`);
    return cell ? cell.innerHTML.trim() === '' : false;
}
function randomcord():number{
    return Math.floor(Math.random()*size)
}
