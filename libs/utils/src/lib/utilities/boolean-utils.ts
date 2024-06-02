export class BooleanUtils {
  static isTruthy(value: any): boolean {
    return value === true || value === 'true' || value === 1 || value === '1';
  }

  static isFalsy(value: any): boolean {
    return value === false || value === 'false' || value === 0 || value === '0';
  }
}