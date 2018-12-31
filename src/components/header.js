import React from 'react';
import Logo from './logo';
import Utils from './utils';
import Nav from './nav';

export default ({locale, pageName, currentSectionSlug, currentSubsectionSlug}) => (
    <div className="b-header">
        <div className="header__logo">
            <Logo locale={locale} />
	    </div>
        <div className="header__utils">
            <Utils
                locale={locale}
                pageName={pageName}
                currentSectionSlug={currentSectionSlug}
                currentSubsectionSlug={currentSubsectionSlug}
            />
        </div>
        <div className="header__nav">
            <Nav
                locale={locale}
                pageName={pageName}
                currentSectionSlug={currentSectionSlug}
                currentSubsectionSlug={currentSubsectionSlug}
            />
        </div>
    </div>
);
