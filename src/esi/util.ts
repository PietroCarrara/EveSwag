import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl = 'https://esi.evetech.net/latest';

export class Util {

    /**
     * Make a request to the EVE API
     * 
     * @param subUrl The route to query in the ESI (without the version)
     * @param data Object to send as data on the request
     * @param method Http verb used
     */
    public static async request (
        subUrl: string,
        data = {},
        method: "GET"|"POST"|"DELETE"|"PUT" = 'GET',
        headers = {}
    ): Promise<ESIResponse> {

        var req = {
            method: method,
            data: data,
            url: baseUrl + subUrl,
            headers: headers,
        };

        return axios.request(req)
        .then(res => new ESIResponse(res, req));
    }
}

export class PaginatedCollection<T> {
    public readonly data: T[];
    public readonly nextPage: () => Promise<PaginatedCollection<T>>;

    /**
     * @param data The data in the collection
     * @param nextPage A function that returns the next page in the collection
     */
    public constructor(data: T[], nextPage: () => Promise<PaginatedCollection<T>>) {
        this.data = data;
        this.nextPage = nextPage;
    }

    public isEmpty(): boolean {
        return this.data.length > 0;
    }
}

class ESIResponse {
    
    public readonly data: object;
    
    public constructor(res: AxiosResponse, req: AxiosRequestConfig) {
        this.data = res.data;
    }
}