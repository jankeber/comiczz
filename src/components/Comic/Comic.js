import { Button, Card } from "@mui/material";
import './Comic.scss';

const Comic = (props) => {
    return (
        <div className="comic">
            <img src={props.thumbnail.path + '/portrait_fantastic.jpg'}></img>
            <h1>{props.title}</h1>
            <p>{props.price} €</p>
            <Button onClick={() => props.openModal(props.id)} variant="text" className="load-more">More info</Button>
        </div>
    )
}

export default Comic;