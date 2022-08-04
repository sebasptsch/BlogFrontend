/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthDto } from '../models/AuthDto';
import type { IsAdminDto } from '../models/IsAdminDto';
import type { LoggedInDto } from '../models/LoggedInDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthenticationService {

    /**
     * @returns any 
     * @throws ApiError
     */
    public static logout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }

    /**
     * @param requestBody 
     * @returns UserDto 
     * @returns any Successfully created user
     * @throws ApiError
     */
    public static register(
requestBody: AuthDto,
): CancelablePromise<UserDto | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Credentials taken`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static signin(
requestBody: AuthDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signin',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns LoggedInDto 
     * @throws ApiError
     */
    public static loggedIn(): CancelablePromise<LoggedInDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/loggedIn',
        });
    }

    /**
     * @returns IsAdminDto 
     * @throws ApiError
     */
    public static isAdmin(): CancelablePromise<IsAdminDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/isAdmin',
        });
    }

    /**
     * @returns any 
     * @throws ApiError
     */
    public static githubSignIn(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/github',
        });
    }

    /**
     * @returns any 
     * @throws ApiError
     */
    public static githubSignInCallback(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/github/callback',
        });
    }

    /**
     * @returns any 
     * @throws ApiError
     */
    public static discordSignIn(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/discord',
        });
    }

    /**
     * @returns any 
     * @throws ApiError
     */
    public static discordSignInCallback(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/discord/callback',
        });
    }

}
