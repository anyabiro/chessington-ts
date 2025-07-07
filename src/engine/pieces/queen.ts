import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const diagonalMoves: Square[] = board.getForwardDiagonalMoves(this).concat(board.getBackwardDiagonalMoves(this));
        const lateralMoves: Square[] = board.getLateralMoves(this);
        return diagonalMoves.concat(lateralMoves);
    }
}
