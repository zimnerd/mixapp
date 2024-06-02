export class DateUtils {
    static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    static isDate(value: any): boolean {
        return value instanceof Date && !isNaN(value.valueOf());
    }

    static isDateValid(date: Date): boolean {
        return date instanceof Date && !isNaN(date.getTime());
    }

    static isLeapYear(year: number): boolean {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    static isValidDate(date: string): boolean {
        return !isNaN(Date.parse(date));
    }

    static isValidDateString(date: string): boolean {
        return !isNaN(Date.parse(date));
    }

    static parseDate(date: string): Date {
        return new Date(date);
    }

    static parseDateString(date: string): Date {
        return new Date(date);
    }

    static parseISODate(date: string): Date {
        return new Date(date);
    }

    static parseISODateString(date: string): Date {
        return new Date(date);
    }

    static toTimeZone(date: Date, timeZone: string): Date {
        const newDate = new Date(date.toLocaleString('en-US', { timeZone }));
        return newDate;
    }
}
  