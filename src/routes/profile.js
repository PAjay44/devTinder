const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validationEditProfileData } = require("../utils/validation");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch('/profile/edit', userAuth, async (req,res) => {

    try{
        if(!validationEditProfileData(req)){
            throw new Error ('Invalid Edit Request')
        }

        const loggedInUser = req.user;// this req user coming from while we login, check the auth validation

        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key])// It loop every key in req body and that keys shoulds equal to loggedInUser
        await loggedInUser.save(); 
        res.json( {message: `${loggedInUser.firstName}, your Profile updated successfully`, data: loggedInUser})
    }
    catch(err){
        res.status(400).send('ERROR: ' + err.message)
    }
})

profileRouter.patch('/profile/update-password', userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // Step 1: Validate that new password and confirm password match
        if (newPassword !== confirmPassword) {
            throw new Error('New password and confirm password do not match');
        }

        // Step 2: Validate new password complexity (optional)
        if (newPassword.length < 8) {
            throw new Error('New password must be at least 8 characters long');
        }

        // Step 3: Get the logged-in user from req.user (the authenticated user)
        const loggedInUser = req.user;

        // Step 4: Verify if the old password is correct (compare the old password to the stored hashed password)
        const isMatch = await bcrypt.compare(oldPassword, loggedInUser.password);
        if (!isMatch) {
            throw new Error('Old password is incorrect');
        }

        // Step 5: Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Step 6: Update the user's password with the new hashed password
        loggedInUser.password = hashedPassword;

        // Save the updated user document
        await loggedInUser.save();

        // Step 7: Respond to the user with a success message
        res.json({ message: 'Your password has been updated successfully' });
    } catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
});

module.exports = profileRouter;

