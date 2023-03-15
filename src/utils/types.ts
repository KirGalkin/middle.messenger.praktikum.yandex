import {Block} from "./block";

export type PlainObject<T = unknown> = {
    [k in string]: T;
}

export type Indexed<T = any> = {
    [key in string]: T;
}

export interface BlockConstructable<P extends Record<string, any> = any> {
    new(props: P): Block<P>;
}
