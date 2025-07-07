import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        return this.getForwardDiagonal(board).concat(this.getBackwardDiagonal(board));
    }

    public getForwardDiagonal(board: Board) {
        const currentSquare: Square = board.findPiece(this);
        let initialRow, initialCol: number;

        if (currentSquare.row < currentSquare.col) {
            initialRow = 0;
            initialCol = currentSquare.col - currentSquare.row;
        } else {
            initialRow = currentSquare.row - currentSquare.col;
            initialCol = 0;
        }

        return this.getDiagonalMoves(board, initialRow, initialCol, 1, 1);
    }

    public getBackwardDiagonal(board: Board) {
        const currentSquare: Square = board.findPiece(this);
        let initialRow: number = 0;
        let initialCol: number = currentSquare.row + currentSquare.col;

        return this.getDiagonalMoves(board, initialRow, initialCol, 1, -1);
    }

    getDiagonalMoves(board: Board, initialRow: number, initialCol: number, xDirection: number, yDirection: number): Square[] {
        const diagonalMoves: Square[] = [];
        let nextSquare = new Square(initialRow, initialCol);

        while (nextSquare.isInBounds()) {
            if (board.isEmpty(nextSquare)) {
                diagonalMoves.push(nextSquare);
            }
            initialRow += xDirection;
            initialCol += yDirection;
            nextSquare = new Square(initialRow, initialCol);
        }

        return diagonalMoves;
    }
}
