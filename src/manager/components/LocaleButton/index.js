import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

class LocaleButton extends React.Component {
    constructor () {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (event) {
        event.preventDefault();

        this.props.onClick(this.props.locale);
    }

    render () {
        return (
            <button
                type="button"
                style={style(this.props)}
                onClick={this.handleClick}
            >
                {this.props.locale}
            </button>
        );
    };
}

LocaleButton.propTypes = {
    locale: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default LocaleButton;
