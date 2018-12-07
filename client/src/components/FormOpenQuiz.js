import React from 'react';
import ModalTestTaker from './ModalTestTaker';

const OpenQuiz = (props) => (
	<div id="singleQuiz">
		<span>{props.username}'s</span> <span>{props.title}</span>
		<ModalTestTaker questions={props.questions} />
	</div>
)

export default OpenQuiz;