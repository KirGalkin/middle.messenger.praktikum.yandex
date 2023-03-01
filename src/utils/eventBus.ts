export class EventBus {
    private readonly listeners: Record<string, Array<(...args: unknown[]) => void>> = {}

    constructor() {
        this.listeners = {}
    }

    on(event: string, callback: (...args: unknown[]) => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: (...args: unknown[]) => void): void {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} is not registered`);
        }

        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback)
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} is not registered`);
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        })
    }
}
