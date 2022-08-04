/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RootService {

    /**
     * @returns any 
     * @throws ApiError
     */
    public static getSitemap(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sitemap.xml',
        });
    }

}
