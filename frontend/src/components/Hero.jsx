import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className=" py-5">
    {userInfo? (<Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Welcome {userInfo.name } </h1>
          <div style={{ height: '100px', width: '100px', overflow: 'hidden' }}>
      <img
        src={userInfo.image?.url}
        alt=""
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
    </div>
    <br />
          <p className="text-center mb-4">
            We are here for you
          </p>
         
        </Card>
      </Container>):(<Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN Authentication</h1>
          <p className="text-center mb-4">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className="d-flex">
            <LinkContainer to={"/login"}>
              <Button variant="primary" href="/login" className="me-3">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to={"/register"}>
              <Button variant="secondary" href="/register">
                Register
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>)}
    </div>
  );
};

export default Hero;
