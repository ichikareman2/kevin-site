import { fromPredicate, map, Option } from "fp-ts/lib/Option";
export type GameOfLifeSettings = {
    /** number of cells adjacent for alive cell to survive */
    surviveAdjacent: number[];
    /** number of cells adjacent for dead cell to be alive */
    reproAdjacent: number[];
}
export type Cells = boolean[][];
export const getCellOption = fromPredicate((b: Cells) => Array.isArray(b) && b.length > 0)
export const processGameOfLife = (cells: Cells) => {

}
// const getAdjacentCells = (coordinates: [number, number]) => (cells: Cells) => (settings: GameOfLifeSettings): number => {
//     map<Cells, boolean>(x => x.)(getCellOption(cells))
// }
const getMaxX = (cells: Cells) => getCellOption(cells)