export {};

declare global {
    export interface Window {
        goToPage: (page: string) => void;
    }
}
