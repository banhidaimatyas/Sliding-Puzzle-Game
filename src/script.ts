import { NumberTile } from './number.js';

export class Game {
    private size: number;
    private numbers: NumberTile[] = [];

    constructor(size: number) {
        this.size = size;
        this.createGrid();
        this.randomizeNumbers();
    }

    private createGrid(): void {
        const grid = document.createElement('div');
        grid.className = 'grid-container';
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;

        const fragment = document.createDocumentFragment();

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const cell = document.createElement('div');
                cell.className = 'grid-item';
                cell.id = `cell-${x}-${y}`;
                const cellSize = `${90 / this.size}vh`;
                cell.style.height = cellSize;
                cell.style.lineHeight = cellSize;
                cell.style.fontSize = `${(90 / this.size) * 0.8}vh`;

                fragment.appendChild(cell);
            }
        }

        grid.appendChild(fragment);
        document.body.appendChild(grid);
    }

    private randomizeNumbers(): void {
        const maxTiles = this.size * this.size - 1;
        const placed: Set<string> = new Set();

        for (let value = 1; value <= maxTiles; value++) {
            let x = this.randomCoord();
            let y = this.randomCoord();
            while (!this.isFree(x, y) || placed.has(`${x},${y}`)) {
                x = this.randomCoord();
                y = this.randomCoord();
            }

            const tile = new NumberTile(value, this.numbers, this.size);
            tile.setPosition(x, y);
            this.numbers.push(tile);
            placed.add(`${x},${y}`);
        }
    }

    private isFree(x: number, y: number): boolean {
        const index = y * this.size + x;
        const cell = document.getElementById(`cell-${x}-${y}`);
        return cell ? cell.innerHTML.trim() === '' : false;
    }

    private randomCoord(): number {
        return Math.floor(Math.random() * this.size);
    }
}

const game = new Game(10);