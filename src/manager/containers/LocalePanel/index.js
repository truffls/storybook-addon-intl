import React from 'react';
import PropTypes from 'prop-types';
import {
    EVENT_SET_CONFIG_ID,
    EVENT_GET_LOCALE_ID,
    EVENT_SET_LOCALE_ID
} from '../../../shared';

import LocaleButton from '../../components/LocaleButton';

const panelStyle = {
    flexGrow: 0,
    display: 'flex',
    alignSelf: 'flex-start',
    flexWrap: 'wrap'
};

class LocalePanel extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            locales: [],
            activeLocale: null
        };

        this.setConfig = this.setConfig.bind(this);
        this.getLocale = this.getLocale.bind(this);
        this.handleClickLocaleButton = this.handleClickLocaleButton.bind(this);

        this.props.channel.on(EVENT_SET_CONFIG_ID, this.setConfig);
        this.props.channel.on(EVENT_GET_LOCALE_ID, this.getLocale);
    }

    setConfig (config) {
        const { locales, defaultLocale } = config;

        let activeLocale = this.state.activeLocale;
        // If active locale is not in the list of available locales use default locale as new active
        if (!activeLocale || !~locales.indexOf(activeLocale)) {
            activeLocale = defaultLocale;
        }

        this.setState({
            locales: locales,
            activeLocale: activeLocale
        });
    }

    getLocale () {
        this.props.channel.emit(EVENT_SET_LOCALE_ID, this.state.activeLocale);
    }

    handleClickLocaleButton (locale) {
        this.setState({
            activeLocale: locale
        });

        this.props.channel.emit(EVENT_SET_LOCALE_ID, locale);
    }

    componentWillUnmount () {
        this.props.channel.removeListener(EVENT_SET_CONFIG_ID, this.setConfig);
        this.props.channel.removeListener(EVENT_GET_LOCALE_ID, this.getLocale);
    }

    render () {
        const { active } = this.props;
        const { activeLocale, locales } = this.state;

        if (!active || !locales.length) {
            return null;
        }

        const items = locales.map((locale) => {
            return (
                <LocaleButton
                    key={locale}
                    locale={locale}
                    active={locale === activeLocale}
                    onClick={this.handleClickLocaleButton}
                />
            );
        });

        return (
            <div style={panelStyle}>
                {items}
            </div>
        );
    }
}

LocalePanel.propTypes = {
    active: PropTypes.bool.isRequired,
    channel: PropTypes.shape({
        emit: PropTypes.func.isRequired,
        on: PropTypes.func.isRequired,
        removeListener: PropTypes.func.isRequired
    }).isRequired
};

export default LocalePanel;
