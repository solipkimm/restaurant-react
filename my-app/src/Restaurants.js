import { useState, useEffect } from "react";
import queryString from 'query-string';
import { useHistory } from "react-router-dom";
import { Card, Table, Pagination } from "react-bootstrap";

function Restaurants(props){
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const perPage = 10;
  let query = queryString.parse(props.query);
  if (query.borough === undefined) {
    query.borough = "";
  }

  useEffect(() => {
    fetch(`https://cryptic-lowlands-55609.herokuapp.com/api/restaurants?perPage=${perPage}&page=${page}&borough${query.borough}`)
    .then(response => response.json())
    .then(data => {
      setRestaurants(data);
    });
  }, [page, query.borough]);

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  function nextPage() {
    setPage(page + 1);
  }

  if (restaurants){
    if (restaurants.length > 0) {
      return (
        <div>
          <Card style={{ backgroundColor: "whitesmoke" }}>
            <Card.Body>
              <Card.Title> Restaurant List</Card.Title>
              <Card.Text>
                Full list of restaurants. Optionally sorted by borough
              </Card.Text>
            </Card.Body>
          </Card>
        
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {
                restaurants.map(restaurant =>
                  <tr key={restaurant._id}
                    onClick={()=>{ 
                      history.push(`/restaurant/${restaurant._id}`)
                    }}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.address.building} {restaurant.address.street}</td>
                    <td>{restaurant.borough}</td>
                    <td>{restaurant.cuisine}</td>
                  </tr>
                )
              }
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={() =>{
              previousPage()
            }}/>
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={() =>{
              nextPage()
            }}/>
          </Pagination>
        </div>
      )
    } else {
      return (
        <Card style={{ backgroundColor: "whitesmoke" }}>
          <Card.Body>
            <Card.Text>
              No Restaurants Found
            </Card.Text>
          </Card.Body>
        </Card>
      )
    }
  } else {
    return (
      <Card style={{ backgroundColor: "whitesmoke" }}>
        <Card.Body>
          <Card.Text>
            Loading Restaurants...
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
  
};

export default Restaurants;