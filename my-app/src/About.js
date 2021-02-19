import { Card } from "react-bootstrap";

export default function About() {
  return (
    <Card style={{ width: '30rem', backgroundColor: "whitesmoke"}}>
      <Card.Body>
        <Card.Title> Solip Kim</Card.Title>
        <p>
          Student at Seneca College
        </p> 
        <hr />
        <Card.Text>
          React is hard
        </Card.Text>
      </Card.Body>
    </Card>
  );
}