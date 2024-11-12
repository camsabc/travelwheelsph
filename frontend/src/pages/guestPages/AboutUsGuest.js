import React from 'react';
import bgImage from '../../images/bg.jpg'; // or from '/bgimage.png' if using public directory
import travelLogo from '../../images/header.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // or from '/travellogo.png' if using public directory

import './AboutUs.css'

const AboutUsGuest = () => {
  return (
    <div className="about-us-container">
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
      <div 
        className="background-image"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      <div className="content">
        <div className="logo-container">
          <img 
            src={travelLogo} 
            alt="Travel Tayo Car Rental & Tours" 
            className="logo-image" 
          />
        </div>
        
        {/* About section moved below logo-container */}
        <div className='about'>
          <h3>Travel Tayo Car Rental & Tours</h3>
          <p>
            Travel Tayo Car Rental and Tours is a private owned business, located at Unit 2, 2nd Flr, Hersyl Building, Blk 5 Lot 25 Ph4 Golden City Subdivision, Brgy. Dita, Sta Rosa, Laguna. Founded on October 2015, the company has projected revenues and started to establish its name and connections in the local market. It foresees potentials and has expanded the range of services vigorously.
          </p>
          <h3>Why Choose Us?</h3>
          <p>
            
We offer unmatched value, safety, and convenience. We prioritize top-notch customer service, cultural experiences, and safe mobility for all clients. The company is operated and managed based on the international standard environment gained from the previous companies attended by the founders, applying the quality standard of leadership, processes, strategy, resources, and people. With continuous innovation and nationwide accessibility, we guarantee every journey leaves a lasting impact, making us your ideal travel partner.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsGuest;
