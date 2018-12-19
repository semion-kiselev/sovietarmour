import React, {PureComponent, createRef} from 'react';
import cn from 'classnames';
import OutIcon from './icons/out';

export default class Modal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            modalIsShown: false
        }

        this.modal = createRef();
    }

    componentDidUpdate(prevProps) {
        const {isVisible} = this.props;

        if (prevProps.isVisible !== isVisible) {
            if (isVisible) {
                this.modal.current.style.display = 'block';
                requestAnimationFrame(() => this.setState({modalIsShown: true}));
                return;
            }

            const transtionEnd = () => {
                this.modal.current.style.display = 'none';
                this.modal.current.removeEventListener('transitionend', transtionEnd);
            }
            this.modal.current.addEventListener('transitionend', transtionEnd);
            requestAnimationFrame(() => this.setState({modalIsShown: false}));
        }
    }

    render() {
        const {onRequestClose, children} = this.props;
        const {modalIsShown} = this.state;

        return (
            <div
                ref={this.modal}
                className={cn('b-modal', {__visible: modalIsShown})}
            >
                <div className="modal__close" onClick={onRequestClose}>
                    <OutIcon />
                </div>
                {children}
            </div>
        );
    }
}
