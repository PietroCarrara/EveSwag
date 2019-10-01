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
    public static async Request (
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

class ESIResponse {
    
    public readonly data: object;
    
    public constructor(res: AxiosResponse, req: AxiosRequestConfig) {
        this.data = res.data;
    }
}