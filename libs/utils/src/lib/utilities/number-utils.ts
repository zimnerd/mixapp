export class NumberUtils {
  static isNumber(value: any): boolean {
    return !isNaN(value);
  }
    static sortNumbersAsc(a: number, b: number): number {
        return a - b;
    }

    static sortNumbersDesc(a: number, b: number): number {
        return b - a;
    }
}