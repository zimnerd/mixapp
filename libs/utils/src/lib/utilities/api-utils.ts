import { ConfigService } from "../config";

export class ApiUtils {
        static getApiUrl(endpoint: string): string {
            return `${ConfigService.apiUrl}/${endpoint}`;
        }
    }