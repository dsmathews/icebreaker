import React, {Component} from 'react';

    class  Signup extends Component {
        constructor(props) {
            super(props);
            this.state = {
                username: "",
            }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChange(e) {
            this.setState({username: e.target.value});
        }
        handleSubmit(e) {
            e.preventDefault()
            this.props.onSubmit(this.state.username);
        }
        render() {
            return(
                <div className="form-container">
                    <h1>Sign in to chat</h1>
                    <form onSubmit={this.handleSubmit} className="form">
                        <label htmlFor="email">What is your email?</label>
                        <input type="email" name="username" onChange={this.handleChange} className="input" />
                        <button className="submit">Submit</button>
                        <h5 className="disclaimer"><em>Live chat is powered by 
                            <a className="link" href="https://pusher.com/"> Pusher®</a></em></h5>
                        <h5 className="disclaimer2"><em>*We do not store any sensitive data on our website*</em></h5>
                    </form>
                </div>
            )
        }
    }
    export default Signup;