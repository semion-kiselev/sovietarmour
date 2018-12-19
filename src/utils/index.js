import trans from '../lang';
import {pageNames} from '../constants';

export const getNavData = (locale) => ([
    {
        path: `/${locale}`,
        label: trans.NAV_HOME[locale],
        pageName: pageNames.HOME
    },
    {
        path: `/${locale}/where-to-buy`,
        label: trans.NAV_WHERE_TO_BUY[locale],
        pageName: pageNames.WHERE_TO_BUY
    },
    {
        path: `/${locale}/about-us`,
        label: trans.NAV_ABOUT_US[locale],
        pageName: pageNames.ABOUT_US
    }
]);

export const setCookie = (name, value, options) => {
    options = options || {};

    let expires = options.expires;

    if (typeof expires === 'number' && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 60 * 1000);
        expires = options.expires = d;
    }

    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;

    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];

        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}
