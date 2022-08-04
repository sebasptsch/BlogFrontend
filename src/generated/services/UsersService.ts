/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EditUserDto } from '../models/EditUserDto';
import type { MinimalUserDto } from '../models/MinimalUserDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns UserDto 
     * @throws ApiError
     */
    public static getMe(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }

    /**
     * @returns UserDto 
     * @throws ApiError
     */
    public static deleteUser(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/me',
        });
    }

    /**
     * @param id 
     * @returns MinimalUserDto 
     * @throws ApiError
     */
    public static getUser(
id: number,
): CancelablePromise<MinimalUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns UserDto 
     * @throws ApiError
     */
    public static editUser(
requestBody: EditUserDto,
): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
