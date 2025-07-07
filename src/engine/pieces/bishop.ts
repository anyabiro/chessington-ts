import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const availableMoves: Square[] = [];
        const currentSquare: Square = board.findPiece(this);
        let nextRow, nextCol: number;

        if (currentSquare.row < currentSquare.col) {
            nextRow = 0;
            nextCol = currentSquare.col - currentSquare.row;
        } else {
            nextRow = currentSquare.row - currentSquare.col;
            nextCol = 0;
        }

        while (1) {
            let nextSquare: Square = new Square(nextRow, nextCol);
            if (!nextSquare.isInBounds()) {
                break;
            }

            if (board.isEmpty(nextSquare)) {
                availableMoves.push(nextSquare);
            }
            nextRow++;
            nextCol++;
        }

        nextRow = 0;
        nextCol = currentSquare.row + currentSquare.col;

        while (1) {
            let nextSquare: Square = new Square(nextRow, nextCol);
            if (!nextSquare.isInBounds()) {
                break;
            }

            if (board.isEmpty(nextSquare)) {
                availableMoves.push(nextSquare);
            }
            nextRow++;
            nextCol--;
        }

        return availableMoves;
    }
}
