import React from 'react';

export default ({pageTitle, pageSubtitle}) => (
    <div className="b-title">
        <div className="title__inner">
            <h1 className="title__main">
                {pageTitle}
		    </h1>
            <h2 className="title__secondary">
                {pageSubtitle}
		    </h2>
        </div>
    </div>
);
