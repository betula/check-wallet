import { PropsWithChildren }  from 'react';
import { Container, Row, Col, Card }  from 'react-bootstrap';

export function HomeLayout({ children }: PropsWithChildren) {
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