import { Button, Card } from "@mui/material";
import React from "react";
import './Comic.scss';

const Comic = React.forwardRef((props, ref) => {
    return (
        <div className="comic" ref={ref}>
            <img src={props.thumbnail.path + '/portrait_fantastic.jpg'}></img>
            <h1>{props.title}</h1>
            <p>{props.price} €</p>
            <Button onClick={() => props.openModal(props.id)} variant="text" className="load-more">More info</Button>
        </div>
    )
})

export default Comic;