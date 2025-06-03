import { NumberTile } from './number.js';
const size = 10;
const numbers = [];
createGrid(size);
randomizeNumbers();
function createGrid(size) {
    const grid = document.createElement('div');
    grid.className = 'grid-container';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-item';
        const cellSize = `${90 / size}vh`;
        cell.style.height = cellSize;
        cell.style.lineHeight = cellSize;
        cell.style.fontSize = `${(90 / size) * 0.8}vh`;
        fragment.appendChild(cell);
    }
    grid.appendChild(fragment);
    document.body.appendChild(grid);
}
function randomizeNumbers() {
    const maxTiles = size * size - 1;
    const placed = new Set();
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
function isfree(x, y) {
    const index = y * size + x;
    const cell = document.querySelector(`.grid-item:nth-child(${index + 1})`);
    return cell ? cell.innerHTML.trim() === '' : false;
}
function randomcord() {
    return Math.floor(Math.random() * size);
}
