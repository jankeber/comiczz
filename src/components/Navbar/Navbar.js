import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import './Navbar.scss';
import Logo from '../../assets/logo.svg';

function Navbar() {
    return (
        <div className="header">
            <Container className="header-container" maxWidth="xl">
                <img src={Logo}></img>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">All</Link>
                        </li>
                        <li>
                            <Link to="/comic">Comics</Link>
                        </li>
                        <li>
                            <Link to="/magazine">Magazine</Link>
                        </li>
                        <li>
                            <Link to="/digital">Digital comic</Link>
                        </li>
                    </ul>
                </nav>
            </Container>
        </div>
    )
}

export default Navbar;