import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import {IMAGE_URL, IMAGE_SMALL, TABLET_MEDIUM_BREAKPOINT} from '../constants';
import trans from '../lang';

const SCROLL_SIZE_BREAK_POINT = 300;

class Card extends Component {
    constructor(props) {
        super(props);

        this.cardImage = createRef();
        this.animateCard = this.animateCard.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
    }

    animateCard() {
        const img = this.cardImage.current;
        const shoppingCard = document.querySelector('.b-shopping-card');
        const scrollSize = window.pageYOffset;
        const imgCoords = img.getBoundingClientRect();
        const shoppingCardCoords = shoppingCard.getBoundingClientRect();

        const imgClone = img.cloneNode();
        imgClone.style.position = 'fixed';
        imgClone.style.border = '1px solid #dedde1';
        imgClone.style.top = imgCoords.top + 'px';
        imgClone.style.left = imgCoords.left + 'px';
        imgClone.style.width = img.offsetWidth + 'px';
        imgClone.style.height = img.offsetHeight + 'px';
        imgClone.style.opacity = 1;
        imgClone.style.transition = 'all 0.4s ease';
        document.body.appendChild(imgClone);

        const transtionEnd = () => {
            imgClone.removeEventListener('transitionend', transtionEnd);
            document.body.removeChild(imgClone);
        }
        imgClone.addEventListener('transitionend', transtionEnd);

        const imgCloneTop = scrollSize > SCROLL_SIZE_BREAK_POINT
            ? -(SCROLL_SIZE_BREAK_POINT / 2)
            : shoppingCardCoords.top;

        setTimeout(() => {
            imgClone.style.top = imgCloneTop + 'px';
            imgClone.style.left = shoppingCardCoords.left + 'px';
            imgClone.style.width = '20px';
            imgClone.style.height = '20px';
            imgClone.style.opacity = 0;
        }, 20);
    }

    handleCardClick() {
        if (window.innerWidth >= TABLET_MEDIUM_BREAKPOINT) {
            this.props.onLoupe();
        }
    }

    render() {
        const {item, locale, onOrder} = this.props;

        return (
            <div
                className="b-card"
                onClick={this.handleCardClick}
            >
                <div className="card__id">{item.article}</div>
                <div className="card__name">{item.name[locale]}</div>
                <img
                    ref={this.cardImage}
                    className="card__thumbnail"
                    src={`${IMAGE_URL}/${IMAGE_SMALL}/${item.image}`}
                    alt={item.description[locale]}
                />
                <div className="card__shopping">
                    {
                        item.price !== '0' && (
                            <>
                                <div className="card__price">
                                    {`${item.price}$`}
                                </div>
                                <div
                                    className="card__order"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        this.animateCard();
                                        onOrder();
                                    }}
                                >
                                    {trans.SHOPPING_ORDER[locale]}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    locale: PropTypes.string,
    item: PropTypes.object,
    onLoupe: PropTypes.func,
    onOrder: PropTypes.func
}

export default Card;
