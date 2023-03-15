enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

interface Options {
    method?: Method,
    data?: any,
    timeout?: number
}

export class Fetch {
    private readonly baseUrl = 'https://ya-praktikum.tech/api/v2';
    constructor(private readonly endpoint: string) {
    }

    get<T>(url: string, options: Options): Promise<T> {
        const strData = this.queryStringify(options.data);
        return this.request<T>(`${this.baseUrl}${this.endpoint}${url}${strData ?? ""}`, {...options, method: Method.GET}, options.timeout);
    };

    put<T = void>(url: string, options: Options): Promise<T> {
        return this.request<T>(`${this.baseUrl}${this.endpoint}${url}`, {...options, method: Method.PUT}, options.timeout);
    };

    post<T = void>(url: string, options: Options): Promise<T> {
        return this.request<T>(`${this.baseUrl}${this.endpoint}${url}`, {...options, method: Method.POST}, options.timeout);
    };

    delete<T = void>(url: string, options: Options): Promise<T> {
        return this.request<T>(`${this.baseUrl}${this.endpoint}${url}`, {...options, method: Method.DELETE}, options.timeout);
    };

    request<T>(url: string, options: Options = {method: Method.GET}, timeout = 5000): Promise<T> {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method!, url);

            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xhr.withCredentials = true;

            xhr.timeout = timeout;

            xhr.onload = function () {
                resolve(xhr.response);
            }

            xhr.onerror = reject;
            xhr.onabort = reject;
            xhr.ontimeout = function () {
                throw new Error('Timeout!')
            };

            if (method === Method.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        })
    }

    private queryStringify(data?: any): string | undefined {
        if (!data) {
            return ;
        }
        let result = '';
        Object.keys(data).forEach(key => {
            const value = `${key}=${data[key].toString()}`
            result += result.length ? `&${value}` : `?${value}` ;
        })

        return result
    }
}
