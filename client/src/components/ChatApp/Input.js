import React, {Component} from 'react';
// import MaterialIcon from 'material-icons-react';

    //Sets the message field to blank then...
    class Input extends Component {
        constructor(props) {
            super(props);
            this.state = {
                message: ""
            }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChange(e) {
            this.setState({
                message: e.target.value
            })
        }

        handleSubmit(e) {
            e.preventDefault();
            this.props.onSubmit(this.state.message);
            this.setState({
                message: ''
            })
        }

        //Submits the message to the created message field.
        render() {
            return (
                <form onSubmit={this.handleSubmit} className="input-field">
                    <input className="message-input" type="text" onChange={this.handleChange} value={this.state.message}/>
                    <input className="message-submit" type="submit" value="Send" />
                    {/* <MaterialIcon icon="sendtwotone" type="submit" color='#9CCC65' /> */}
                </form>
            )
        }
    }
    export default Input;