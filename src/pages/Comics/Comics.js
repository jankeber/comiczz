import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Comic from '../../components/Comic/Comic';
import axios from 'axios';
import { Box, Button, Container, Grid, Modal, Skeleton } from '@mui/material';
import './Comics.scss';

const Comics = (props) => {
    const [loading, setLoading] = useState(false);
    const [comics, setComics] = useState([]);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [offset, setOffset] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedComic, setSelectedComic] = useState({});
    const params = useParams();
    const routeID = params.category;
    const location = useLocation();

    const observer = useRef();
    const lastComicElementReference = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && entries[0].intersectionRatio < 1) {
                console.log('visible');
                loadMore();
            }
        })
        if(node) observer.current.observe(node);
    }, []);

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
        px: 2,
        pb: 2,
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
                case '/digital-comic':
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
        setSelectedComic(findComic);
        setModalOpen(true);
    }

    const handleClose = () => {
        setModalOpen(false);
    }

    const renderComics = () => {
        return (
            <Container>
                <div className="comics">
                    { comics.map((comic, index) => {
                        console.log(comic);
                        if(comics.length === index + 1) {
                            return (
                                <Comic ref={lastComicElementReference} id={comic.id} thumbnail={comic.thumbnail} images={comic.images} title={comic.title} price={comic.prices[0].price} openModal={openModal}></Comic>
                            )
                        } else {
                            return (
                                <Comic id={comic.id} thumbnail={comic.thumbnail} images={comic.images} title={comic.title} price={comic.prices[0].price} openModal={openModal}></Comic>
                            )
                        }
                        
                    }) }
                <Modal
                    open={modalOpen}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 640 }}>
                    <div className='modal-wrapper'>
                        <div className="image-wrapper">
                            <img src={selectedComic.thumbnail ? selectedComic.thumbnail.path + '/portrait_fantastic.jpg' : ''}></img>
                        </div>
                        <div className="content-wrapper">
                            <div className="content-details">
                            <h2 id="child-modal-title">{ selectedComic.title }</h2>
                            <p className="details-title">Format: <span>{selectedComic.format}</span></p>
                            {selectedComic.pageCount > 0
                             ? <p className='details-title'>Pages: <span>{selectedComic.pageCount}</span></p> : ''}

                             {Object.keys(selectedComic).length > 0 && selectedComic.characters.items.length > 0 ? 
                             
                             <>
                                <p className='details-title'>Characters: <span>{selectedComic.characters.items.slice(0, 3).map((character, index) => {
                                    return character.name + (index < 2 ? ', ' : '')
                                })}</span></p>
                             </> : ''}

                             {Object.keys(selectedComic).length > 0 && selectedComic.creators.items.length > 0 ? 
                             
                             <>
                                <p className="details-title">Creators: <span>{selectedComic.creators.items.slice(0, 3).map((creator, index) => {
                                    return creator.name + (index < 2 ? ', ' : '')
                                })}</span></p>
                             </> : ''}

                             {Object.keys(selectedComic).length > 0 && selectedComic.diamondCode ? 
                             <p className="details-title">DiamondCode: <span>{selectedComic.diamondCode}</span></p> : ''}
                            
                            </div>
                            <div className="content-footer">
                                <div className="price">
                                    {Object.keys(selectedComic).length > 0 ? <span>{Object.keys(selectedComic).length > 0 ? selectedComic.prices[0].price + '€' : 'haha'}</span> : 'haha'}
                                </div>
                                <div className="close-button">
                                    <Button variant="contained" onClick={handleClose}>Close</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Box>
                </Modal>
                </div>
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
                </Container>
            </>}
        </>
    )
}

export default Comics;