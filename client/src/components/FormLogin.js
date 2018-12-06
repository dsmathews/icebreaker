import React from 'react';
import { Form, Input, FormGroup, Row, Col } from 'reactstrap';

const FormLogin = (props) => (
	<div>
		<Form>
			<h3>Login</h3>
			<FormGroup>
				<Row>
					<Col>Email: </Col>
					<Col><Input type="text" name='email' onChange={props.handleChange}></Input></Col>
				</Row>
				<Row>
					<Col>Password: </Col>
					<Col><Input type="password" name='password1' onChange={props.handleChange}></Input></Col>
				</Row>
			</FormGroup>
		</Form>
	</div>
)

export default FormLogin;