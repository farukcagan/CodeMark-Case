import { Link, useNavigate } from 'react-router-dom';


function CustomNavbar() {

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">

                <div className="" id="navbarNav">
                    <ul className="navbar-nav">
                      
                        <li className="nav-item">
                            <Link to="/users" className="nav-link fw-bolder">User Page</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/todos" className="nav-link fw-bolder">Todo Page</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <li className="nav-link fw-bolder" onClick={handleLogOut}>Çıkış Yap</li>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default CustomNavbar;
