import React from 'react'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function CardBook({ book }) {
    const { title, author, description, rating, userName} = book
  return (
    
      <Card className="mb-2">
      <Card.Header>Publié par  : {userName}</Card.Header>
      <Card.Body>
        <Card.Title>{title}
        </Card.Title>
        <Card.Text>
        {description} 
        </Card.Text>
        <Badge bg="primary" pill>
         Rate : {rating.rate}
        </Badge>
        <Badge bg="warning" pill>
         Auteur : {author}
        </Badge>
        <br/><br/>
        <Button variant="success">Réserver</Button>
      </Card.Body>
    </Card>
      
      
  )
}
