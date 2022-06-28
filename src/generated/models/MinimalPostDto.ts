/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MinimalPostDto = {
    status: MinimalPostDto.status;
    id: number;
    slug: string;
    title: string;
    summary: string;
    userId: number;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    bannerSrc?: string;
};

export namespace MinimalPostDto {

    export enum status {
        DRAFT = 'DRAFT',
        PUBLISHED = 'PUBLISHED',
    }


}
