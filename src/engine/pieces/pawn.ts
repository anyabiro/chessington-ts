import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import player from "../player";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const availableMoves: Square[] = [];
        const currentSquare: Square = board.findPiece(this);

        const direction: number = this.player == player.WHITE ? 1 : -1;

        const nextSquare: Square = new Square(currentSquare.row + direction, currentSquare.col);
        if (nextSquare.isInBounds() && board.getPiece(nextSquare) === undefined) {
            availableMoves.push(nextSquare);
        }

        if (!this.hasMoved) {
            const farSquare: Square = new Square(currentSquare.row + 2 * direction, currentSquare.col);
            if (farSquare.isInBounds() && board.getPiece(farSquare) === undefined) {
                availableMoves.push(farSquare);
            }
        }

        return availableMoves;
    }
}
