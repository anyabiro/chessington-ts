import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;
    public hasMoved: boolean;

    public constructor(player: Player) {
        this.player = player;
        this.hasMoved = false;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.hasMoved = true;
    }

    public getForwardDiagonalMoves(board: Board) {
        const currentSquare: Square = board.findPiece(this);
        let initialRow, initialCol: number;

        if (currentSquare.row < currentSquare.col) {
            initialRow = 0;
            initialCol = currentSquare.col - currentSquare.row;
        } else {
            initialRow = currentSquare.row - currentSquare.col;
            initialCol = 0;
        }

        return this.getMovesForADiagonal(board, initialRow, initialCol, 1, 1);
    }

    public getBackwardDiagonalMoves(board: Board) {
        const currentSquare: Square = board.findPiece(this);
        const sum: number = currentSquare.row + currentSquare.col;
        const initialRow: number = sum < 8 ? 0 : sum - 7;
        const initialCol: number = sum - initialRow;

        return this.getMovesForADiagonal(board, initialRow, initialCol, 1, -1);
    }

    public getMovesForADiagonal(board: Board, initialRow: number, initialCol: number, xDirection: number, yDirection: number): Square[] {
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

    public getLateralMoves(board: Board): Square[] {
        const lateralMoves: Square[] = [];
        const currentSquare = board.findPiece(this);

        for (let coord: number = 0; coord < 8; coord++) {
            const verticalMove: Square = new Square(coord, currentSquare.col);
            if (board.isEmpty(verticalMove)) {
                lateralMoves.push(verticalMove);
            }

            const horizontalMove: Square = new Square(currentSquare.row, coord);
            if (board.isEmpty(horizontalMove)) {
                lateralMoves.push(horizontalMove);
            }
        }

        return lateralMoves;
    }

    public computeMovesFromCoordinatesArrays(board: Board, rowMovements: number[], colMovements: number[]): Square[] {
        const availableMoves: Square[] = [];
        const currentSquare: Square = board.findPiece(this);

        for (let i = 0; i < rowMovements.length; i++) {
            const nextSquare: Square = new Square(currentSquare.row + rowMovements[i], currentSquare.col + colMovements[i]);
            if (nextSquare.isInBounds() && board.isEmpty(nextSquare)) {
                availableMoves.push(nextSquare);
            }
        }

        return availableMoves;
    }
}
