import React from 'react';

const TakenQuiz = (props) => (
	<div id="singleConnection">
		
		<h3>{props.quizname} Quiz</h3>
		<h6>Username:  {props.makername}'s </h6>
		<h6>{props.score}</h6>
	</div>
)

export default TakenQuiz;