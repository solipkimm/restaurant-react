import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";

function Restaurant(props){
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://cryptic-lowlands-55609.herokuapp.com/api/restaurants/${props.id}`)
    .then(response => response.json())
    .then(data => {
      setLoading(false);
      if(data.hasOwnProperty("_id")){
        setRestaurant(data);
      } else {
        setRestaurant(null);
      }
    })
  }, [props.id]);

  if (loading){
    return (
      <Card style={{ backgroundColor: "whitesmoke" }}>
        <Card.Body>
          <Card.Text>
            Loading Restaurant Data...
          </Card.Text>
        </Card.Body>
      </Card>
    )
  } else {
    if (restaurant){
      return (
        <div>
          <Card style={{ backgroundColor: "whitesmoke" }}>
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>
                {restaurant.address.building} {restaurant.address.street}
              </Card.Text>
            </Card.Body>
          </Card>

          <MapContainer 
            style={{"height": "400px"}} 
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]} 
            zoom={13} 
            scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
          </MapContainer>
          <br />
          <h3>Ratings</h3>
          <hr />
          <br />
          <CardDeck>
            {restaurant.grades.map((res, i) =>{
              return (
                <Card key={`${i}`}>
                  <Card.Body>
                    <Card.Title>Grade: {res.grade}</Card.Title>
                    <Card.Text>
                      Completed: {res.date}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )
            })}
          </CardDeck>
          <br />
        </div>
      )
    } else {
      return (
        <Card style={{ backgroundColor: "whitesmoke" }}>
          <Card.Body>
            <Card.Text>
              Unable to find Restaurant with id: {props.id}
            </Card.Text>
          </Card.Body>
        </Card>
      )
    }
  }
}

export default Restaurant;