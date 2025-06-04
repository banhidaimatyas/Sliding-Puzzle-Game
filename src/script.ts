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

class GameUI {
    private input: HTMLInputElement | null = null;
    private startButton: HTMLButtonElement | null = null;

    public init(): void {
        this.createNumberInput();
        this.createStartButton();
    }

    private createNumberInput(): void {
        this.input = document.createElement("input");
        this.input.type = "number";
        this.input.placeholder = "Írj be egy számot";
        this.input.id = "number-input";
        document.body.appendChild(this.input);
    }

    private createStartButton(): void {
        this.startButton = document.createElement("button");
        this.startButton.textContent = "Start";
        this.startButton.id = "start-button";
        this.startButton.addEventListener("click", () => this.handleStart());
        document.body.appendChild(this.startButton);
    }

    private handleStart(): void {
        if (!this.input || !this.startButton) return;

        const value = this.input.value;
        const parsed = parseInt(value, 10);

        if (isNaN(parsed) || parsed <= 0) {
            console.log("Kérlek írj be egy pozitív egész számot.");
            return;
        }

        console.log("Beírt szám:", parsed);

        this.input.remove();
        this.startButton.remove();

        new Game(parsed);
    }
}

function main(): void {
    const ui = new GameUI();
    ui.init();
}

main();