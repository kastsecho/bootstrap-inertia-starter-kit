import forbiddenSvg from '../../svg/403.svg';
import notFoundSvg from '../../svg/404.svg';
import errorSvg from '../../svg/500.svg';
import serviceUnavailableSvg from '../../svg/503.svg';

export const statusCodes = {
    401: {
        title: 'Unauthorized',
        message: 'Sorry, you are not authorized to access this page.',
        image: forbiddenSvg,
    },
    403: {
        title: 'Forbidden',
        message: 'Sorry, you are forbidden from accessing this page.',
        image: forbiddenSvg,
    },
    404: {
        title: 'Not Found',
        message: 'Sorry, the page you are looking for could not be found.',
        image: notFoundSvg,
    },
    419: {
        title: 'Page Expired',
        message:
            'Sorry, your session has expired. Please refresh and try again.',
        image: forbiddenSvg,
    },
    429: {
        title: 'Too Many Requests',
        message: 'Sorry, you are making too many requests to our servers.',
        image: forbiddenSvg,
    },
    500: {
        title: 'Error',
        message: 'Whoops, something went wrong on our servers.',
        image: errorSvg,
    },
    503: {
        title: 'Service Unavailable',
        message:
            'Sorry, we are doing some maintenance. Please check back soon.',
        image: serviceUnavailableSvg,
    },
} as const;
