import React from 'react';

const TakenQuiz = (props) => (
	<div id="singleConnection">
		<div>{props.makername}'s </div>
		<div>{props.quizname} Quiz</div>
		<div>{props.score}</div>
	</div>
)

export default TakenQuiz;