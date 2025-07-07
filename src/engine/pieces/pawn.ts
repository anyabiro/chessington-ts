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

        const upSquare: Square = new Square(currentSquare.row + 1, currentSquare.col);
        if (upSquare.row < 8 && board.getPiece(upSquare) === undefined) {
            availableMoves.push(upSquare);
        }

        const downSquare: Square = new Square(currentSquare.row - 1, currentSquare.col);
        if (downSquare.row >= 0 && board.getPiece(downSquare) === undefined) {
            availableMoves.push(downSquare);
        }

        return availableMoves;
    }
}
