export class ErrorUtils {
    static getErrorMessage(error: any): string {
        if (error && error.error && error.error.message) {
            return error.error.message;
        }
        if (error && error.message) {
            return error.message;
        }
        if (error && error.error && error.error.error) {
            return error.error.error;
        }
        if (error && error.error && error.error.error_description) {
            return error.error.error_description;
        }
        return 'An error occurred';
    }
}