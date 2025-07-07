import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const rowMovements: number[] = [1, 1, -1, -1, 2, 2, -2, -2];
        const colMovements: number[] = [2, -2, 2, -2, 1, -1, 1, -1];

        return this.computeMovesFromCoordinatesArrays(board, rowMovements, colMovements);
    }
}
