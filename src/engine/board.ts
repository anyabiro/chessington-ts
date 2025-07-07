import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];

    constructor(currentPlayer: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    public isEmpty(square: Square): boolean {
        return this.getPiece(square) === undefined;
    }

    public getForwardDiagonalMoves(piece: Piece) {
        const currentSquare: Square = this.findPiece(piece);
        let initialRow, initialCol: number;

        if (currentSquare.row < currentSquare.col) {
            initialRow = 0;
            initialCol = currentSquare.col - currentSquare.row;
        } else {
            initialRow = currentSquare.row - currentSquare.col;
            initialCol = 0;
        }

        return this.getMovesForADiagonal(initialRow, initialCol, 1, 1);
    }

    public getBackwardDiagonalMoves(piece: Piece) {
        const currentSquare: Square = this.findPiece(piece);
        const initialRow: number = 0;
        const initialCol: number = currentSquare.row + currentSquare.col;

        return this.getMovesForADiagonal(initialRow, initialCol, 1, -1);
    }

    public getMovesForADiagonal(initialRow: number, initialCol: number, xDirection: number, yDirection: number): Square[] {
        const diagonalMoves: Square[] = [];
        let nextSquare = new Square(initialRow, initialCol);

        while (nextSquare.isInBounds()) {
            if (this.isEmpty(nextSquare)) {
                diagonalMoves.push(nextSquare);
            }
            initialRow += xDirection;
            initialCol += yDirection;
            nextSquare = new Square(initialRow, initialCol);
        }

        return diagonalMoves;
    }

    public getLateralMoves(piece: Piece): Square[] {
        const lateralMoves: Square[] = [];
        const currentSquare = this.findPiece(piece);

        for (let coord: number = 0; coord < 8; coord++) {
            const verticalMove: Square = new Square(coord, currentSquare.col);
            if (this.isEmpty(verticalMove)) {
                lateralMoves.push(verticalMove);
            }

            const horizontalMove: Square = new Square(currentSquare.row, coord);
            if (this.isEmpty(horizontalMove)) {
                lateralMoves.push(horizontalMove);
            }
        }

        return lateralMoves;
    }

    public getMovesFromArray(piece: Piece, rowMovements: number[], colMovements: number[]): Square[] {
        const availableMoves: Square[] = [];
        const currentSquare: Square = this.findPiece(piece);

        for (let i = 0; i < rowMovements.length; i++) {
            const nextSquare: Square = new Square(currentSquare.row + rowMovements[i], currentSquare.col + colMovements[i]);
            if (nextSquare.isInBounds() && this.isEmpty(nextSquare)) {
                availableMoves.push(nextSquare);
            }
        }

        return availableMoves;
    }
}
