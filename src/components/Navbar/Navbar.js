import { Container } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
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
                            <NavLink to="/" activeClassName="active">All</NavLink>
                        </li>
                        <li>
                            <NavLink to="/comic" activeClassName="active">Comics</NavLink>
                        </li>
                        <li>
                            <NavLink to="/magazine" activeClassName="active">Magazine</NavLink>
                        </li>
                        <li>
                            <NavLink to="/digital-comic" activeClassName="active">Digital comic</NavLink>
                        </li>
                    </ul>
                </nav>
            </Container>
        </div>
    )
}

export default Navbar;