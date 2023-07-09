import "../App.css";
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

class FavouriteList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          localFavourites: JSON.parse(localStorage.getItem("favourites")) || [],
          removeIndex: null,
          update: 0
      }
     
  }
    render() {
     
    if (this.props.favourites === []) {
      return;
    } else {
      return (
        <div>
          
          <Container className="AllCards" fluid>
            <Row xs={2} md={4} lg={6}>
                      {this.props.favourites.map((item, index) => {
                return (
                  <Card
                    className="resultCard"
                    key={index}
                    style={{width: "250px", textAlign:"center"}}
                  >
                    <Card.Img
                      className="cardImg"
                      variant="top"
                      src={item.artworkUrl100}
                    />
                    <Card.Body>
                      <Card.Title>{item.trackName}</Card.Title>
                      <Card.Text className="cardText">
                        {item.shortDescription}
                      </Card.Text>
                      <Button
                                value={item.trackId}
                                onClick={this.props.remove}
                        variant="danger"
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default FavouriteList;

