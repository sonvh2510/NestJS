import { Request } from 'express';

export interface RequestCustomize extends Request {
    userLogged: {
        username: string;
        email: string;
        role: number;
    };
    theme: {
        sidebar_class: string;
        header_class: string;
    };
}
