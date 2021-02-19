import { Card } from "react-bootstrap";

export default function About() {
  return (
    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title> Solip Kim</Card.Title>
        <p>
          Student at Seneca College <br />
          skim428@myseneca.ca
        </p> 
        <hr />
        <Card.Text>
          A lazy programmer
        </Card.Text>
      </Card.Body>
    </Card>
  );
}