import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import OutIcon from './icons/out';

class Overlay extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            overlayIsShown: false
        }

        this.overlay = createRef();
        this.handleChildrenContainerClick = this.handleChildrenContainerClick.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        const {isVisible} = this.props;

        if (prevProps.isVisible !== isVisible) {
            if (isVisible) {
                this.overlay.current.style.display = 'block';
                requestAnimationFrame(() => this.setState({overlayIsShown: true}));
                return;
            }

            const transtionEnd = () => {
                this.overlay.current.style.display = 'none';
                this.overlay.current.removeEventListener('transitionend', transtionEnd);
            }
            this.overlay.current.addEventListener('transitionend', transtionEnd);
            requestAnimationFrame(() => this.setState({overlayIsShown: false}));
        }
    }

    handleChildrenContainerClick(e) {
        e.stopPropagation();
    }

    handleOverlayClick() {
        const {onRequestClose, closeOnOverlayClick} = this.props;

        if (closeOnOverlayClick) {
            onRequestClose();
        }
    }

    render() {
        const {onRequestClose, children, noExitIcon, light} = this.props;
        const {overlayIsShown} = this.state;

        return (
            <div
                ref={this.overlay}
                className={cn('b-overlay', {'__visible': overlayIsShown, '__light': light})}
                onClick={this.handleOverlayClick}
            >
                {
                    !noExitIcon && (
                        <div className="overlay__close" onClick={onRequestClose}>
                            <OutIcon />
                        </div>
                    )
                }
                <div onClick={this.handleChildrenContainerClick}>
                    {children}
                </div>
            </div>
        );
    }
}

Overlay.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    noExitIcon: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    light: PropTypes.bool,
    children: PropTypes.node
};

export default Overlay;
