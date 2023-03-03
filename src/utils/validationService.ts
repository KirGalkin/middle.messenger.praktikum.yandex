export class ValidationService {
    static validateName(name: string): string | undefined {
        const pattern = /^[A-ZА-Я][a-zа-я]*$/u;

        if (!name?.trim()?.length) {
            return 'Field is required';
        } else if (!pattern.test(name)) {
            return 'Invalid name'
        }

        return undefined;
    }

    static validateEmail(email: string): string | undefined {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!pattern.test((email))) {
            return 'Invalid email address';
        }

        return undefined;
    }

    static validateMessage(value: string): string | undefined {
        return value.trim()?.length ? undefined : 'Field is required';
    }

    static validateLogin(value: string): string | undefined {
        const pattern = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/g;

        if (value.length < 3) {
            return 'Login must be more or equal than 3 characters';
        } else if (value.length > 20) {
            return 'Login must be less or equal than 20 characters';
        } else if (!pattern.test(value)) {
            return "Invalid login";
        }

        return undefined;
    }

    static validatePassword(value: string): string | undefined {
        const pattern = /^(?=.*[A-Z])(?=.*\d).+$/;

        if (value.length < 8) {
            return 'Password must be more or equal than 8 characters';
        } else if (value.length > 40) {
            return 'Password must be less or equal than 40 characters';
        } else if (!pattern.test(value)) {
            return 'Invalid password';
        }

        return undefined;
    }

    static validatePhone(value: string): string | undefined {
        const pattern = /^\+?\d+$/;

        if (value.length < 10) {
            return 'Phone must be more or equal than 10 characters';
        } else if (value.length > 15) {
            return 'Phone must be less or equal than 15 characters';
        } else if (!pattern.test(value)) {
            return 'Invalid phone';
        }

        return undefined;
    }
}
