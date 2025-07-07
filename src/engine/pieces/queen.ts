import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const diagonalMoves: Square[] = this.getForwardDiagonalMoves(board).concat(this.getBackwardDiagonalMoves(board));
        const lateralMoves: Square[] = this.getLateralMoves(board);
        return diagonalMoves.concat(lateralMoves);
    }
}
