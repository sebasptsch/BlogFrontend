/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthDto } from '../models/AuthDto';
import type { IsAdminDto } from '../models/IsAdminDto';
import type { LoggedInDto } from '../models/LoggedInDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthenticationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns any 
     * @throws ApiError
     */
    public logout(): CancelablePromise<any> {
        return this.httpRequest.request({
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
    public register(
requestBody: AuthDto,
): CancelablePromise<UserDto | any> {
        return this.httpRequest.request({
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
    public signin(
requestBody: AuthDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
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
    public loggedIn(): CancelablePromise<LoggedInDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/loggedIn',
        });
    }

    /**
     * @returns IsAdminDto 
     * @throws ApiError
     */
    public isAdmin(): CancelablePromise<IsAdminDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/isAdmin',
        });
    }

    /**
     * @returns any 
     * @throws ApiError
     */
    public githubSignIn(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/github',
        });
    }

    /**
     * @returns any 
     * @throws ApiError
     */
    public githubSignInCallback(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/github/callback',
        });
    }

    /**
     * @returns any 
     * @throws ApiError
     */
    public discordSignIn(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/discord',
        });
    }

    /**
     * @returns any 
     * @throws ApiError
     */
    public discordSignInCallback(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/discord/callback',
        });
    }

}
