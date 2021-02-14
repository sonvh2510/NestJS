import { Request } from 'express';

export interface RequestCustomize extends Request {
    userLogged: User;
    theme: {
        sidebar_class: string;
        header_class: string;
    };
}

export interface Post {
    id: number;
    title: string;
    url: string;
    sub_title: string;
    description: string;
    author: number;
    created_date: string;
    last_edited: string;
}

export interface User {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    created_date?: string;
    role?: number;
    is_enabled?: boolean;
}
