import React from 'react';
import { MDBFooter, MDBContainer, MDBCol, MDBRow} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Footer = () => {


    return (
        <div>

            <MDBFooter className='bg-dark text-white mt-5'>
                <MDBContainer className='p-4'>
                    <MDBRow>
                        <MDBCol lg="6" md="12" className='mb-4 mb-md-0 '>
                            <h4 className='mb-3'>Company</h4>

                            <p>
                                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </p>
                        </MDBCol>

                        <MDBCol md="" className='mb-4 mb-md-0'>
                            <h4 className='mb-3'>Useful Links</h4>
        
                            <div className='row'>
                                <div className='col'>
                                    <ul className='list-unstyled mb-0'>
                                        <li><Link to="/" className='nav-link fw-bold'>Home</Link></li>
                                        <li><Link to="/" className='nav-link fw-bold'>About</Link></li>
                                        <li><Link to="/" className='nav-link fw-bold'>Service</Link></li>
                                        <li><Link to="/" className='nav-link fw-bold'>Blog</Link></li>
                                        <li><Link to="/" className='nav-link fw-bold'>Contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </MDBCol>

                        <MDBCol lg="3" md="6" className='mb-4 mb-md-0'>
                            <h4 className='mb-3'>Contact Us</h4>

                            <p>
                                A108 Adam Street <br />
                                New York, NY 535022<br />
                                United States <br /><br />
                                <strong>Phone:</strong> +1 5589 55488 55<br />
                                <strong>Email:</strong> info@example.com<br />
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2020 Copyright :
                    <Link className='text-white ms-2' to='https://mdbootstrap.com/'>
                        MDBootstrap.com
                    </Link>
                </div>
            </MDBFooter>

        </div>
    );
}

export default Footer;
