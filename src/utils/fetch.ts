enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

interface Options {
    method: Method,
    data?: any,
    timeout?: number
}

export class Fetch {

    get = (url: string, options: Options) => {
        const strData = this.queryStringify(options.data);
        return this.request(`${url}${strData}`, {...options, method: Method.GET}, options.timeout);
    };

    put = (url: string, options: Options) => {
        return this.request(url, {...options, method: Method.PUT}, options.timeout);
    };

    post = (url: string, options: Options) => {
        return this.request(url, {...options, method: Method.POST}, options.timeout);
    };

    delete = (url: string, options: Options) => {
        return this.request(url, {...options, method: Method.DELETE}, options.timeout);
    };

    request(url: string, options: Options = {method: Method.GET}, timeout = 5000) {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.timeout = timeout;

            xhr.onload = function () {
                resolve(xhr);
            }

            xhr.onerror = reject;
            xhr.onabort = reject;
            xhr.ontimeout = function () {
                throw new Error('Timeout!')
            };

            if (method === Method.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
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
