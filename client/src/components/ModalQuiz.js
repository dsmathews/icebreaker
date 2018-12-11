import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, Alert, Row, Input } from 'reactstrap';

class ModalQuiz extends React.Component {
	state = {
		modal: false,
		modal2: false,
		quizId: '',
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
	//GENERAL FUNCTIONS
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	componentDidMount() {
		console.log("Quiz ID", this.props.userInfo.quizId)
		if (this.props.userInfo.quizId.length > 0) {
			console.log(this.props.userInfo.quizId)
			axios.get(`/api/quiz/${this.props.userInfo.quizId}`, {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				  }
			})
				.then(resp =>
					this.setState({
						quizId: resp.data[0]._id,
						title: resp.data[0].title,
						answers: resp.data[0].answers,
						questions: resp.data[0].questions
					})
				)
		} else {
			this.setState({
				quizId: ''
			})
		}
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

	toggleView = () => {
		this.setState({
			modal2: !this.state.modal2
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
		} else if (this.state.questions[nextIndex]) {
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

			const token = localStorage.getItem("token");
			axios.post('/api/quiz/', fullQuiz, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
				.then((res) => {
					console.log('QuiZ Created: ', res);
					this.toggleModal();
					this.setState({
						index: 0,
						quizId: res.data._id
					})
				})
		}
	}

	deleteQuiz = () => {
		const token = localStorage.getItem("token");
		axios.delete(`/api/quiz/${this.state.quizId}`, {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		}).then(
			this.setState({
				quizId: '',
				answers: [],
				questions: [],
				title: '',
			})
		)
	}

	render() {
		return (
			<div className="quizBackground">
				<div>
					{this.state.quizId ? <div>
						<Button color="primary" onClick={this.deleteQuiz}>Exterminate Quiz!</Button>
						<div>
							<Button color="primary" onClick={this.toggleView}>Check it</Button> : null}
							<Modal isOpen={this.state.modal2} toggle={this.toggleView}>
							<ModalBody>
									<h3>{this.state.title}</h3>
									<div>{this.state.questions[0]}</div><div>{this.state.answers[0]}</div>
									<div>{this.state.questions[1]}</div><div>{this.state.answers[1]}</div>
									<div>{this.state.questions[2]}</div><div>{this.state.answers[2]}</div>
									<div>{this.state.questions[3]}</div><div>{this.state.answers[3]}</div>
									<div>{this.state.questions[4]}</div><div>{this.state.answers[4]}</div>
								</ModalBody>
								<ModalFooter>
									<Button onClick={this.toggleView}>We Good</Button>
								</ModalFooter>
							</Modal>

						</div>
					</div> : null}
					{(this.state.questions.length > 0 && this.state.questions.length < 5) ?
						<Button color="primary" onClick={this.resumeCreating}>Continue!</Button> : null}
					{this.state.questions.length === 0 ?
						<Button color="primary" onClick={this.toggleModal}>Create Quiz!</Button> : null}
				</div>
				<Modal isOpen={this.state.modal} toggle={this.state.toggleModal}>
					<form>
						<ModalBody>
							<h3>Title:</h3>
							<Input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
							<h3>Question {this.state.index + 1} of 5</h3>
							<h6>Just type in a question and choose if it's true or false</h6>
							{/* <FormGroup check> */}
							<Row>
								<h6>Question:</h6>
								<Input type="textarea" name="input" onChange={this.handleChange} value={this.state.input} />
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