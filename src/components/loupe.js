import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Loupe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIsLoaded: false
        }

        this.handleImageLoad = this.handleImageLoad.bind(this);
    }

    handleImageLoad() {
        this.setState({imageIsLoaded: true});
    }

    render() {
        const {image, onRequestClose} = this.props;
        const {imageIsLoaded} = this.state;

        return (
            <div className="b-loupe" tabIndex="1">
                {!imageIsLoaded && <div className="loupe__loader" />}
                <img
                    className={cn('loupe__image', {'__full-size': imageIsLoaded})}
                    src={image}
                    alt=""
                    onLoad={this.handleImageLoad}
                    onError={onRequestClose}
                />
            </div>
        );
    }
}

Loupe.propTypes = {
    image: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired
}

export default Loupe;
