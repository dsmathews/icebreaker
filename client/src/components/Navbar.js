import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Col>
        <Navbar expand="md">
          <NavbarBrand ><b className="navbar-title">ICE BREAKERS</b></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://morning-castle-23513.herokuapp.com/" className="logout-link">Log Out</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/ModalQuiz" className="logout-link">Contact</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </Col>
        </Row>
      </div>
    );
  }
}