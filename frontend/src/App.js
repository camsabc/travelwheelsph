import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import Promos from './pages/Promos'
import Inquiry from './pages/Inquiry';
import Homepage from './pages/Homepage';
import ServicesMain from './pages/ServicesMain';
import Profile from './pages/Profile';

import FlightsDetails from './components/FlightsDetails';
import HotelDetails from './components/HotelDetails';
import PassportDetails from './components/PassportDetails';
import VisaDetails from './components/VisaDetails';
import MiceDetails from './components/MiceDetails';
import CarDetails from './components/CarDetails';
import Educ1 from './components/Educ1';
/* Import statement for pages */
import Home from './pages/Home'
import UpcomingBooking from './pages/UpcomingBooking';
import DetailsBooking from './pages/DetailsBooking';
import Services from './pages/Services';
import DetailsRide from './pages/DetailsRide';
import Admin from './pages/Admin';
import Quotation from './pages/Quotation';
import DetailsQuotation from './pages/DetailsQuotation';
import SignUp from './pages/SignUp';
import DetailsOneEduc from './pages/DetailsOneEduc';
import DetailsBookingEduc from './pages/DetailsBookingEduc';
import DetailsQuotationEduc from './pages/DetailsQuotationEduc';

import Login3 from './pages/Login3';
import DetailsDomPack from './pages/DetailsDomPack';
import DetailsIntPackOne from './pages/DetailsIntPackOne';
import DetailsIntPackTwo from './pages/DetailsIntPackTwo';




import ServicesGuest from './pages/guestPages/ServicesGuest';
import ServicesRideGuest from './pages/guestPages/ServicesRideGuest';
import ServicesEducGuest from './pages/guestPages/ServicesEducGuest';
import ServicesPackGuest from './pages/guestPages/ServicesPackGuest';
import HomepageUser from './pages/HomepageUser';

import Otp from './pages/Otp';
import Forgot from './pages/Forgot';
import OtpRequest from './pages/OtpRequest';
import ChangePass from './pages/ChangePass';

import EditProfile from './pages/EditProfile';
import FeedbackGuest from './pages/guestPages/FeedbackGuest';
import Feedback from './pages/Feedback';
import PaymentConfirmation from './pages/PaymentConfirmation';

import RequestQuotation from './pages/RequestQuotation';
import TermsAndConditions from './pages/TermsAndConditions';
import TermsAndConditionsVisa from './pages/TermsAndConditionsVisa';
import FAQ from './pages/FAQ';
import FAQGuest from './pages/guestPages/FAQGuest';
import PromosGuest from './pages/guestPages/PromosGuest';
import InquiryGuest from './pages/guestPages/InquiryGuest';
import ChangeEmailOtp from './pages/ChangeEmailOtp';


import AboutUsGuest from './pages/guestPages/AboutUsGuest';


import GlobalStyle from './GlobalStyle';
import DetailsDomPackGuest from './pages/guestPages/DetailsDomPackGuest';
import DetailsIntPackGuest from './pages/guestPages/DetailsIntPackOneGuest';
import TermsAndConditionsGuest from './pages/guestPages/TermsAndConditionsGuest';

import InquiryList from './pages/InquiryList';
import DetailsPromos from './pages/DetailsPromos';
import AboutUs from './pages/AboutUs';



import DetailsHotelGuest from './pages/guestPages/DetailsHotelGuest';
import DetailsPassportGuest from './pages/guestPages/DetailsPassportGuest';
import DetailsFlightGuest from './pages/guestPages/DetailsFlightGuest';
import DetailsRideGuest from './pages/guestPages/DetailsRideGuest';
import DetailsTransferGuest from './pages/guestPages/DetailsTransferGuest';
import DetailsVisaGuest from './pages/guestPages/DetailsVisaGuest';
import DetailsInsuranceGuest from './pages/guestPages/DetailsInsuranceGuest';
import DetailsMiceGuest from './pages/guestPages/DetailsMiceGuest';
import DetailsOneEducGuest from './pages/guestPages/DetailsOneEducGuest';
import DetailsQuotationEducGuest from './pages/guestPages/DetailsQuotationEduc';
import DetailsIntPackOneGuest from './pages/guestPages/DetailsIntPackOneGuest';
import DetailsIntPackTwoGuest from './pages/guestPages/DetailsIntPackTwoGuest';
import DestinationForm from './pages/DestinationForm';
import DestinationFormGuest from './pages/guestPages/DestinationFormGuest';





function App() {
  return (
    <div className="App">
        <GlobalStyle />
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/services" element={<ServicesMain/>}/>
              {/* <Route path="/Profile" element={<Profile/>}/> */}
              <Route path="/services-guest" element={<ServicesGuest/>}/>
              <Route path="/services-ride-guest" element={<ServicesRideGuest/>}/>
              <Route path="/services-educ-guest" element={<ServicesEducGuest/>}/>
              <Route path="/services-pack-guest" element={<ServicesPackGuest/>}/>

              <Route path="/promos" element={<Promos/>}/>
              <Route path="/inquiry" element={<Inquiry/>}/>

              <Route path="/flight" element={<FlightsDetails/>}/>
              <Route path="/hotel" element={<HotelDetails/>}/>
              <Route path="/passport" element={<PassportDetails/>}/>
              <Route path="/visa" element={<VisaDetails/>}/>
              <Route path="/mice" element={<MiceDetails/>}/>
              <Route path="/car" element={<CarDetails/>}/>


              <Route path="/login" element={<Login3/>}/>
              <Route path="/signup" element={<SignUp/>}/>

              <Route path="/profile" element={<Profile />} />
              <Route path="/upcoming-booking" element={<UpcomingBooking />} />
              <Route path="/quotation" element={<Quotation />} />
              <Route path="/details-booking" element={<DetailsBooking />} /> admin
              <Route path="/details-quotation" element={<DetailsQuotation />} /> admin
              <Route path="/services-portal" element={<Services />} />
              <Route path="/ride/:id" element={<DetailsRide />} />
              <Route path="/educ/:id" element={<DetailsOneEduc />} />
              <Route path="/educ-bookings/:id" element={<DetailsBookingEduc />} />
              <Route path="/educ-quotations/:id" element={<DetailsQuotationEduc />} />

              <Route path="/pack-dom/:id" element={<DetailsDomPack />} />

              <Route path="/pack-int/:id" element={<DetailsIntPackOne />} />
              <Route path="/pack-int-two/:id" element={<DetailsIntPackTwo />} />

              <Route path="/admin" element={<Admin />} />


              <Route path="/home-user" element={<HomepageUser />} />

              <Route path="/otp" element={<Otp/>}/>
              <Route path="/otp-request" element={<OtpRequest/>}/>
              <Route path="/forgot" element={<Forgot/>}/>
              <Route path="/change-pass" element={<ChangePass/>}/>

              <Route path="/payment-confirmation" element={<PaymentConfirmation/>}/>
              <Route path="/edit-profile" element={<EditProfile/>}/>
              <Route path="/feedback" element={<Feedback/>}/>
              <Route path="/feedback-guest" element={<FeedbackGuest/>}/>

              <Route path="/payment-confirmation" element={<PaymentConfirmation/>}/>

              <Route path="/request-quotation" element={<RequestQuotation/>}/>
              <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
              <Route path="/terms-and-conditions-visa" element={<TermsAndConditionsVisa/>}/>
              <Route path="/faq" element={<FAQ/>}/>

              <Route path="/faq-guest" element={<FAQGuest/>}/>
              <Route path="/promos-guest" element={<PromosGuest/>}/>
              <Route path="/inquiry-guest" element={<InquiryGuest/>}/>

              <Route path="/change-email-otp" element={<ChangeEmailOtp/>}/>

              <Route path="/about-us-guest" element={<AboutUsGuest/>}/>
              <Route path="/about-us" element={<AboutUs/>}/>


              <Route path="/pack-dom-guest/:id" element={<DetailsDomPackGuest/>} />
              <Route path="/pack-int-guest/:id" element={<DetailsIntPackOneGuest/>} />
              <Route path="/pack-int-two-guest/:id" element={<DetailsIntPackTwoGuest/>} />

              <Route path="/terms-and-conditions-guest" element={<TermsAndConditionsGuest/>} />

              <Route path="/inquiry-list" element={<InquiryList/>}/>
              <Route path="/promo/:id" element={<DetailsPromos/>}/>

              <Route path="/hotel-guest" element={<DetailsHotelGuest/>}/>
              <Route path="/passport-guest" element={<DetailsPassportGuest/>}/>
              <Route path="/flight-guest" element={<DetailsFlightGuest/>}/>
              <Route path="/ride-guest/:id" element={<DetailsRideGuest />} />
              <Route path="/transfer-guest" element={<DetailsTransferGuest />} />
              <Route path="/visa-guest" element={<DetailsVisaGuest />} />
              <Route path="/insurance-guest" element={<DetailsInsuranceGuest />} />
              <Route path="/mice-guest" element={<DetailsMiceGuest />} />
              <Route path="/educ-guest/:id" element={<DetailsOneEducGuest />} />
              <Route path="/educ-quotations-guest/:id" element={<DetailsQuotationEducGuest />} />

              <Route path="/destination-form" element={<DestinationForm />} />
              <Route path="/destination-form-guest" element={<DestinationFormGuest />} />




            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
