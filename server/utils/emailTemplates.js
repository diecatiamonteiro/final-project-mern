//! User emails ----------------------------------------------------------------------------------------------->

/**
 * @desc  Email sent to the registered user to verify their account
 */

export const verificationEmail = (verificationLink) => `
  <h1>Welcome to The Greenroom!</h1>
  <p>Please click the link below to verify your email:</p>
  <a href="${verificationLink}">Verify Email</a>
  <p>This link will expire in 24 hours.</p>
`;

//! Booking emails -------------------------------------------------------------------------------------------->

/**
 * @desc  Email sent to the user who was requested for a booking with all details
 */

export const bookingRequestEmail = (
  senderName,
  receiverName,
  performanceDate
) => `
  <h1>New Booking Request from ${senderName}</h1>
  <p>Hello ${receiverName},</p>
  <p>You have received a new booking request for ${new Date(
    performanceDate
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}.</p>
  <p>Please log in to The Greenroom to accept or decline this request.</p>
  <p>Thank you for using The Greenroom!</p>
`;

/**
 * @desc  Email sent to the user who was requested for a booking regarding date modification on pending booking
 */

export const bookingDateUpdateEmail = (
  senderName,
  receiverName,
  performanceDate
) => `
  <h1>Booking Date Updated</h1>
  <p>Hello ${receiverName},</p>
  <p>${senderName} has updated their booking request to ${new Date(
  performanceDate
).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}.</p>
  <p>Please log in to The Greenroom to accept or decline this updated request.</p>
  <p>Thank you for using The Greenroom!</p>
`;

/**
 * @desc  Email sent to the user who initiated a booking to confirm its acceptance
 */

export const bookingAcceptanceEmail = (
  senderName,
  receiverName,
  performanceDate
) => `
  <h1>Booking Request Accepted</h1>
  <p>Hello ${receiverName},</p>
  <p>${senderName} has accepted your booking request for ${new Date(
  performanceDate
).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}.</p>
  <p>You can now communicate directly with ${senderName} through The Greenroom messaging system.</p>
  <p>Thank you for using The Greenroom!</p>
`;

/**
 * @desc  Email sent to the user who initiated a booking to notify them it was declined
 */

export const bookingDeclineEmail = (
  senderName,
  receiverName,
  performanceDate
) => `
  <h1>Booking Request Declined</h1>
  <p>Hello ${receiverName},</p>
  <p>${senderName} has declined your booking request for ${new Date(
  performanceDate
).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}.</p>
  <p>The date remains available for other bookings.</p>
  <p>Thank you for using The Greenroom!</p>
`;

/**
 * @desc  Email sent to the user to notify them booking was cancelled by other party
 */

export const bookingCancelEmail = (
  senderName,
  receiverName,
  performanceDate
) => `
  <h1>Booking Cancelled</h1>
  <p>Hello ${receiverName},</p>
  <p>${senderName} has cancelled the booking scheduled for ${new Date(
  performanceDate
).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}.</p>
  <p>The date is now available again for other bookings.</p>
  <p>Thank you for using The Greenroom!</p>
`;

//! User-to-user communication emails ----------------------------------------------------------------------->

/**
 * @desc  Email template for user-to-user communication after booking acceptance
 */

export const userMessageEmail = (
  senderName,
  receiverName,
  performanceDate,
  subject,
  message
) => `
  <h1>Message from ${senderName}</h1>
  <p>Hello ${receiverName},</p>
  <p>Regarding your booking for ${new Date(performanceDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )}</p>
  <h2>Subject: ${subject}</h2>
  <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
    ${message}
  </div>
  <p>You can reply to this email directly or log in to The Greenroom to send a message.</p>
  <p>Thank you for using The Greenroom!</p>
`;
