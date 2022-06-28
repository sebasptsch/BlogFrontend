/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserDto = {
    role: UserDto.role;
    id: number;
    name?: string;
    createdAt: string;
    avatarSrc?: string;
    updatedAt: string;
};

export namespace UserDto {

    export enum role {
        ADMIN = 'ADMIN',
        USER = 'USER',
    }


}
