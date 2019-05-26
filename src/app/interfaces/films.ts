import { Film } from './film';

export interface Films {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<Film>;
}
