// @flow 
import * as React from 'react';
import { Col, Card } from 'react-bootstrap';
import logo from '../static/holder.jpg';

export const Book = ({ title, author, description, isDescShortened, image }) => {

    const shortenSign = isDescShortened ? "..." : ""

    return (
            <Col sm={6} lg={4} xl={3} className={`p-3`}>
                <Card className="h-100">
                    <Card.Img src={image} />
                    <Card.Body>
                        <Card.Title><span className="align-middle">{ title }</span></Card.Title>
                        <Card.Subtitle>{author}</Card.Subtitle>
                        <Card.Text>{ description.replace(/^(.{130}[^\s]*).*/, "$1") + shortenSign }</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
    );
};