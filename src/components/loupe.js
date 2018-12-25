import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Loupe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIsLoaded: false,
            scaleImage: false
        }

        this.handleImageLoad = this.handleImageLoad.bind(this);
    }

    handleImageLoad() {
        this.setState({
            imageIsLoaded: true,
            scaleImage: true
        })
    }

    render() {
        const {image, onRequestClose} = this.props;
        const {imageIsLoaded, scaleImage} = this.state;

        return (
            <div className="b-loupe" tabIndex="1">
                {!imageIsLoaded && <div className="loupe__loader" />}
                <img
                    className={cn('loupe__image', {'__full-size': scaleImage})}
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
