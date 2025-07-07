import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        const availableMoves: Square[] = [];
        const currentSquare = board.findPiece(this);

        for (let coord: number = 0; coord < 8; coord++) {
            let verticalMove: Square = new Square(coord, currentSquare.col);
            if (board.isEmpty(verticalMove)) {
                availableMoves.push(verticalMove);
            }

            let horizontalMove: Square = new Square(currentSquare.row, coord);
            if (board.isEmpty(horizontalMove)) {
                availableMoves.push(horizontalMove);
            }
        }
        return availableMoves;
    }
}
