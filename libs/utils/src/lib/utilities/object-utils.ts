export class ObjectUtils {
  static isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
}