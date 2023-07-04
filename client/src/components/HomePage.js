import GameItem from '../components/GameItem'
import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import Header from '../components/Header';
import { FcPlus, FcEditImage, FcAddDatabase } from "react-icons/fc";
import { Icon } from '@iconify/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import moment from 'moment';
import axios from "axios";

export default function HomePage() {

    const [games, setGames] = useState([]);
    const [genres, setGenres] = useState([]);

    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedGameName, setSelectedGameName] = useState("");
    const [selectedGamePrice, setSelectedGamePrice] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [selectedGameImage, setSelectedGameImage] = useState("");

    useEffect(() => {
        //LoadGames()
        //LoadGenres()

        return () => {
            LoadGenres();
            LoadGames();
            //TestFunc();
            //createGnere();
          }
    }, [])


    const baseURL = "http://localhost:3001/api";
    
    const LoadGenres = async() => {
        const res = await axios.get(baseURL + '/readAllGenres')
        
        const data = res.data;
        setGenres(data.message);
    }

    const LoadGames = async() => {
        const res = await axios.get(baseURL + '/readAllGames')

        const data = res.data;
        setGames(data.message);
    }

    const TestFunc = async() => {
        await axios.post(baseURL + '/newReview')
        .then(result => {
            console.log(result.data);
        })
        .catch(err => {
            console.log(err.response.data.message);
        });
    }

  const addNewGame = async () => {
    if (selectedGameName !== '' && selectedGamePrice !== '') {
      const new_game = {
        genre: selectedGenre,
        name: selectedGameName,
        price: selectedGamePrice,
        description: selectedDescription,
        image: selectedGameImage,
      };

      await axios
        .post(baseURL + '/createGame', new_game)
        .then((result) => {
          toast.success('Game was created');
          console.log(result.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });

        setSelectedGameName('');
        setSelectedGamePrice('');
        setSelectedDescription('');
        setSelectedGameImage('');
    } else {
      toast.error('Game name and price are require');
    }
  };
    

    const createGnere = async() => {
        try{
            const genreName = "Horror";
            const res = axios.get(baseURL + "/createGenre")
            console.log(res);
        } catch (error) {
            console.error(error.response.data);
        }
    }

    return (
    <Container>
        <ToastContainer/>

        <Row style={{marginTop:100}}>
            <Col xl={3} xs={12}>
                <Form>
                    <Form.Select>
                        <option>
                            Select Genre
                        </option>
                        {
                            genres.length > 0 && genres.map((genre) => (
                                <option value={genre._id} onChange={(e) => {setSelectedGenre(e.target.value)}}>{genre.genreName}</option>
                            ))
                        }
                    </Form.Select>
                    <p>{selectedGenre}</p>
                    <Form.Control type="text" value={selectedGameName} onChange={(e) => {setSelectedGameName(e.target.value)}} placeholder='Game name' style={{marginTop:10}}/>
                    <Form.Control type="text" value={selectedGamePrice} onChange={(e) => {setSelectedGamePrice(e.target.value)}} placeholder='Game price' style={{marginTop:10}}/>
                    <Form.Control type="text" value={selectedDescription} onChange={(e) => {setSelectedDescription(e.target.value)}} placeholder='Game description' style={{marginTop:10}}/>
                    <Form.Control type="text" value={selectedGameImage} onChange={(e) => {setSelectedGameImage(e.target.value)}} placeholder='Game image' style={{marginTop:10}}/>
                    <Button onClick={addNewGame} variant='info' style={{marginTop:10, width: '100%'}}>ADD NEW GAME</Button>
                </Form>

            </Col>

        </Row>
        <Row style={{marginTop:10}}>
            <div className='cards'>
                {
                    games.length > 0 && games.map((game) => (

                        <GameItem name={game.name} price={game.price} image={game.image}/>
                    ))
                }
            </div>

        </Row>
    </Container>
    )
}
