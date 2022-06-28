/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GetPostWithUserDto = {
    status: GetPostWithUserDto.status;
    id: number;
    slug: string;
    title: string;
    summary: string;
    content: any;
    userId: number;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    bannerSrc?: string;
    user: {
id?: number;
name?: string;
};
};

export namespace GetPostWithUserDto {

    export enum status {
        DRAFT = 'DRAFT',
        PUBLISHED = 'PUBLISHED',
    }


}
