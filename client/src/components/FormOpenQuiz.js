import React from 'react';
import ModalTestTaker from './ModalTestTaker';

const OpenQuiz = (props) => (
	<div id="singleQuiz">
		<h3><span>{props.title}</span></h3><h6><span>Username: {props.username}'s</span></h6>
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