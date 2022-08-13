/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePostDto } from '../models/CreatePostDto';
import type { EditPostDto } from '../models/EditPostDto';
import type { GetPostWithUserDto } from '../models/GetPostWithUserDto';
import type { MinimalPostDto } from '../models/MinimalPostDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PostsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param cursor 
     * @param take 
     * @returns MinimalPostDto 
     * @throws ApiError
     */
    public getPosts(
cursor?: number,
take?: number,
): CancelablePromise<Array<MinimalPostDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/posts',
            query: {
                'cursor': cursor,
                'take': take,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns GetPostWithUserDto 
     * @throws ApiError
     */
    public createPost(
requestBody: CreatePostDto,
): CancelablePromise<GetPostWithUserDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/posts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param cursor 
     * @param take 
     * @returns MinimalPostDto 
     * @throws ApiError
     */
    public getMyPosts(
cursor?: number,
take?: number,
): CancelablePromise<Array<MinimalPostDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/posts/me',
            query: {
                'cursor': cursor,
                'take': take,
            },
        });
    }

    /**
     * @param id 
     * @returns GetPostWithUserDto 
     * @throws ApiError
     */
    public getPostById(
id: number,
): CancelablePromise<GetPostWithUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns GetPostWithUserDto 
     * @throws ApiError
     */
    public editPostById(
id: number,
requestBody: EditPostDto,
): CancelablePromise<GetPostWithUserDto> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns GetPostWithUserDto 
     * @throws ApiError
     */
    public deletePostById(
id: number,
): CancelablePromise<GetPostWithUserDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns GetPostWithUserDto 
     * @throws ApiError
     */
    public getPostBySlug(): CancelablePromise<GetPostWithUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/posts/slug/{slug}',
        });
    }

}
