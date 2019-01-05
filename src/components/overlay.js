import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import OutIcon from './icons/out';
import {withRootFreezeConsumer} from '../contexts/root-freeze';

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
        const {isVisible, enableOverlayScroll, enableRootFreeze, rootFreezeActions} = this.props;

        if (prevProps.isVisible !== isVisible) {
            if (isVisible) {
                this.overlay.current.style.display = 'block';
                if (enableRootFreeze) {
                    rootFreezeActions.freezeRoot();
                }
                if (enableOverlayScroll) {
                    rootFreezeActions.hideRootScroll();
                }
                setTimeout(() => this.setState({overlayIsShown: true}), 20);
                return;
            }

            const transtionEnd = () => {
                this.overlay.current.style.display = 'none';
                rootFreezeActions.defrostRoot();
                this.overlay.current.removeEventListener('transitionend', transtionEnd);
            }
            this.overlay.current.addEventListener('transitionend', transtionEnd);
            rootFreezeActions.showRootScroll();
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
        const {onRequestClose, children, noExitIcon, light, rootWithHiddenScroll} = this.props;
        const {overlayIsShown} = this.state;

        return (
            <div
                ref={this.overlay}
                className={cn('b-overlay', {
                    '__visible': overlayIsShown,
                    '__light': light,
                    '__with-overflow-scroll': rootWithHiddenScroll
                })}
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
    enableOverlayScroll: PropTypes.bool,
    enableRootFreeze: PropTypes.bool,
    children: PropTypes.node,
    rootIsFrozen: PropTypes.bool.isRequired,
    rootWithHiddenScroll: PropTypes.bool.isRequired,
    rootFreezeActions: PropTypes.object.isRequired
};

export default withRootFreezeConsumer(Overlay);
