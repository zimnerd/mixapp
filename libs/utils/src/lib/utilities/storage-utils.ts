export class StorageUtils {
    static saveItem(key: string, value: string): void {
      localStorage.setItem(key, value);
    }
  
    static getItem(key: string): string | null {
      return localStorage.getItem(key);
    }
  }
  