import { NumberTile } from './number.ts';

const size: number = 10;
const numbers: NumberTile[] = [];
//setupgrid(size);
//placenumbers();

function isfree(x: number, y: number): boolean {
    const index = y * size + x;
    const cell = document.querySelector(`.grid-item:nth-child(${index + 1})`);
    return cell !== null && cell.textContent === '';
}


function randomcord():number{
    return Math.floor(Math.random()*size)
}
