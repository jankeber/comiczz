import { Card } from "@mui/material";
import './Comic.scss';

const Comic = (props) => {
    return (
        <Card className="comic" variant="outlined">
            <img src={props.thumbnail.path + '/portrait_fantastic.jpg'}></img>
            <h1>{props.title}</h1>
            <p>{props.price}</p>
        </Card>
    )
}

export default Comic;