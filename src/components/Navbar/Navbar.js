import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">All</Link>
                    <Link to="/comic">Comics</Link>
                    <Link to="/magazine">Magazine</Link>
                    <Link to="/digital">Digital comic</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;