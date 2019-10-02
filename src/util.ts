import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PageOutOfBoundsError } from './errors';

const baseUrl = 'https://esi.evetech.net/latest';

export class Util {

    /**
     * Make a request to the EVE API
     * 
     * @param subUrl The route to query in the ESI (without the version)
     * @param data Object to send as data on the request
     * @param method Http verb used
     */
    public static async request(
        subUrl: string,
        data = {},
        method: "GET" | "POST" | "DELETE" | "PUT" = 'GET',
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
    /**
     * The response data
     */
    public readonly data: T[];

    /**
     * Get the next page.
     * Returns null when there is no next page
     */
    public readonly getPage: (page: number) => Promise<PaginatedCollection<T>>;

    /**
     * The current (one-indexed) page
     */
    public readonly page: number;

    /**
     * The last (one-indexed) page
     */
    public readonly maxPages: number;

    /**
     * @param data The data in the collection
     * @param getPage A function that returns the nth page in the collection
     */
    public constructor(data: T[], page: number, maxPages: number, getPage: (page: number) => Promise<PaginatedCollection<T>>) {
        this.data = data;
        this.getPage = getPage;

        this.page = page;
        this.maxPages = maxPages;
    }

    public async nextPage() {
        if (this.page >= this.maxPages) {
            throw new PageOutOfBoundsError();
        }
        
        return this.getPage(this.page + 1);
    }

    public async prevPage() {
        if (this.page <= 1) {
            throw new PageOutOfBoundsError();
        }
        
        return this.getPage(this.page - 1);
    }

    /**
     * Get all the pages in the collection (including this)
     */
    public async getAll(): Promise<PaginatedCollection<T>[]> {
        // Start with the current page
        var res: [Promise<PaginatedCollection<T>>|PaginatedCollection<T>] = [this];

        // Get all the pages except for the current
        for (let i = 1; i < this.page; i++) {
            res.push(this.getPage(i));
        }
        for (let i = this.page + 1; i <= this.maxPages; i++) {
            res.push(this.getPage(i));
        }

        return Promise.all(res);
    }
}

class ESIResponse {

    public readonly data: object;
    public readonly maximumPages: number | undefined;

    public constructor(res: AxiosResponse, req: AxiosRequestConfig) {
        this.data = res.data;
        this.maximumPages = res.headers['x-pages'];
    }
}