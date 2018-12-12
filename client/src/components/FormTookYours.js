import React from 'react';

const TookYours = (props) => (
	<div id="singleTaker">
		<div>{props.takername} got a {props.score} on your quiz! </div>
	</div>
)

export default TookYours;