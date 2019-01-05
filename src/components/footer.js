import React, {PureComponent} from 'react';

class Footer extends PureComponent {
    render() {
        return (
            <div className="b-footer">
                <div className="footer__inner">
                    {new Date().getFullYear()} &copy; Soviet Armour
	            </div>
            </div>
        );
    }
}

export default Footer;
