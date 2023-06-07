import { PropsWithChildren }  from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Button, Row, Col, Card }  from 'react-bootstrap';

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                {children}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export function Home() {
  return (
    <Layout>
      <h1>Welcome to Check Wallet</h1>
      <p>
        Check old and new wallets and see how much money they have in different currencies!
      </p>
      <div className="d-flex flex-row gap-3">
        <LinkContainer to="/sign-in">
          <Button>Sign-in</Button>
        </LinkContainer>
        <LinkContainer to="/sign-up">
          <Button>Sign-up</Button>
        </LinkContainer>
      </div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
        <a href="https://github.com/betula/resume">
          Slava Bereza CV
        </a>
      </footer>
    </Layout>
  );
}
