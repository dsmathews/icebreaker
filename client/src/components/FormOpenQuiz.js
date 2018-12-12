import React from 'react';
import ModalTestTaker from './ModalTestTaker';

const OpenQuiz = (props) => (
	<div id="singleQuiz animated fadeIn">
		<span>{props.username}'s</span> <span>{props.title}</span>
		<ModalTestTaker
			setYourResults = {props.setYourResults}
			setQuizzes = {props.setQuizzes}
			questions={props.questions}
			title={props.title}
			quizMakerId={props.quizMakerId}
			quizId={props.quizId}
			updateConnections={props.updateConnections}
			connections={props.connections} />
	</div>
)

export default OpenQuiz;