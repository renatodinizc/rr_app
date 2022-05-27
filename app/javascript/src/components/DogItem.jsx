import React, {useState, useEffect } from 'react';

function DogItem({id, name, breed, image}) {
    const [isEditing, setEditing] = useState(false);
    const [itemEdit, setItemEdit] = useState({
                                              name: '',
                                              breed: '',
                                              image: {}
                                            });

    function handleChange(event) {
        setItemEdit(prevState => ({...prevState, [event.target.name]: event.target.value}));
    };

    function handleSubmit(event) {
        event.preventDefault();
        const newItem = new FormData();

        newItem.append('dog[name]', event.target.name.value);
        newItem.append('dog[breed]', event.target.breed.value);
        newItem.append('dog[image]', event.target.image.files[0]);
        sendToApi(newItem);
    };

    function sendToApi(newItem) {
        fetch(`http://localhost:3001/api/v1/dogs/${id}`, {
            method: 'PATCH',
            body: newItem,
        })
        .then(response => response.json())
        .then(parsedResponse => console.log(parsedResponse))
        .then(setEditing(false));

    };

    if (isEditing) {
        return (
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Dog name' autoComplete='off' onChange={handleChange} />
                <input type='text' name='breed' placeholder='Dog breed' autoComplete='off' onChange={handleChange}/>
                <input type='file' accept='image/*' name='image' />
                <button type='submit'>Save edit</button>
            </form>
        );
    } else {
        return (
            <ul>
                <li>Name: {name}</li>
                <li>Breed: {breed}</li>
                <img src={image.record_type} />
                <button onClick={() => setEditing(true)}>Edit dog</button>
            </ul> 
        );
    };
};

export default DogItem;