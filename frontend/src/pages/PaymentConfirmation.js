import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
 // Assuming you're placing styles in a separate CSS file

const PaymentConfirmation = () => {
    return (
        <div className="confirmation-container">
            <div className="headerr">
                <div className="logo-containerr">
                    <img className="l" src={process.env.PUBLIC_URL + '/travelwheelslogo.png'} alt="whale" />
                </div>

            <div className="htextdiv">
                <div className="hcontent">Services</div>
                <div className="hcontent">Promos</div>
                <div className="hcontent">Inquiry</div>
                <div className="hcontent">
                Hi! Juan <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>


            </div>
            </div>  

            <div className="confirmation-content">
                <div className="confirmation-message">
                    <div className="confirmation-icon">
                        <img src={`${process.env.PUBLIC_URL}/check.png`} alt="Checkmark" />
                    </div>
                    <h1>We’ve received your booking!</h1>
                    <p>You will receive an email confirmation about your booking soon! Thank you!</p>
                    <a href="/back" className="back-home-link">Back to Homepage</a>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmation;
