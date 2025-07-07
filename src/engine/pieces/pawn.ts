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
        const direction: number = this.player == player.WHITE ? 1 : -1;

        const rowMovements: number[] = [direction];
        const colMovements: number[] = [0];

        if (!this.hasMoved) {
            rowMovements.push(2 * direction);
            colMovements.push(0);
        }

        return this.computeMovesFromCoordinatesArrays(board, rowMovements, colMovements);
    }
}
