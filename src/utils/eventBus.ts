export class EventBus {
    //TODO Record?
    private readonly listeners: { [key: string]: Array<(...args: any[]) => void> }

    constructor() {
        this.listeners = {}
    }

    on(event: string, callback: (...args: any[]) => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: (...args: any[]) => void): void {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} is not registered`);
        }

        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback)
    }

    emit(event: string, ...args: any[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} is not registered`);
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        })
    }
}
