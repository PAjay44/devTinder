const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    // the data we want make connection request.
    // from userd ,to userId and status of the connection.
    // use required,without any of these connection not happended.

    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
      
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    status: {
      type: String,
      required:true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorect status type`,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
 // checking from user and toUser are same id throw error
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
