import React, {Fragment} from 'react';
import {IMAGE_URL, IMAGE_BIG, IMAGE_SMALL} from '../constants';
import trans from '../lang';

export default ({item, locale}) => (
    <div className="b-card" data-big-img={`${IMAGE_URL}/${IMAGE_BIG}/${item.image}`}>
        <div className="card__id">{item.article}</div>
        <div className="card__name">{item.name[locale]}</div>
        <img className="card__thumbnail"
            src={`${IMAGE_URL}/${IMAGE_SMALL}/${item.image}`}
            alt={item.description[locale]}
        />
        <div className="card__shopping">
            {
                item.price && (
                    <Fragment>
                        <div className="card__price">
                            {`${item.price}$`}
                        </div>
                        <div className="card__order">
                            {trans.SHOPPING_ORDER[locale]}
                        </div>
                    </Fragment>
                )
            }
	    </div>
    </div>
);
