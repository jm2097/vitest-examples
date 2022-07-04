function sum(...nums: number[]) {
  return nums.reduce((accumulator, current) => accumulator + current, 0);
}

function squareList(values: number[]): number[] {
  return values.map((value) => Math.pow(value, 2));
}

export const mathFunctions = { sum, squareList };
