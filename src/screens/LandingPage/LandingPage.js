import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./LandingStyle.css";
import { Link, useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/notes");
    }
  }, [navigate]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Notes App</h1>
              <p className="subtitle">Safe place for all your notes</p>
            </div>
            <div className="buttonContainer">
              <Button size="lg" className="landingbutton" variant="dark">
                <Link to="/login">Login</Link>
              </Button>

              <a href to="/register">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="landingbutton"
                >
                  <Link to="/signup">Signup</Link>
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
