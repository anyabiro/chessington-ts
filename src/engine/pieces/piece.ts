import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from "../gameSettings";

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

        return this.getMovesForADiagonal(board, currentSquare.row, currentSquare.col, 1, 1);
    }

    public getBackwardDiagonalMoves(board: Board) {
        const currentSquare: Square = board.findPiece(this);

        return this.getMovesForADiagonal(board, currentSquare.row, currentSquare.col, 1, -1);
    }

    public getMovesForADiagonal(board: Board, pieceRow: number, pieceCol: number, xDirection: number, yDirection: number): Square[] {
        const diagonalMoves: Square[] = [];

        let nextRow: number = pieceRow + xDirection;
        let nextCol: number = pieceCol + yDirection;
        let nextSquare = new Square(nextRow, nextCol);

        // moving from the piece towards the upper corner
        while (nextSquare.isInBounds()) {
            if (board.isEmpty(nextSquare)) {
                diagonalMoves.push(nextSquare);
            } else {
                break;
            }
            nextRow += xDirection;
            nextCol += yDirection;
            nextSquare = new Square(nextRow, nextCol);
        }

        // moving from the piece towards the lower corner
        nextRow = pieceRow - xDirection;
        nextCol = pieceCol - yDirection;
        nextSquare = new Square(nextRow, nextCol);
        while (nextSquare.isInBounds()) {
            if (board.isEmpty(nextSquare)) {
                diagonalMoves.push(nextSquare);
            } else {
                break;
            }
            nextRow -= xDirection;
            nextCol -= yDirection;
            nextSquare = new Square(nextRow, nextCol);
        }

        return diagonalMoves;
    }

    public getLateralMoves(board: Board): Square[] {
        const lateralMoves: Square[] = [];
        const currentSquare = board.findPiece(this);

        for (let coord: number = currentSquare.row - 1; coord >= 0; coord--) {
            const verticalMove: Square = new Square(coord, currentSquare.col);
            if (board.isEmpty(verticalMove)) {
                lateralMoves.push(verticalMove);
            } else {
                break;
            }
        }

        for (let coord: number = currentSquare.row + 1; coord < GameSettings.BOARD_SIZE; coord++) {
            const verticalMove: Square = new Square(coord, currentSquare.col);
            if (board.isEmpty(verticalMove)) {
                lateralMoves.push(verticalMove);
            } else {
                break;
            }
        }

        for (let coord: number = currentSquare.col - 1; coord >= 0; coord--) {
            const horizontalMove: Square = new Square(currentSquare.row, coord);
            if (board.isEmpty(horizontalMove)) {
                lateralMoves.push(horizontalMove);
            } else {
                break;
            }
        }

        for (let coord: number = currentSquare.col + 1; coord < GameSettings.BOARD_SIZE; coord++) {
            const horizontalMove: Square = new Square(currentSquare.row, coord);
            if (board.isEmpty(horizontalMove)) {
                lateralMoves.push(horizontalMove);
            } else {
                break;
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
