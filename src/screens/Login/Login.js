import React, { useState, useEffect } from "react";
import Mainscreen from "../../components/mainscreen";
import { Col, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Errormessage from "../../components/Errormessage";
import { login } from "../../actions/userActions";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      navigate("/notes");
    }
  }, [navigate, userInfo]);

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <Mainscreen title="LOGIN">
        <div className="loginContainer">
          {error && <Errormessage variant="danger">{error}</Errormessage>}
          {loading && <Loading />}
          <Form onSubmit={handlesubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button size="md" type="submit">
              Submit
            </Button>
          </Form>
          <Row className="py-2">
            <Col>
              <p>
                New Customer ?{" "}
                <Button style={{ marginLeft: "12px" }}>
                  <Link to="/signup">Signup</Link>
                </Button>
              </p>
            </Col>
          </Row>
        </div>
      </Mainscreen>
    </div>
  );
};

export default Login;
