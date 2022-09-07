import memoize from "./memoize";

// import { fromPredicate, map, Option } from "fp-ts/lib/Option";
export type GameOfLifeSettings = {
    /** number of cells adjacent for alive cell to survive */
    surviveAdjacent: number[];
    /** number of cells adjacent for dead cell to be alive */
    reproAdjacent: number[];
    loop: boolean;
};
export type Cells = boolean[][];
// export const getCellOption = fromPredicate((b: Cells) => Array.isArray(b) && b.length > 0)
export const processGameOfLife = (
settings: GameOfLifeSettings,
cells: Cells
) => {
const newCells: boolean[][] = cells.map((x) => x.slice());
cells.forEach((xcells, xi) =>
    xcells.forEach((ycell, yi) => {
    newCells[xi][yi] = cells[xi][yi]
        ? checkSurvive(
            settings.surviveAdjacent,
            getAdjacentValues(xi, yi, cells)
        )
        : checkRepro(settings.reproAdjacent, getAdjacentValues(xi, yi, cells));
    })
);
return newCells;
};

const getMaxX = (cells: Cells) => cells.length;
const getMaxY = (cells: Cells) => cells[0].length;
// const getMaxXOpt = map(getMaxX)
// const getMaxYOpt = map(getMaxY)
const getAdjacentIndexes = memoize((x: number, y: number, maxX: number, maxY: number) => {
    let startX = x - 1;
    let startY = y - 1;
    startX = startX < 0 ? maxX + startX : startX;
    startY = startY < 0 ? maxY + startY : startY;
    let adjacentIndexes: [number, number][] = [];
    for (let xi = 0; xi < 3; xi++) {
        for (let yi = 0; yi < 3; yi++) {
        const currentX = (startX + xi) % maxX;
        const currentY = (startY + yi) % maxY;
        if (currentX === x && currentY === y) {
            continue;
        }
            adjacentIndexes.push([currentX, currentY]);
        }
    }
    return adjacentIndexes;
})
const getAdjacentValues = (x: number, y: number, cells: Cells) => {
    const maxX = getMaxX(cells);
    const maxY = getMaxY(cells);
    let indexes = getAdjacentIndexes(x, y, maxX, maxY)
    return indexes?.map(x => cells[x[0]][x[1]])
};
const getAliveAdjacent = (adjacentValues: boolean[]) => adjacentValues.reduce(
    (acc, curr) => acc + (curr ? 1 : 0),
    0
);
const checkSurvive = (surviveCounts: number[], adjacentValues: boolean[]) => {
    return surviveCounts.some((x) => x === getAliveAdjacent(adjacentValues));
};
const checkRepro = (reproCounts: number[], adjacentValues: boolean[]) => {
    return reproCounts.some((x) => x === getAliveAdjacent(adjacentValues));
};

export const createCells = (x: number, y: number) => {
    let arr: Cells = [];
    for (let i = 0; i < x; i++) {
      arr.push([]);
      for (let j = 0; j < y; j++) {
        arr[i].push(Math.random() * 1 > 0.5);
      }
    }
    return arr;
};