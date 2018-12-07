import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Alert, Row, Input } from 'reactstrap';

class ModalTestTaker extends React.Component {
	state = {
		modal: false,
		alert: {
			color: '',
			message: '',
		}
	}

	//GENERAL FUNCTIONS
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
			input: '',
			answer: '',
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
				message: "Answer the bloddy questions, ya bleeding tossah!"
			}
		})
	}

	render() {
		return (
			<div>
				<div>
					<Button color="primary" onClick={this.toggleModal}>Take It!</Button>
				</div>
				<Modal isOpen={this.state.modal} toggle={this.state.toggleModal}>
					<form>
						<ModalBody>
							<div>Question Goes Here</div>
						</ModalBody>
						<ModalFooter>
							<Button onClick={this.toggleModal}>Close</Button>
						</ModalFooter>
					</form>

				</Modal>
			</div>
		)
	}
}

export default ModalTestTaker;