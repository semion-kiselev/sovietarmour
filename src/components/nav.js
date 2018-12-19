import React from 'react';
import {Link} from 'gatsby';
import cn from 'classnames';
import trans from '../lang';
import {getNavData} from '../utils';

export default ({locale, pageName: currentPage}) => {
    const navData = getNavData(locale);

    return (
        <nav className="b-nav">
            <ul className="nav__list">
                {
                    navData.map(({path, pageName, label}) => (
                        <li key={pageName} className="nav__item">
                            <Link
                                className={cn('nav__link', {'__is-active': pageName === currentPage})}
                                to={path}
                            >
                                {label}
                            </Link>
                        </li>
                    ))
                }
                <li className="nav__item">
                    <span
                        className="nav__link __sidebar"
                    >
                        {trans.NAV_CATALOG[locale]}
                    </span>
                </li>
            </ul>
        </nav>
    );
}
