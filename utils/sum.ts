export function sum<T>(arr: T[], mapper: (x: T) => number = (x: T) => Number(x)): number {
  return arr.map(mapper).reduce((total, n) => total + n, 0);
}
