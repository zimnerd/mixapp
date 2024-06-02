export class ArrayUtils {
    static removeDuplicates<T>(array: T[]): T[] {
        return [...new Set(array)];
    }

    static removeFalsy<T>(array: T[]): T[] {
        return array.filter(Boolean);
    }

    static sortByDate<T>(array: T[], key: keyof T, asc: boolean = true): T[] {
        return array.sort((a, b) => {
          const dateA = new Date(a[key] as any).getTime();
          const dateB = new Date(b[key] as any).getTime();
          
          if (isNaN(dateA) || isNaN(dateB)) {
            throw new Error(`Invalid date value for key: ${key.toString()}`);
          }
          
          return asc ? dateA - dateB : dateB - dateA;
        });
      }
    
    }