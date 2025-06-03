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
}