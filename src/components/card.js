import React from 'react';
import PropTypes from 'prop-types';
import {IMAGE_URL, IMAGE_SMALL} from '../constants';
import trans from '../lang';

const Card = ({item, locale, onLoupe}) => (
    <div
        className="b-card"
        onClick={onLoupe}
    >
        <div className="card__id">{item.article}</div>
        <div className="card__name">{item.name[locale]}</div>
        <img
            className="card__thumbnail"
            src={`${IMAGE_URL}/${IMAGE_SMALL}/${item.image}`}
            alt={item.description[locale]}
        />
        <div className="card__shopping">
            {
                item.price && (
                    <>
                        <div className="card__price">
                            {`${item.price}$`}
                        </div>
                        <div className="card__order">
                            {trans.SHOPPING_ORDER[locale]}
                        </div>
                    </>
                )
            }
	    </div>
    </div>
);

Card.propTypes = {
    locale: PropTypes.string,
    item: PropTypes.object,
    onLoupe: PropTypes.func
}

export default Card;
