import { PersonObject } from './person';

export interface PeopleObject {
    count: number;
    next: string | null;
    previous: string | null;
    results: PersonObject[];
}
