const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10;




/* This function retrieves all users in the database */
const getUsers = (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        });
};

/* This function retrieves one user using a unique id */
const getUserById = (req, res) => {
    const userId = req.params.id;

    UserModel.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch user' });
        });
};

/* This function creates a user to be stored in the database */
const newAccount = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.t_password, saltRounds);
        const newUser = { ...req.body, t_password: hashedPassword };
        const newAccount = await Travel.create(newUser);
        res.json({ newAccount, status: "successfully inserted" });
    } catch (err) {
        res.json({ message: 'Something went wrong', error: err });
    }
};

const editUser = async (req, res) => {
    const userId = req.params.id;
    const { firstname, lastname, email, phone, password, contactNumber } = req.body; 

    try {
        const updatedFields = {};

        if (firstname) updatedFields.firstname = firstname;
        if (lastname) updatedFields.lastname = lastname;
        if (email) updatedFields.email = email;
        if (phone) updatedFields.phone = phone;
        if (contactNumber) updatedFields.contactNumber = contactNumber;

     
        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updatedFields.password = hashedPassword;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};


/* This function scans databse for matching email and password */
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        /* If the user is found and the password matches, return the user data */
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to sign in' });
    }
};

/* This function retrieves one user using a unique email */
const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};



/* This function retrieves all emails in the database */
const getAllEmails = (req, res) => {
    UserModel.find({}, { email: 1, _id: 0 }) // Select only the email field, exclude _id
        .then(emails => {
            const emailList = emails.map(user => user.email); // Extract emails into a simple array
            res.json(emailList);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch emails' });
        });
};

const setProfileImage = async (req, res) => {
    const userId = req.params.id;
    const { profileImage } = req.body; 

    try {
        // Allow `null` or `""` to remove the profile image
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { profileImage: profileImage || null }, // Set `null` if empty
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Profile image updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update profile image' });
    }
};


/* This function deletes a user by their unique ID */
const deleteUser = async (req, res) => {
    const { email } = req.body;  // Expecting email in the request body

    try {
        const deletedUser = await UserModel.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

const createStaffAccount = async (req, res) => {
    try {
        const { firstname, lastname, email, password, contactNumber, serviceHandle } = req.body;

        // Check if the email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the staff user object
        const staffUser = new UserModel({
            firstname,
            lastname,
            email,
            serviceHandle,
            password: hashedPassword,
            contactNumber,
            type, 
            isVerified: true,
            accountStatus: "active",
        });

        // Save to the database
        await staffUser.save();

        res.status(201).json({ message: 'Staff account created successfully', user: staffUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create staff account' });
    }
};


/* Changes the service handle of a particular user using email as unique identifier */
const changeServiceHandle = (req, res) => {
    const { email, type } = req.body;

    console.log(email);

    UserModel.findOneAndUpdate({ email }, { type }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to change role' });
        });
};



module.exports = {
    getUsers,
    getUserById,
    editUser,
    signIn,
    getUserByEmail,
    newAccount,
    getAllEmails,
    setProfileImage,
    deleteUser,
    createStaffAccount, 
    changeServiceHandle
};

