
const express = require("express");
const router = express.Router();

router.get("/privacy-policy", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html><head><title>Privacy Policy</title></head><body>
    <h1>Privacy Policy</h1>
    <p>This is the privacy policy of DevTinder.</p>
    </body></html>
  `);
});

router.get("/terms-and-conditions", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html><head><title>Terms and Conditions</title></head><body>
    <h1>Terms and Conditions</h1>
    <p>By using DevTinder, you agree to our terms.</p>
    </body></html>
  `);
});

router.get("/cancellation-and-refund", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html><head><title>Cancellation and Refund</title></head><body>
    <h1>Cancellation and Refund</h1>
    <p>Refunds are available for accidental duplicate payments.</p>
    </body></html>
  `);
});

router.get("/shipping-and-delivery", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html><head><title>Shipping and Delivery</title></head><body>
    <h1>Shipping and Delivery</h1>
    <p>This is a digital product. No shipping required.</p>
    </body></html>
  `);
});

router.get("/contact-us", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html><head><title>Contact Us</title></head><body>
    <h1>Contact Us</h1>
    <p>Email us at <a href="mailto:support@devtinder.in">support@devtinder.in</a></p>
    </body></html>
  `);
});

module.exports = router;
