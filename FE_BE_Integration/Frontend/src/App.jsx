import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios.get('/api/jokes')
    .then((response) => {
      // console.log('response from axios: ', response);
      setJokes(response.data);
    })
    .catch((error) => console.log('Axios :: error ', error))


  // // Using Fetch API
  //   fetch("/api/jokes")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("N/W res was not Okay");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("data: ", data);
  //       setJokes(data);
  //     })
  //     .catch((error) => console.log("fetchAPI :: error", error));


  }, []);

  // w/o empty array as dependency,
  // it will run infinitely

  return (
    <>
      <h1>Jokes using custom API call and backend</h1>
      <h1>Jokes: {jokes.length}</h1>
      {jokes.map((joke) => (
        <div key={joke.id} className="joke-item">
          <h2>{joke.joke_name}</h2>
          <h4>{joke.desc}</h4>
        </div>
      ))}
    </>
  );
}

export default App;
