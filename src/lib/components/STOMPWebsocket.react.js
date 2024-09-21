import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Client } from "@stomp/stompjs";

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class STOMPWebsocket extends Component {

    _init_client() {
        let {url, subscribe} = this.props;
        url = url? url : "ws://" + location.host + location.pathname + "ws";
        this._client = new Client({
            brokerURL: url,
        })

        this._client.activate();
        if (subscribe) {
            this._client.onConnect = () => {
                this._subscribtion = this._client.subscribe(subscribe,
                    message => {
                        this.props.setProps({message: message.body})
                    }
                );
            }
        }
    }

    componentDidMount() {
        this._init_client()
    }

    componentWillUnmount() {
        this._client.deactivate();
    }

    componentDidUpdate(prevProps) {
        const {subscribe, unsubscribe, send} = this.props;
        // console.log(subscribe, prevProps.subscribe, unsubscribe, prevProps.unsubscribe)
        // Send messages.
        if (unsubscribe && unsubscribe === prevProps.subscribe && subscribe !== prevProps.subscribe) {
            this._subscribtion.unsubscribe();
            this._subscribtion = this._client.subscribe(subscribe,
                message => {
                    this.props.setProps({message: message.body})
                }
            );
            this.props.setProps({unsubscribe: null})
        } else if (subscribe && subscribe !== prevProps.subscribe) {
            this._subscribtion = this._client.subscribe(subscribe,
                message => {
                    this.props.setProps({message: message.body})
                }
            );
        } else if (subscribe && unsubscribe && unsubscribe === subscribe) {
            this._subscribtion.unsubscribe();
            this.props.setProps({subscribe: null, unsubscribe: null})
        } else if (send && send !== prevProps.send) {
            this._client.publish({destination: send.destination, body: send.body});
        }
    }

    render() {
        return (null);
    }
}

STOMPWebsocket.defaultProps = {};

STOMPWebsocket.propTypes = {
    
    /**
     * The url to connect to
     */
    url: PropTypes.string,

    /**
     * The topic to subscribe to.
     */
    subscribe: PropTypes.string,

    /**
     * The topic to unsubscribe from.
     */
    unsubscribe: PropTypes.string,

    /**
     * The message from subscription.
     */
    message: PropTypes.string,

    /**
     * The message to send
     */
    send: PropTypes.object,

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
