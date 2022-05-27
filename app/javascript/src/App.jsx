import React, { useState, useEffect } from 'react';
import DogItem from './components/DogItem'

function App() {
  const [data, setData] = useState([{
                                     id: 0,
                                     name: '',
                                     breed: '',
                                     image: ''
                                    }]);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/dogs')
    .then(response => response.json())
    .then(parsedResponse => setData(parsedResponse));
  }, []);

  return (
    <>
      <h1>Hello world from React</h1>
      {console.log(data)}
      {data.map(dog => 
        <DogItem id={dog.id} name={dog.name} breed={dog.breed} image={dog.image} />
      )}
    </>
  );
}

export default App;
