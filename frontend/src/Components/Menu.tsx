import LoginButton from "@/Components/LoginButton.tsx";
import LogoutButton from "@/Components/LogoutButton.tsx";
import Profile from "@/Components/Profile.tsx";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

export const Menu = () => {
  return (
    // <div>
    //   <nav className={"navbar navbar-default"}>
    //     <div className={"menu"}>
    //       <Link to={"/"}>Home</Link>
    //       <Link to={"/collection"}>My Collection</Link>
    //     </div>
    //   </nav>
    //   <LoginButton />
    //   <Profile />
    // </div>
    
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Pokemon Card Collector</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={"/"}>
              <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/collection"}>
              <Nav.Link >My Collection</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/collection"}>
              <Nav.Link >My Want List</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <LoginButton />
        <Profile />
      </Container>
    </Navbar>
  );
};
