import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import { EVENT_GET_LOCALE_ID, EVENT_SET_LOCALE_ID } from '../../../shared';
import { omit } from '../../../utils';

class WithIntl extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            locale: props.intlConfig.defaultLocale || null
        };

        this.setLocale = this.setLocale.bind(this);

        const { channel } = this.props;

        // Listen for change of locale
        channel.on(EVENT_SET_LOCALE_ID, this.setLocale);

        // Request the current locale
        channel.emit(EVENT_GET_LOCALE_ID);
    }

    setLocale (locale) {
        this.setState({
            locale: locale
        });
    }

    componentWillUnmount () {
        this.props.channel.removeListener(EVENT_SET_LOCALE_ID, this.setLocale);
    }

    render () {
        // If the component is not initialized we don't want to render anything
        if (!this.state.locale) {
            return null;
        }

        const {
            children,
            getMessages,

            intlConfig
        } = this.props;

        const { locale } = this.state;
        const messages = getMessages(locale);

        return (
            <IntlProvider {...intlConfig} key={locale} locale={locale} messages={messages}>
                {children}
            </IntlProvider>
        );
    }
}

WithIntl.propTypes = {
    intlConfig: PropTypes.shape(omit(IntlProvider.propTypes, ['children'])).isRequired,
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    getMessages: PropTypes.func.isRequired,
    channel: PropTypes.shape({
        emit: PropTypes.func.isRequired,
        on: PropTypes.func.isRequired,
        removeListener: PropTypes.func.isRequired
    }).isRequired
};

export default WithIntl;
