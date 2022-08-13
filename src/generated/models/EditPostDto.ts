/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EditPostDto = {
    status?: EditPostDto.status;
    slug?: string;
    title?: string;
    summary?: string;
    content?: any;
    publishedAt?: string;
};

export namespace EditPostDto {

    export enum status {
        DRAFT = 'DRAFT',
        PUBLISHED = 'PUBLISHED',
    }


}
