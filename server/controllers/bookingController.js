const BookingModel = require('../models/Booking');

/* This function retrieves all bookings in the database */
const getAllBookings = (req, res) => {
    BookingModel.find({})
        .then(bookings => res.json(bookings))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch bookings' });
        });
};

/* This function retrieves bookings using a unique email */
const getBookingByEmail = (req, res) => {
    const email = req.params.email;

    BookingModel.find({ email })
        .then(bookings => {
            if (bookings.length === 0) {
                return res.json({ });
            }
            res.json(bookings);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch bookings by email' });
        });
};

/* This function creates a booking to be stored in the database */
const createBooking = (req, res) => {
    const {
        firstname,
        middlename,
        lastname,
        email,
        contactNumber,
        startDate,
        endDate,
        pickupLocation,
        dropOffLocation,
        airportDeparture,
        airportArrival,
        preferredHotel,
        budgetRange,
        pickuploc,
        dropoffloc,
        companyname,
        contactperson,
        companyaddress,
        numOfPerson,
        vehicleName,
        remarks,
        status,
        gender,
        civilStatus,
        birthDate,
        countryBirth,
        provinceBirth,
        municipalityBirth,  
        firstnameFather,
        middlenameFather,
        lastnameFather,
        countryCitizenshipFather,
        firstnameMother,
        middlenameMother,
        lastnameMother,
        countryCitizenshipMother,
        firstnameSpouse,
        middlenameSpouse,
        lastnameSpouse,   
        applicationType, 
        oldPassportNumber,
        dateIssued,
        issuingAuthority,
        foreignPassportHolder,
        emergencyContactPerson,
        contactNumberForeign,
        province,
        city,
        occuputation,
        officeNumber,
        officeDetails,
        fullAddress,
        landmark,
        num,
        type,
        db
    } = req.body;

    /* Generates a random nine-digit number */
    const generateRandomNumber = () => Math.floor(100000000 + Math.random() * 900000000);

    const newBooking = new BookingModel({
        firstname,
        middlename,
        lastname,
        email,
        contactNumber,
        startDate,
        endDate,
        pickupLocation,
        dropOffLocation,
        airportDeparture,
        airportArrival,
        preferredHotel,
        budgetRange,
        pickuploc,
        dropoffloc,
        companyname,
        contactperson,
        companyaddress,
        numOfPerson,
        vehicleName,
        remarks,
        status,
        gender,
        civilStatus,
        birthDate,
        countryBirth,
        provinceBirth,
        municipalityBirth,  
        firstnameFather,
        middlenameFather,
        lastnameFather,
        countryCitizenshipFather,
        firstnameMother,
        middlenameMother,
        lastnameMother,
        countryCitizenshipMother,
        firstnameSpouse,
        middlenameSpouse,
        lastnameSpouse,   
        applicationType, 
        oldPassportNumber,
        dateIssued,
        issuingAuthority,
        foreignPassportHolder,
        emergencyContactPerson,
        contactNumberForeign,
        province,
        city,
        occuputation,
        officeNumber,
        officeDetails,
        fullAddress,
        landmark,
        num: generateRandomNumber(), 
        type,
        db: 'booking'
    });

    newBooking.save()
        .then(savedBooking => res.status(201).json(savedBooking))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to create booking' });
        });
};

/* This function retrieves one booking using a unique id */
const getBookingById = (req, res) => {
    const id = req.params.id;

    BookingModel.findById(id)
        .then(booking => {
            if (!booking) {
                return res.status(404).json({ error: 'Booking not found' });
            }
            res.json(booking);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch booking by ID' });
        });
};

/* Changes the status of a particular booking using unique id */
const changeStatus = (req, res) => {
    const { bookingId, status } = req.body;

    BookingModel.findByIdAndUpdate(bookingId, { status }, { new: true })
        .then(updatedBooking => {
            if (!updatedBooking) {
                return res.status(404).json({ error: 'Booking not found' });
            }
            res.json(updatedBooking);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to change status' });
        });
};

const deleteBooking = async (req, res) => {
    try {
      const bookingId = req.params.id;  // Assuming the booking ID is passed in the URL
  
      const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);  // Use async/await here
  
      if (!deletedBooking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
      console.error('Error deleting booking:', err);
      res.status(500).json({ error: 'Failed to delete booking' });
    }
};
  
const updateNote = async (req, res) => {
    const { bookingId, note } = req.body;
  
    try {
      // Find the booking by its ID and update the note field
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { note },
        { new: true } // Return the updated document
      );
  
      if (!updatedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.json({ message: 'Note updated successfully', booking: updatedBooking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the note' });
    }
};


module.exports = {
    getAllBookings,
    getBookingByEmail,
    createBooking,
    getBookingById,
    changeStatus,
    deleteBooking,
    updateNote
};

