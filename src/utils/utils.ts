import {Block} from "./block";

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

type PlainObject<T = unknown> = {
    [k in string]: T;
};

export interface BlockConstructable<P extends Record<string, any> = any> {
    new(props: P): Block<P>;
}

export function render(query: string, block: Block) {
    const root = document.querySelector(query);

    if (root === null) {
        throw new Error(`root not found by selector "${query}"`);
    }

    root.innerHTML = '';

    root.append(block.element!);

    return root;
}

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: any, rhs: any) {
    if(!isArrayOrObject(lhs) && !isArrayOrObject(rhs)) {
        return lhs === rhs;
    }

    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];

        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            // Здесь value и rightValue может быть только массивом или объектом
            // и TypeScript это понимает с помощью Type Guard
            if (isEqual(value as PlainObject, rightValue as PlainObject)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

