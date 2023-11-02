import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
        <section style={{ overflowX: "hidden" }}>
            {/* contact  */}
            <div >
                <div className="d-flex flex-column text-center mb-5 pt-5">
                    <h4 className="text-warning mb-3">Contact Us</h4>
                    <h1 className="display-4 m-0 bg-info">Contact For <span className="text-danger">Any Query</span></h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 mb-5">
                        <div className="contact-form">
                            <div id="success"></div>
                            <form name="sentMessage" id="contactForm" noValidate>
                                <div className="control-group">
                                    <input type="text" className="form-control p-4 btn-outline-info border-3 " id="name" placeholder="Your Name" required="required" data-validation-required-message="Please enter your name" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <input type="email" className="form-control p-4 btn-outline-info border-3" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <input type="text" className="form-control p-4 btn-outline-info border-3" id="subject" placeholder="Subject" required="required" data-validation-required-message="Please enter a subject" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <textarea className="form-control p-4 btn-outline-info border-3" rows="6" id="message" placeholder="Message" required="required" data-validation-required-message="Please enter your message"></textarea>
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div>
                                    <button className="btn btn-primary py-3 px-5" type="submit" id="sendMessageButton">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 mb-n2 p-0" style={{ overflowX: "hidden" }}>
                        <iframe
                            style={{ width: "100%", height: "500px", border: "0" }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                            allowFullScreen
                            title="Google Maps"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* footer */}

            <div class="container-fluid bg-dark text-white py-5 px-sm-3 px-md-5">
                <div class="row pt-5">
                    <div class="col-lg-4 col-md-12 mb-5">
                        <h1 class="mb-3 display-5 text-capitalize text-white"><span class="text-primary">Pet</span>Lover</h1>
                        <p class="m-0">Being a pet lover means having a genuine passion for animals and a commitment to their well-being. It involves taking responsibility for their pets' health, safety, and happiness. Pet lovers may engage in activities like pet adoption, regular feeding, grooming, and exercise, as well as seeking veterinary care when needed. They enjoy the companionship, loyalty, and unconditional love that pets provide.</p>
                    </div>
                    <div class="col-lg-8 col-md-12">
                        <div class="row">
                            <div class="col-md-6  mb-5">
                                <h5 class="text-primary mb-4">Get In Touch</h5>
                                <p><i class="fa fa-map-marker-alt mr-2"></i>Location, City, Country</p>
                                <p><i class="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                                <p><i class="fa fa-envelope mr-2"></i>info@example.com</p>
                                <div class="d-flex justify-content-center mt-4">
                                    <a class="btn btn-outline-info rounded-circle text-center mr-2 px-0" style={{ width: "36px", height: "36px" }} href="#"><i class="fab fa-twitter"></i></a>
                                    <a class="btn btn-outline-info rounded-circle text-center ml-2 px-0" style={{ width: "36px", height: "36px", marginLeft: "12px" }} href="#"><i class="fab fa-facebook-f" ></i></a>
                                    <a class="btn btn-outline-info rounded-circle text-center ml-2 px-0" style={{ width: "36px", height: "36px", marginLeft: "12px" }} href="#"><i class="fab fa-linkedin-in" ></i></a>
                                    <a class="btn btn-outline-info rounded-circle text-center ml-2 px-0" style={{ width: "36px", height: "36px", marginLeft: "12px" }} href="#"><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div class="col-md-6 mb-5">
                                <h5 class="text-primary mb-4">Popular Links</h5>
                                <div class="d-flex flex-column justify-content-start">
                                    <Button className="btn text-danger text-white " LinkComponent={Link} to="/home" sx={{ margin: 1, color: "white", fontWeight: 400 }}>Home</Button>
                                    <Button className="btn text-white btn btn-outline-info" LinkComponent={Link} to="/petdetails" sx={{ margin: 1, color: "white", fontWeight: 400 }}>Pet Details</Button>
                                    <Button className="btn text-white " LinkComponent={Link} to="/aboutUs" sx={{ margin: 1, color: "white", fontWeight: 400 }}>About</Button>
                                    <Button className="btn text-white " LinkComponent={Link} to="/contactUs" sx={{ margin: 1, color: "white", fontWeight: 400 }}>Contact</Button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



            <div class="container-fluid text-white py-4 px-sm-3 px-md-5" style={{ background: "#111111" }}>
                <div class="row">
                    <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
                        <p class="m-0 text-white">
                            &copy; <a class="text-white font-weight-bold" href="https://freewebsitecode.com">Your Site Name</a>. All Rights Reserved.
                        </p>
                    </div>
                    <div class="col-md-6 text-center text-md-right">
                        <ul class="nav d-inline-flex">
                            <li class="nav-item">
                                <a class="nav-link text-white py-0" href="#">Privacy</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white py-0" href="#">Terms</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white py-0" href="#">FAQs</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white py-0" href="#">Help</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default ContactUs;
