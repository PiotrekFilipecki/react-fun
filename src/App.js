// import React from 'react';
// import { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [date, setDate] = useState(null);
//   useEffect(() => {
//     async function getDate() {
//       const res = await fetch('/api/date');
//       const newDate = await res.text();
//       setDate(newDate);
//     }
//     getDate();
//   }, []);
//   return (
//     <main>
//       <h1>Create React App + Go API</h1>
//       <h2>
//         Deployed with{' '}
//         <a
//           href="https://zeit.co/docs"
//           target="_blank"
//           rel="noreferrer noopener"
//         >
//           ZEIT Now
//         </a>
//         !
//       </h2>
//       <p>
//         <a
//           href="https://github.com/zeit/now-examples/tree/master/create-react-app-functions"
//           target="_blank"
//           rel="noreferrer noopener"
//         >
//           This project
//         </a>{' '}
//         was bootstrapped with{' '}
//         <a href="https://facebook.github.io/create-react-app/">
//           Create React App
//         </a>{' '}
//         and contains three directories, <code>/public</code> for static assets,{' '}
//         <code>/src</code> for components and content, and <code>/api</code>{' '}
//         which contains a serverless <a href="https://golang.org/">Go</a>{' '}
//         function. See{' '}
//         <a href="/api/date">
//           <code>api/date</code> for the Date API with Go
//         </a>
//         .
//       </p>
//       <br />
//       <h2>The date according to Go is:</h2>
//       <p>{date ? date : 'Loading date...'}</p>
//     </main>
//   );
// }

// export default App;

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './App.css';

const GET_POKEMON_INFO = gql`
{
    pokemons(first: 150) {
      id
      number
      name,
      image,
      evolutions {
        id,
        number,
        name,
        image
      }
    }
  }`;

function App() {
  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

return (
  <React.Fragment>
    <h1>Pokémons</h1>
    <div className="container">
      {data &&
        data.pokemons &&
        data.pokemons.map((pokemon, index) => (
          <div key={index} className="card">
            <img src={pokemon.image} />
            <div class="card-body">
              <h3>{pokemon.name}</h3>
              <p>
                {pokemon.evolutions && pokemon.evolutions.length !== 0 && (
                  <p>
                    {" "}
                    Evolutions:
                    {pokemon.evolutions.map((e, indx) => {
                      return <p key={indx}> {e.name} </p>;
                    })}
                  </p>
                )}
              </p>
            </div>
          </div>
        ))}
    </div>
  </React.Fragment>
);
}

export default App;

