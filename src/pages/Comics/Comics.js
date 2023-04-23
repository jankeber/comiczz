import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Comic from '../../components/Comic/Comic';
import axios from 'axios';

const Comics = (props) => {
    const [comics, setComics] = useState([]);
    const [filteredComics, setFilteredComics] = useState([]);
    const params = useParams();
    const routeID = params.category;
    const location = useLocation();

    useEffect(() => {
        console.log('route change');
        console.log(location);
        filterComics();
    }, [location]);

    useEffect(() => {
        filterComics();
    }, [comics]);

    useEffect(() => {
        console.log('initial render');

        axios.get()
        .then(res => {
            console.log(res);
        })

        setComics([
            {
                id: 1,
                name: 'comic 1',
                price: 5,
                category: 'comic'
            },
            {
                id: 2,
                name: 'comic 2',
                price: 2,
                category: 'magazine'
            },
            {
                id: 3,
                name: 'comic 3',
                price: 3,
                category: 'digital'
            }
        ]);

        if(routeID) {
            console.log('filter');
            filterComics();
        } else {
            console.log('ROUTE ID NOT SET!');
        }
    }, []);

    const filterComics = () => {
        console.log(comics);
        const filtered = comics.filter((comic) => {
            return comic.category === routeID;
        })

        console.log(filtered);

        setFilteredComics(filtered);
    }

    const renderComics = () => {
        if(filteredComics.length > 0) {
            return (
                filteredComics.map((comic) => {
                    return (
                        <Comic key={comic.id} name={comic.name} price={comic.price} category={comic.category} />
                    )
                })
            )
        } else {
            return (
                comics.map((comic) => {
                    return (
                        <Comic key={comic.id} name={comic.name} price={comic.price} category={comic.category} />
                    )
                })
            )
        }
        
    }

    return (
        <>
            {renderComics()}
        </>
    )
}

export default Comics;