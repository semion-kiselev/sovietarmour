import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Title extends PureComponent {
    render() {
        const {pageTitle, pageSubtitle} = this.props;

        return (
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
    }
}

Title.propTypes = {
    pageTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    pageSubtitle: PropTypes.string.isRequired
};

export default Title;
