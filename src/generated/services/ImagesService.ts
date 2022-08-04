/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageDto } from '../models/ImageDto';
import type { LocalFileDto } from '../models/LocalFileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ImagesService {

    /**
     * @param formData 
     * @returns ImageDto 
     * @throws ApiError
     */
    public static addImage(
formData: LocalFileDto,
): CancelablePromise<ImageDto> {
        return __request(OpenAPI, {
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
    public static getImages(
cursor?: number,
take?: number,
): CancelablePromise<Array<ImageDto>> {
        return __request(OpenAPI, {
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
    public static getImage(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
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
    public static deleteImage(
id: number,
): CancelablePromise<ImageDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/images/{id}',
            path: {
                'id': id,
            },
        });
    }

}
