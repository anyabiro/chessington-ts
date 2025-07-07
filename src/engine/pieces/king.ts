import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const rowMovements: number[] = [1, 1, 1, 0, 0, -1, -1, -1];
        const colMovements: number[] = [-1, 0, 1, -1, 1, -1, 0, 1];

        return this.computeMovesFromCoordinatesArrays(board, rowMovements, colMovements);
    }
}
