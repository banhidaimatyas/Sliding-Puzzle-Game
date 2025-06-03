export class NumberTile {
    value: number;
    numbers: NumberTile[];
    x: number | undefined;
    y: number | undefined;
    size: number;

    constructor(value: number, numbers: NumberTile[], size: number) {
        if (value < 1 || value >= size * size) {
            throw new Error(`A value értékének 1 és ${size * size - 1} között kell lennie.`);
        }

        this.value = value;
        this.numbers = numbers;
        this.size = size;
        this.x = undefined;
        this.y = undefined;

    }

    setPosition(x: number, y: number): void {
        // Ha a számnak már volt korábbi pozíciója, kitörli onnan
        if (this.x !== undefined && this.y !== undefined) {
            const oldId = `cell-${this.x}-${this.y}`;
            const oldCell = document.getElementById(oldId);
            if (oldCell) oldCell.innerHTML = '';
        }

        // Létrehoz egy új div elemet a számhoz
        const div = this.createElement();
        const newId = `cell-${x}-${y}`;
        const newCell = document.getElementById(newId);
        if (newCell) newCell.appendChild(div);

        this.x = x;
        this.y = y;
    }

    createElement(): HTMLDivElement {
        const div = document.createElement('div'); // 1. Létrehoz egy új div elemet a számhoz
        // 2. Beállítja a megfelelő osztályt és szövegét
        div.className = 'number';
        div.dataset.number = this.value.toString();
        div.innerText = this.value.toString();
        // 3. Hozzáad egy kattintás eseménykezelőt
        div.addEventListener('click', () => {
            const emptyPosition = this.emptyPosition;
            if (emptyPosition !== null) {
                this.setPosition(emptyPosition.x, emptyPosition.y);
            }
        });
        return div;
    }

    get emptyPosition(): { x: number; y: number } | null {
        if (this.x === undefined || this.y === undefined) return null;

        const left = { dx: -1, dy: 0 }
        const right = { dx: 1, dy: 0 }
        const up = { dx: 0, dy: -1 }
        const down = { dx: 0, dy: 1 }
        const directions = [
            left, right, up, down
        ];

        for (const { dx, dy } of directions) {
            const newX = this.x + dx;
            const newY = this.y + dy;

            if (
                newX >= 0 &&
                newX < this.size &&
                newY >= 0 &&
                newY < this.size  &&
                this.checkIsEmpty(newX, newY)
            ) {
                return { x: newX, y: newY };
            }
        }

        return null;
    }

    checkIsEmpty(x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
        return false;
    }

    for (let i = 0; i < this.numbers.length; i++) {
        const tile = this.numbers[i];
        if (tile.x === x && tile.y === y) {
            return false;
        }
    }

    return true;
}
}