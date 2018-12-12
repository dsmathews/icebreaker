import React from 'react';
import { Form, Input, FormGroup, Row, Col } from 'reactstrap';

const FormSignUp = (props) => (
	<div>
		<Form>
			<h3>Sign Up</h3>
			<FormGroup>
				<Row>
					<Col>First Name: </Col>
					<Col><Input type="text" name='firstName' onChange={props.handleChange}></Input></Col>
				</Row>
				<Row>
					<Col>Last Name: </Col>
					<Col><Input type="text" name='lastName' onChange={props.handleChange}></Input></Col>
				</Row>
				<Row>
					<Col>Email: </Col>
					<Col><Input type="text" name='email' onChange={props.handleChange}></Input></Col>
				</Row>
				<Row>
					<Col>User Name: </Col>
					<Col><Input type="text" name='username' onChange={props.handleChange}></Input></Col>
				</Row>
				<Row>
					<Col>Enter Password: </Col>
					<Col><Input type="password" name='password1' onChange={props.handleChange}></Input></Col>
				</Row>
				<Row>
					<Col>Enter Again: </Col>
					<Col><Input type="password" name='password2' onChange={props.handleChange}></Input></Col>
				</Row>
			</FormGroup>
		</Form>
	</div>
)

export default FormSignUp;