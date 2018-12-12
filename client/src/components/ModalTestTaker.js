import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, Alert, Row } from 'reactstrap';



class ModalTestTaker extends React.Component {
	state = {
		modal: false,
		index: 0,
		answer: '',
		answers: [],
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
			index: 0,
			input: '',
			answer: '',
			answers: [],
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

	//QUESTION ANSWERING FUNCTIONS
	nextQuestion = () => {
		const index = this.state.index;
		const nextIndex = index + 1;
		const answer = this.state.answer

		if (!answer) {
			this.incompleteForm();
		} else if (this.state.answers[nextIndex]) {
			this.state.answers.splice(index, 1, answer)
			this.setState({
				index: nextIndex,
				answer: this.state.answers[nextIndex]
			})
		} else {
			this.state.answers.splice(index, 1, answer)
			this.setState({
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
		const answer = this.state.answer

		if (!answer) {
			this.setState({
				index: lastIndex,
				answer: this.state.answers[lastIndex],
				alert: {
					color: '',
					message: ''
				}
			})
		} else {
			this.state.answers.splice(index, 1, answer)
			this.setState({
				index: lastIndex,
				answer: this.state.answers[lastIndex],
				alert: {
					color: '',
					message: ''
				}
			})
		}
	}

	submitAnswers = () => {
		const index = this.state.index;
		const answer = this.state.answer;
		const quizId = this.props.quizId;
		const makerId = this.props.quizMakerId;
		let answerKey = [];
		let answers = [];
		let scoreCounter = 0;

		if (!answer) {
			this.incompleteForm();
		} else {
			this.state.answers.splice(index, 1, answer)
			console.log(this.state.answers)
			answers = this.state.answers;
			console.log("Quiz ID: " + this.props.quizId)
			console.log("Creator ID: " + this.props.quizMakerId)

			axios.get(`/api/quiz/${this.props.quizId}`, {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			}).then(function (res) {
				console.log('ANSWER KEY', res.data[0].answers)
				answerKey = res.data[0].answers
			}).then(function () {
				for (let i = 0; i < answers.length; i++) {
					if (answers[i] === answerKey[i]) {
						scoreCounter++;
					}
				}
				console.log('SCORE', scoreCounter)
			}).then(function () {
				const submitAll = {
					takerId: localStorage.getItem("userId"),
					quizId: quizId,
					makerId: makerId,
					score: scoreCounter
				}

				axios.post(`/api/connection`, submitAll, {
					headers: {
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
			}).then(resp => {
				this.props.setQuizzes();
				this.props.setYourResults();
				this.toggleModal()
			})
		}
	}

	render() {
		return (
			<div>
				<div>
					<Button onClick={this.toggleModal}>Take It!</Button>
				</div>
				<Modal isOpen={this.state.modal} toggle={this.state.toggleModal}>
					<form>
						<h3 className="take-quiz-title">{this.props.title}</h3>
						<ModalBody>
							<h3 className="take-quiz-title2">Question {this.state.index + 1} of 5</h3>
							<div className="take-quiz-question">{this.props.questions[this.state.index]}</div>
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
						</ModalBody>
						<Alert color={this.state.alert.color}>{this.state.alert.message}</Alert>
						<ModalFooter>
							{this.state.index === 0 ? null :
								<Button onClick={this.lastQuestion}>Back</Button>}
							<Button onClick={this.toggleModal}>Quit Like a Quitter</Button>
							{this.state.index === 4 ? null :
								<Button onClick={this.nextQuestion}>Next</Button>}
							{this.state.index < 4 ? null :
								<Button onClick={this.submitAnswers}>Submit</Button>}
						</ModalFooter>
					</form>

				</Modal>
			</div>
		)
	}
}

export default ModalTestTaker;