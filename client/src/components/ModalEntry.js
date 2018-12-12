import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import FormLogin from './FormLogin';
import FormSignUp from './FormSignUp';

class ModalEntry extends React.Component {
	state = {
		modal: false,
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password1: '',
		password2: '',
		form: '',
		alert: {
			color: '',
			message: ''
		}
	}

	//GENERAL FUNCTION
	handleChange = (event) => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
			alert: {
				color: '',
				message: ''
			}
		})
	}

	validation = (form) => {
		for (let input in form) {
			if (form[input] === '')
				return true;
		}
		return false;
	}

	incompleteForm = () => {
		this.setState({
			alert: {
				color: 'danger',
				message: 'Yo! Fill everything out, ya nerd!'
			}
		})
	}

	passwordMisMatch = () => {
		this.setState({
			alert: {
				color: 'danger',
				message: "Shoop da woop! Your passwords don't match, nerd!"
			}
		})
	}

	//LOGIN SECTION

	//function to change the background when user logs in
	changeBackground = () => {
		console.log("goodtimes") 
		document.querySelector("#root").classList.add("black")	
	}

	loginModal = () => {
		this.setState({
			form: 'login'
		});
		this.toggleModal();
	}

	login = (e) => {
		e.preventDefault();
		const loginData = {
			email: this.state.email,
			password: this.state.password1
		}

		if (this.validation(loginData)) {
			console.log('EMPTY')
			this.incompleteForm();
		} else {
			console.log(loginData);
			axios.post("/api/login", loginData)
				.then(resp => {
					console.log(resp);
					alert("Login was successful");
					this.setState({
						email: '',
						password: '',
					})
					this.toggleModal();
					localStorage.setItem("token", resp.data.token)
					localStorage.setItem('userId', resp.data.id)
					axios.get(`/api/user/${resp.data.id}`)
					.then(resp => {
						console.log('User Info: ', resp.data[0])
						this.props.toggleLogin(resp.data[0]);
					})
					//calling the background change here
				this.changeBackground();
				})
				.catch(err => {
					alert("Email or Password is incorrect.")
				})

		}
	}

	//SIGN UP SECTION
	signUpModal = () => {
		this.setState({
			form: 'signUp'
		});
		this.toggleModal();
	}

	signUp = (e) => {
		e.preventDefault();
		const data = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			username: this.state.username,
			password1: this.state.password1,
			password2: this.state.password2,
		};
		console.log(data)

		if (this.validation(data)) {
			this.incompleteForm();
		} else if (data.password1 !== data.password2) {
			this.passwordMisMatch();
		} else {
			const newUser = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				username: data.username,
				password: data.password1,
				quizId: ""
			}
			console.log(newUser)
			axios.post("/api/user", newUser)
				.then(resp => {
					console.log(resp);
					alert("Thanks for Creating an account, Please Login.")
					this.toggleModal();

				})
				.catch(err => {
					alert('Fill out the entire form!')
				})
		}
	}

	render() {
		return (
			<div>
				<div>
					<h1 className="home-header">ICE BREAKERS</h1>
					<p className="home-body">Create and Take quizzes to find friends with similar interests and break the ice!</p>
				</div>

				<div>
					<Button onClick={this.loginModal} className="login-btn">Login</Button>
					<Button onClick={this.signUpModal} className="signup-btn">Sign Up</Button>
				</div>

				<Modal isOpen={this.state.modal} toggle={this.state.toggleModal}>

					{this.state.form === 'login' ?
						<div>
							<ModalBody>
								<FormLogin handleChange={this.handleChange} />
							</ModalBody>
							<Alert color={this.state.alert.color}>{this.state.alert.message}</Alert>
							<ModalFooter>
								<Button onClick={this.toggleModal}>Close</Button>
								<Button onClick={this.login}>Submit</Button>
							</ModalFooter>
						</div>
						: null}
					{this.state.form === 'signUp' ?
						<div>
							<ModalBody>
								<FormSignUp handleChange={this.handleChange} />
							</ModalBody>
							<Alert color={this.state.alert.color}>{this.state.alert.message}</Alert>
							<ModalFooter>
								<Button onClick={this.toggleModal}>Close</Button>
								<Button onClick={this.signUp}>Submit</Button>
							</ModalFooter>
						</div>
						: null}
				</Modal>
			</div>
		)
	}
}

export default ModalEntry;