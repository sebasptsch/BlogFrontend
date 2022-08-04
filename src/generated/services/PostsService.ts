/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePostDto } from '../models/CreatePostDto';
import type { EditPostDto } from '../models/EditPostDto';
import type { GetPostWithUserDto } from '../models/GetPostWithUserDto';
import type { MinimalPostDto } from '../models/MinimalPostDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostsService {

    /**
     * @param cursor 
     * @param take 
     * @returns MinimalPostDto 
     * @throws ApiError
     */
    public static getPosts(
cursor?: number,
take?: number,
): CancelablePromise<Array<MinimalPostDto>> {
        return __request(OpenAPI, {
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
    public static createPost(
requestBody: CreatePostDto,
): CancelablePromise<GetPostWithUserDto> {
        return __request(OpenAPI, {
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
    public static getMyPosts(
cursor?: number,
take?: number,
): CancelablePromise<Array<MinimalPostDto>> {
        return __request(OpenAPI, {
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
    public static getPostById(
id: number,
): CancelablePromise<GetPostWithUserDto> {
        return __request(OpenAPI, {
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
    public static editPostById(
id: number,
requestBody: EditPostDto,
): CancelablePromise<GetPostWithUserDto> {
        return __request(OpenAPI, {
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
    public static deletePostById(
id: number,
): CancelablePromise<GetPostWithUserDto> {
        return __request(OpenAPI, {
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
    public static getPostBySlug(): CancelablePromise<GetPostWithUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts/slug/{slug}',
        });
    }

}
