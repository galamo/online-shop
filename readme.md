## How to run this project
1. `cd api` && `npm install` && `npm start`
2. `cd react-client` && `npm install` && `npm run dev`






# EX-1
1. implement login
2. send the user to /countries page after login success


# HW 
1. create products component
2. create products filter - ( by name )
3. protect your products component
4. send the jwt token from the client


# Dockerizing nodejs script
1. Create your docker folder
2. create inside the folder JS file with your name printing function
3. create Dockerfile
4. add the relevant commands - take reference from Gal's Dockerfile
5. Run inside your folder the following command
- `docker build . --tag print-my-name`
6. Run your container based on `print-my-name` image:
- `docker run print-my-name`

Expected result: Your name printed!
Q: what you will see when typing `docker ps` 


7. Add setTimeout to make your container hanged.
8. try to connect to your container `docker exec -it <CONTAINER_ID> sh`

9. `docker build . --tag api`
10. `docker run -p 4000:4000 api`
11. `docker rmi api`


12. `docker compose up --build`



# Homework 19/7
1. watch the following course https://www.youtube.com/watch?v=pTFZFxd4hOI
2. Create Docker compose file with 2 express API that can communicate each other
- api1 - /health-check - making http request to api2 - /health-check
- api1 will return the response from api2 


# Homework 23/7 
1. Create a docker compose that run all the eco system , client, server & database
2. Create signup page with hashed password. password should be hashed in the database ( salt should be saved as well )

# Homework 30/7
1. Create the following feature: Add to Cart
2. the feature includes a Products Page that present all the products GET /products
3. AddProductToCart - POST /addToCart/:cartId/:productId
4. Advanced - Create Cart page

## Solution 
1. Cart Table
- cartId
- userId 
- createAt
- isOpen 
- status - open / closed / deleted 
2. CartProduct
- id
- cartId
- productId
- quantity
- price ? 
- createdAt




# Homework 6/8
1. Create Database 
- Schema: Sport5
- Table Games
 <!-- 1 | 23 | 24 |  5 |  1 | 2023-08-06 17:00:00  -->
  - id
  - teamAId ( FK from teams table teamId )
  - teamBid ( FK from teams table teamId )
  - teamAScore
  - teamBscore
  - gameTime - date & time ( use date picker in the UI )
- Table: Teams
<!-- 23 | Macabi Haifa | Haifa |  Green |  white | https://semel.jpeg  -->
<!-- 24 | Macabi Tel Aviv | TelAviv |  Yellow |  blue | https://semel.jpeg  -->
  - teamId
  - teamName
  - city
  - mainColor
  - secondaryColor
  - Semel - link to picture

<!-- select <Columns> from <TABLEA> join <TABLEB> on <TABLEA.Col> =  <TABLEB.Col>  -->

2. Crecate nodejs API
- GET /Games ( this API will return all the games with the teams names and colors)
- GET /team ( this API will return the team information according to the team name sent)
- GET /teams (this API will return all the teams)
- POST /team/new - create new team with all the relevant data
- POST /game/new - create a game with time and score
3. Create React Client 
- create the following routes
- create a route for the games
- create a route for the team details
- create a route for creating new team
- create a route for creating a new game based on the existing teams


## Solution Query

```sql

SELECT 
    team1.teamId AS 'Home Team Id',
    team1.name AS 'Home Team',
    team2.teamId AS 'Away Team Id',
    team2.name AS 'Away Team',
    sport5.games.teamAScore,
    sport5.games.teamBScore,
    gameDateTime
FROM
    sport5.teams AS team1
        JOIN
    sport5.games ON sport5.team1.teamId = sport5.games.teamAId
        JOIN
    sport5.teams AS team2 ON team2.teamId = sport5.games.teamBId
WHERE
    team1.name = 'Macabi Tel Aviv'
        OR team2.name = 'Macabi Tel Aviv'



```





# Homework 9/8
1. Create Database 
- Schema: CarRental
- Table Cars
  - id
  - car 
  - lp
  - color
  - engine
  - company
  - image
- Table: Rentals
  - rentId
  - carId
  - from
  - to
  - price ( calculate per day)


2. Support creating Car, create renal & validate the car cannot be rental double booked
3. show all the current rentals 



# Example router dom - 5 ( you need 6 )

import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  
  Link,
  useLocation,
  Routes,
  Route
} from "react-router-dom";

// React Router does not have any opinions about
// how you should parse URL query strings.
//
// If you use simple key=value query strings and
// you do not need to support IE 11, you can use
// the browser's built-in URLSearchParams API.
//
// If your query strings contain array or object
// syntax, you'll probably need to bring your own
// query parsing function.

export default function QueryParamsExample() {
  return (
    <Router>
      <QueryParamsDemo />
    </Router>
  );
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function QueryParamsDemo() {
  let query = useQuery();
  const vacations = [
    {vacationId: 1, name:"zanzibar"},
    {vacationId: 2, name:"hawai"},
    {vacationId: 3, name:"tel aviv"},
  ]
  return (
    <div>
      <div>
        <h2>Vacations</h2>
        <ul>
          
          {vacations.map((v)=>{
            return <li> <h1> {v.name} </h1> 
            <Link to={`/editVacation?vid=${v.id}`}>Edit</Link>
            </li>
          })}
         
        </ul>
        <Routes>
              <Route path={"/editVacation"} key={"editVacation"} component={<EditVacation/>} />
        </Routes>
      </div>
    </div>
  );
}

function EditVacation({ name }) {
  const query = useQuery()
  console.log(query.get("vid"))
  useEffect(()=>{
      function getVacationDetails(name){
        
      }
    
      // getVacationDetails(name)
  },[])
  return (
    <div>
      <h1> Edit vacation</h1>
      <h2>{query.get("vid")}</h2>
    </div>
  );
}
