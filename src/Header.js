import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {


    return (
        <div>

            <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light site-navbar-target">
                <div class="container">
                    <Link to="/" class="navbar-brand fs-2 fw-bold">React</Link>

                    <button class="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="oi oi-menu"></span> Menu
                    </button>

                    <div class="f">
                        <ul class="navbar-nav">
                            <li class="nav-item "><Link to="/" class="nav-link">Home</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Header;
