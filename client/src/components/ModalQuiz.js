import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Alert, Row, Input } from 'reactstrap';
class ModalQuiz extends React.Component {

	state = {
		modal: false,
		title: '',
		questions: [],
		answers: [],
		input: '',
		answer: '',
		index: 0,
		alert: {
			color: '',
			message: ''
		}
	}

	//[NOTE]: WILL NEED A COMPONENTDIDMOUNT CHECK TO GRAB AND FILL OUT QUESTIONS IF THEY EXIST.

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
				message: "Oy! Finish yer quiz, ya cheeky wankah!"
			}
		})
	}

	// CREATING QUIZ FUNCTIONS
	nextQuestion = () => {
		const index = this.state.index;
		const nextIndex = index + 1;

		const question = {
			title: this.state.title,
			input: this.state.input,
			answer: this.state.answer
		}
		
		if (this.validation(question)) {
			this.incompleteForm();
		} else if (this.state.questions[nextIndex] ) {
			this.state.questions.splice(index, 1, question.input);
			this.state.answers.splice(index, 1, question.answer);
			this.setState({
				index: nextIndex,
				title: this.state.title,
				input: this.state.questions[nextIndex],
				answer: this.state.answers[nextIndex],
			})
		} else {
			this.state.questions.splice(index, 1, question.input);
			this.state.answers.splice(index, 1, question.answer);
			this.setState({
				input: '',
				answer: '',
				index: nextIndex,
				alert: {
					color: '',
					message: ''
				}
			})
		}
	}

	lastQuestion = () => {
		const index = this.state.index;
		const lastIndex = index - 1;

		const question = {
			title: this.state.title,
			input: this.state.input,
			answer: this.state.answer
		}

		if (this.validation(question)) {
			this.setState({
				index: lastIndex,
				title: this.state.title,
				input: this.state.questions[lastIndex],
				answer: this.state.answers[lastIndex],
				alert: {
					color: '',
					message: ''
				}
			})
		} else {
			this.state.questions.splice(index, 1, question.input);
			this.state.answers.splice(index, 1, question.answer);
			this.setState({
				index: lastIndex,
				title: this.state.title,
				input: this.state.questions[lastIndex],
				answer: this.state.answers[lastIndex],
				alert: {
					color: '',
					message: ''
				}
			})
		}
	}

	resumeCreating = () => {
		const index = this.state.index;
		console.log(index);
		if (this.state.questions[index] === undefined) {
			this.setState({
				modal: !this.state.modal,
				input: '',
				answer: ''
			})
		} else {
			this.setState({
				modal: !this.state.modal,
				title: this.state.title,
				input: this.state.questions[index],
				answer: this.state.answers[index]
			})
		}
	}

	createQuiz = () => {
		const index = this.state.index;

		const question = {
			title: this.state.title,
			input: this.state.input,
			answer: this.state.answer
		}

		if (this.validation(question)) {
			this.incompleteForm();
		} else {
			this.state.questions.splice(index, 1, question.input);
			this.state.answers.splice(index, 1, question.answer);

			const fullQuiz = {
				title: this.state.title,
				questions: this.state.questions,
				answers: this.state.answers
			}

			console.log(fullQuiz);
			//[NOTE]: THIS IS WHERE THE AXIOS CALL GOES.

			this.toggleModal();
			this.setState({
				index: 0
			})
		}
	}

	updateQuiz = () => {
		const index = this.state.index
		this.setState({
			modal: !this.state.modal,
			title: this.state.title,
			input: this.state.questions[index],
			answer: this.state.answers[index]
		})
	}

	render() {
		return (
			<div>
				<div>
					{this.state.questions.length === 5 ?
						<Button color="primary" onClick={this.updateQuiz}>Update Quiz!</Button> : null}
					{(this.state.questions.length > 0 && this.state.questions.length < 5) ?
						<Button color="primary" onClick={this.resumeCreating}>Continue!</Button> : null}
					{this.state.questions.length === 0 ?
						<Button color="primary" onClick={this.toggleModal}>Create Quiz!</Button> : null}
				</div>
				<Modal isOpen={this.state.modal} toggle={this.state.toggleModal}>
					<form>
						<ModalBody>
							<h3>Title:</h3>
							<Input type="text" name="title" onChange={this.handleChange} value={this.state.title}/> 
							<h3>Question {this.state.index + 1} of 5</h3>
							<h6>Just type in a question and choose if it's true or false</h6>
							{/* <FormGroup check> */}
							<Row>
								<h6>Question:</h6>
								<Input type="textarea" name="input" onChange={this.handleChange} value={this.state.input}/>
							</Row>
							<Row>
								<h6>Answer</h6>
							</Row>
							<Row>
								<label htmlFor="answer-true">True</label>
								<input
									type='radio'
									value="true"
									id="answer-true"
									name='answer'
									onChange={this.handleChange}
									checked={this.state.answer === "true"}
								/>
							</Row>
							<Row>
								<label htmlFor="answer-false">False</label>
								<input
									type='radio'
									value="false"
									id="answer-false"
									name='answer'
									onChange={this.handleChange}
									checked={this.state.answer === "false"}
								/>
							</Row>
							{/* </FormGroup> */}
						</ModalBody>
						<Alert color={this.state.alert.color}>{this.state.alert.message}</Alert>
						<ModalFooter>
							{this.state.index === 0 ? null :
								<Button onClick={this.lastQuestion}>Back</Button>}
							<Button onClick={this.toggleModal}>Close</Button>
							{this.state.index === 4 ? null :
								<Button onClick={this.nextQuestion}>Next</Button>}
							{this.state.index < 4 ? null :
								<Button onClick={this.createQuiz}>Submit</Button>}
						</ModalFooter>
					</form>
				</Modal>
			</div>

		)
	}
}

export default ModalQuiz;