export class ValidationService {
    static validateName(name: string): string | undefined {
        const pattern = /^[A-ZА-Я][a-zа-я]*$/u;

        if (pattern.test(name) && name.trim().length) {
            return undefined;
        } else {
            return 'Invalid name';
        }
    }

    static validateEmail(email: string): string | undefined {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (pattern.test(email)) {
            return undefined;
        } else {
            return 'Invalid email address';
        }
    }

    static validateMessage(value: string): string | undefined {
        return value.trim()?.length ? undefined : 'Can not be empty';
    }

    static validateLogin(value: string): string | undefined {
        const pattern = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/g;
        if (pattern.test(value) && value.length > 2 && value.length <= 20) {
            return undefined
        } else {
            return "Invalid login";
        }
    }

    static validatePassword(value: string): string | undefined {
        const pattern = /^(?=.*[A-Z])(?=.*\d).+$/;
        if (pattern.test(value) && value.length > 8 && value.length <= 40) {
            return undefined;
        } else {
            return 'Invalid password';
        }
    }

    static validatePhone(value: string): string | undefined {
        const pattern = /^\+?\d+$/;
        if (pattern.test(value) && value.length > 9 && value.length <= 15) {
            return undefined;
        } else {
            return 'Invalid password';
        }
    }
}
