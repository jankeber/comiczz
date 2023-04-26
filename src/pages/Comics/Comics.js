import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Comic from '../../components/Comic/Comic';
import axios from 'axios';
import { Box, Button, Container, Grid, Modal, Skeleton } from '@mui/material';
import './Comics.scss';

const Comics = (props) => {
    const [comics, setComics] = useState([]);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [offset, setOffset] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const params = useParams();
    const routeID = params.category;
    const location = useLocation();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

    useEffect(() => {
        console.log('route change');
        setComics([]);
        setApiLoaded(false);

        getComics();
    }, [location]);

    const getComics = (offset = 0) => {
        let params = {}
        if(location.pathname !== '/') {
            switch(location.pathname) {
                case '/comic':
                    params.format = 'comic';
                    break;
                case '/magazine':
                    params.format = 'magazine';
                    break;
                case '/digital':
                    params.format = 'digital comic';
                    break;
            }
        }
        

        if(offset > 0) {
            params.offset = offset;
        }

        console.log(params);

        axios.get('', {
            params
        })
        .then(res => {
            if(res.status === 200) {
                setComics(current => [...current, ...res.data.data.results]);
                setApiLoaded(true);
            }
        })

    }

    const loadMore = () => {
        let newOffset = offset + 20;
        getComics(newOffset);
        setOffset(offset + 20);
    }

    const openModal = (id) => {
        const allComics = [...comics];
        const findComic = allComics.find((comic) => comic.id === id);
        console.log(findComic);
        setModalOpen(true);
    }

    const handleClose = () => {
        setModalOpen(false);
    }

    const renderComics = () => {
        return (
            <Container>
                <div className="comics">
                    { comics.map((comic) => {
                        console.log(comic);
                        return (
                            <Comic id={comic.id} thumbnail={comic.thumbnail} images={comic.images} title={comic.title} price={comic.prices[0].price} openModal={openModal}></Comic>  
                        )
                    }) }
                    
                </div>
                <Button variant="outlined" onClick={loadMore}>Text</Button>
                <Modal
                    open={modalOpen}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                    </Box>
                </Modal>
            </Container>
        )
    }

    return (
        <>
            {(apiLoaded) ? renderComics() : <>
                <Container>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Button variant="text" onClick={loadMore}>Contained</Button>
                </Container>
            </>}
        </>
    )
}

export default Comics;