export interface ApiResponseObject {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<any>;
}