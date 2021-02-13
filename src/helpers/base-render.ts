import { SIDEBAR } from 'src/configs/sidebar';
import { RequestCustomize } from 'src/interfaces/request-custom';

export const BaseRender = (
    req: RequestCustomize,
    { pageTitle },
    data?: any,
) => {
    return {
        user: req.userLogged,
        theme: req.theme,
        page: {
            url: req.route.path,
            title: pageTitle,
            sidebar: SIDEBAR,
        },
        data: {
            ...data,
        },
    };
};
