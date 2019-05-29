import { FilmObject } from './film';

export interface FilmsObject {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<FilmObject>;
}
