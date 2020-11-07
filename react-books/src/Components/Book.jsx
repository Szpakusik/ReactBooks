// @flow 
import * as React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import logo from '../static/holder.jpg';

export const Book = () => {
    return (
        <>
            <Col xs={12} md={4} className={`p-3`}>
                <Card>
                    <Card.Img variant="top" src={logo} />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};