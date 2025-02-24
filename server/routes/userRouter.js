/* Import statement for modules */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* Provides routing for the user functions */
router.get('/get-all-users', userController.getUsers);
router.get('/get-user/:id', userController.getUserById);
// router.post('/create-user', userController.createUser);
router.put('/edit-user/:id', userController.editUser); 

router.post('/signin', userController.signIn);
router.post('/create-staff-account', userController.createStaffAccount);
router.get('/get-user-by-email/:email', userController.getUserByEmail);
router.post('/signup', userController.newAccount);
router.get('/get-all-emails', userController.getAllEmails);
router.patch('/:id/profile-image', userController.setProfileImage);

router.delete('/delete-user', userController.deleteUser);
router.patch('/update-service-role', userController.changeServiceHandle);

module.exports = router;
