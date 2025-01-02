const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    // user who authenticated only make this api call
    // userAuth middelware is the loggdInuser right,So you will get loggedInUser from req.user
    // :status in api , getting dynamically intrested or ignore
    // This api check only either be Intrested nor Ignored you cannot accepted by the toUser ,So for that we have to write api validation also.
    // And we have to write logic for once request sent from fromUser to toUser, you cannot send request to that same user again once it exists in DB.
    // And also toUser also not send accepted request back

    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      const toUser = await User.findById(toUserId); // checking whether toUser is present in User Database then only we make request connection
      // otherwise some one can send request to random user ,DB will be polluted
      if (!toUser) {
        return res.status(400).send({ message: "User not found" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId }, // checking both are exist in ConnectionRequest Database
          { fromUserId: toUserId, toUserId: fromUserId }, // checking fromUser present in toUser and toUser will present fromUser
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already exist" });
      }

      const connectionRequest = new ConnectionRequest({
        // created new Instance of connection request based on connectionRequestSchema and save the data into Database
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName + ' is ' + status + ' in ' + toUser.firstName,
        data,
      }); // success msg and If you want data return back
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
