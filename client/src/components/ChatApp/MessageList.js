import React, {Component} from 'react';

    //When switched from the signup screen, this switched to the chat message field.
    class MessageList extends Component {
        render() {
            return(
                <ul className="message-list">
                    {this.props.messages.map((message, index) => (
                        <li key={index}>
                            <h4 className="message-sender">{message.senderId} {}</h4>
                            <p className="message-text">{message.text}</p>
                        </li>
                    ))}
                    {/* <li></li> */}
                </ul>
            )
        }
    }
    export default MessageList;
