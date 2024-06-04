const mongoose = require("mongoose");
const mailSender = require("../utils/mailsender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5,
	},
});

async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(email,"Verification Email from Studemy", otp)
		console.log("Email sent Successfully: ", mailResponse);

	} catch (error) {
		console.log("Error in sending email: ", error)
		throw error;
	}
}

OTPSchema.pre("save", async function (next) {
	await sendVerificationEmail(this.email, this.otp);
	next();
})

module.exports = mongoose.model("OTP", OTPSchema);
