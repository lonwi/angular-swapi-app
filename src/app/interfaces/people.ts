import { Person } from './person';

export interface People {
    count: number;
    next: string | null;
    previous: string | null;
    results: Person[];
}
