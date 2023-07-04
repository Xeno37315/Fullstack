import React, {useState} from "react";
import { Button,Container, Row, Col, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@iconify/react';
import './GameItem.css';

const GameItem = props => {

    const baseURL = 'http://localhost:3001/api';
    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [image, setImage] = useState(props.image);

    const updateGame = async() => {

        const response = await fetch(baseURL + "/updateGame/" + props.game._id, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name: name,
                price: price,
                isAvailable: props.game.isAvailable,
                genre: props.game.genre,
                description: props.game.description,
                image: props.game.image
            })
          });
          const data = await response.json();
          setIsEditable(false);
          props.loadAllGames();
    }

    return (
       <div>
        {
            isEditable ? (
                <div style={{color:'orange'}}>
                    Is Editable
                </div>
            ) : (
                <div className='card-container'>
                    	<img className='card-img' src={image} alt=''/>
                        <div className='card-description'>
                            <h5>Name: {name}</h5>
                            <h5>Price: {price}$</h5>
                        </div>
                        <div className='card_info'>
                            <div>
                                <Icon style={{margin:12}} icon="iconamoon:dislike" /> 12
                                <Icon style={{margin:12}} icon="iconamoon:like-light" />5310
                            </div>
                            <div>
                                <a className='card-btn' href=''>more info</a>
                            </div>
                        </div>
                </div>
            )
        }
       </div>
    )
}

export default GameItem;