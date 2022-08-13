/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageDto } from '../models/ImageDto';
import type { LocalFileDto } from '../models/LocalFileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ImagesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param formData 
     * @returns ImageDto 
     * @throws ApiError
     */
    public addImage(
formData: LocalFileDto,
): CancelablePromise<ImageDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/images',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * @param cursor 
     * @param take 
     * @returns ImageDto 
     * @throws ApiError
     */
    public getImages(
cursor?: number,
take?: number,
): CancelablePromise<Array<ImageDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/images',
            query: {
                'cursor': cursor,
                'take': take,
            },
        });
    }

    /**
     * @param id 
     * @returns any Returns the image file itself
     * @throws ApiError
     */
    public getImage(
id: number,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/images/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns ImageDto 
     * @throws ApiError
     */
    public deleteImage(
id: number,
): CancelablePromise<ImageDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/images/{id}',
            path: {
                'id': id,
            },
        });
    }

}
