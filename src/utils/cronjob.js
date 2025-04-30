// const cron = require("node-cron");
// const { subDays, startOfDay, endOfDay } = require("date-fns");
// const sendEmail = require("./sendEmail");
// const ConnectionRequestModel = require("../models/connectionRequest");

// // This job will run at 8 AM in the morning everyday
// cron.schedule("0 8 * * *", async () => {
//   // Send emails to all people who got requests the previous day
//   try {
//     const yesterday = subDays(new Date(), 1);

//     const yesterdayStart = startOfDay(yesterday);
//     const yesterdayEnd = endOfDay(yesterday);

//     const pendingRequests = await ConnectionRequestModel.find({ // filter pending request in connectionRequestModel who sent request interested
//       status: "interested",
//       createdAt: {
//         $gte: yesterdayStart,
//         $lt: yesterdayEnd,
//       },
//     }).populate("fromUserId toUserId");

//     const listOfEmails = [
//       ...new Set(pendingRequests.map((req) => req.toUserId.emailId)), // Out of all requests I need toUserId
//     ];

//     console.log(listOfEmails);

//     for (const email of listOfEmails) { // loop through  each mail in listOfEmails and send emails
//       // Send Emails
//       // suppose if there laks of emails it is tuff to loop and send email
//       // for that we have to create a Queue(use bee queue) and send inside all mails into the queue and send emails in batches wise to the users
//       // or use aws ses bulk email sending
//       try {
//         const res = await sendEmail.run(
//           "New Friend Requests pending for " + email,
//           "Ther eare so many frined reuests pending, please login to DevTinder.in and accept or reject the reqyests."
//         );
//         console.log(res);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   }
// });