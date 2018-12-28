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

export const getOrderedItemsQty = (orderedItems) =>
    orderedItems.reduce((acc, item) => {
        return acc += item.qty;
    }, 0);

export const omit = (fieldToOmit, obj) => {
    const updatedObj = {};
    const fields = Object.keys(obj);

    if (!fields.length) {
        return obj;
    }

    const filteredFields = fields.filter(field => field !== fieldToOmit);

    filteredFields.forEach(field => updatedObj[field] = obj[field]);

    return updatedObj;
}

const encode = (data) => Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");

export const request = (method, url, headers, body, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = xhr.onerror = () => {
        if (xhr.status === 200) {
            onSuccess(xhr.responseText);
        } else {
            onError(xhr.status);
        }
    };

    xhr.open(method, url, true);

    if (headers) {
        const headersKeys = Object.keys(headers);
        if (headersKeys.length) {
            headersKeys.forEach(key => xhr.setRequestHeader(key, headers[key]));
        }
    }

    const dataToSend = body ? encode(body) : null;
    xhr.send(dataToSend);
};
