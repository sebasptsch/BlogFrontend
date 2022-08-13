/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EditUserDto } from '../models/EditUserDto';
import type { MinimalUserDto } from '../models/MinimalUserDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UsersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns UserDto 
     * @throws ApiError
     */
    public getMe(): CancelablePromise<UserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/me',
        });
    }

    /**
     * @returns UserDto 
     * @throws ApiError
     */
    public deleteUser(): CancelablePromise<UserDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/me',
        });
    }

    /**
     * @param id 
     * @returns MinimalUserDto 
     * @throws ApiError
     */
    public getUser(
id: number,
): CancelablePromise<MinimalUserDto> {
        return this.httpRequest.request({
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
    public editUser(
requestBody: EditUserDto,
): CancelablePromise<UserDto> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
