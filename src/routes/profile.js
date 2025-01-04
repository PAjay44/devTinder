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
;

module.exports = profileRouter;

