import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Comic from '../../components/Comic/Comic';
import axios from 'axios';
import { Container, Grid, Skeleton } from '@mui/material';

const Comics = (props) => {
    const [comics, setComics] = useState([]);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [filteredComics, setFilteredComics] = useState([]);
    const params = useParams();
    const routeID = params.category;
    const location = useLocation();

    useEffect(() => {
        console.log('initial render');

        setComics(
            [
                {
                    name: 'name 1',
                    issue: 'issue 1',
                    comment: 'comment 1'
                },
                {
                    name: 'name 2',
                    issue: 'issue 2',
                    comment: 'comment 2'
                },
                {
                    name: 'name 2',
                    issue: 'issue 2',
                    comment: 'comment 2'
                }
            ]
        );
        axios.get()
        .then(res => {
            if(res.status === 200) {
                console.log(res.data.data.results);
                setComics(res.data.data.results);
                setApiLoaded(true);
            }
            console.log(res);
        })
    }, []);

    const renderComics = () => {
        return (
            <Container>
                <Grid container spacing={2}>
                    { comics.map((comic) => {
                        console.log(comic);
                        return (
                            <Grid item xs={2}>
                                <Comic thumbnail={comic.thumbnail} images={comic.images} title={comic.title} price={comic.prices[0].price}></Comic>
                            </Grid>
                            
                        )
                    }) }
                    
                </Grid>
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