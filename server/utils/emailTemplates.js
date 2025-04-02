const baseEmailTemplate = (content) => `
  <div style="
    font-family: 'Helvetica', 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    color: #0A0A0A;
    background-color:rgb(233, 233, 233);
  ">
  <header style="
    text-align: center;
    margin-bottom: 20px;
  ">
    <img src="${
      process.env.EMAIL_LOGO_URL
    }" alt="The Greenroom Logo" style="width: 70px; align-self: center;">
  </header>
  
    ${content}

    <hr style="
      border: none;
      border-top: 1px solid #c5c5c5;
      margin: 40px 0 20px;
    "/>
    <footer style="
      text-align: center;
      color: #888888;
      font-size: 14px;
    ">
     <a href="https://thegreenroom.com" style="margin: 0 0; color: #059669; text-decoration: none; hover: scale-105;">The Greenroom &#8599;</a>
      <p style="margin: 0 0;">Berlin, Germany</p>
      <p style="margin: 10px 0 5px; font-size: 12px; color: #888888;">
        © ${new Date().getFullYear()} The Greenroom. All rights reserved.
      </p>
    </footer>
  </div>
`;

const styles = {
  heading: `
    color: #0A0A0A;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  `,
  subheading: `
    color: #0A0A0A;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
    border: none;
    border-bottom: 1px solid #c5c5c5;
    text-align: left;
  `,
  paragraph: `
    color: #333333;
    font-size: 16px;
    line-height: 1.5;
    margin: 10px 0;
    text-align: center;
  `,
  button: `
    display: inline-block;
    background-color: #059669;
    color: #ffffff;
    padding: 12px 25px;
    text-decoration: none;
    border-radius: 24px;
    margin: 15px 0;
    font-weight: 500;
    font-size: 15px;
    transition: background-color 0.2s;
  `,
  messageBox: `
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 5px;
    margin: 20px 0;
    border-left: 4px solid #059669;
    text-align: left;
  `,
};

//! User emails ----------------------------------------------------------------------------------------------->

/**
 * @desc  Email sent to the registered user to verify their account
 */

export const verificationEmail = (verificationLink) =>
  baseEmailTemplate(`
  <h1 style="${styles.heading}">Welcome to The Greenroom!</h1>
  <p style="${styles.paragraph}">Thank you for joining our community of artists and venues across Germany.</p>
  <p style="${styles.paragraph}">Please verify your email address by clicking the button below:</p>
  <div style="text-align: center;">
    <a href="${verificationLink}" style="${styles.button}">
      Verify Email
    </a>
  </div>
  <p style="${styles.paragraph}">This link will expire in 24 hours.</p>
  <p style="${styles.paragraph}">If you didn't create an account with The Greenroom, please ignore this email.</p>
`);

/**
 * @desc  Email sent to user with password reset link
 */
export const passwordResetEmail = (resetLink) =>
  baseEmailTemplate(`
    <h1 style="${styles.heading}">Reset Your Password</h1>
    <p style="${styles.paragraph}">Click the button below to reset your password.</p>
    <div style="text-align: center;">
      <a href="${resetLink}" style="${styles.button}">
        Reset Password
      </a>
    </div>
    <p style="${styles.paragraph}">This link will expire in 24 hours.</p>
    <p style="${styles.paragraph}">If you didn't request this, please ignore this email.</p>
`);

//! Booking emails -------------------------------------------------------------------------------------------->

/**
 * @desc  Email sent to the user who was requested for a booking with all details
 */

export const bookingRequestEmail = (
  senderName,
  receiverName,
  performanceDate
) => `
  <h1 style="${styles.heading}">New Booking Request from ${senderName}</h1>
  <p style="${styles.paragraph}">Hello ${receiverName},</p>
  <p style="${
    styles.paragraph
  }">You have received a new booking request for ${new Date(
  performanceDate
).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}.</p>
  <p style="${
    styles.paragraph
  }">Please <span style="font-weight: bold;">log in to The Greenroom</span> to accept or decline this request. You can find the request in your <span style="font-weight: bold;">Received Bookings</span> section in My Greenroom.</p>
  <p style="${styles.paragraph}">Thank you for using The Greenroom!</p>
`;

/**
 * @desc  Email sent to the user who was requested for a booking regarding date modification on pending booking
 */

export const bookingDateUpdateEmail = (
  senderName,
  receiverName,
  performanceDate
) => `
  <h1 style="${styles.heading}">Booking Date Updated by ${senderName}</h1>
  <p style="${styles.paragraph}">Hello ${receiverName},</p>
  <p style="${
    styles.paragraph
  }">${senderName} has updated their booking request date to ${new Date(
  performanceDate
).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}.</p>
  <p style="${
    styles.paragraph
  }">Please <span style="font-weight: bold;">log in to The Greenroom</span> to accept or decline this updated request. You can find the updated request date in your <span style="font-weight: bold;">Received Bookings</span> section in My Greenroom.</p>
  <p style="${styles.paragraph}">Thank you for using The Greenroom!</p>
`;

/**
 * @desc  Email sent to the user who initiated a booking to confirm its acceptance
 */

export const bookingAcceptanceEmail = (
  senderName,
  receiverName,
  performanceDate
) => `
  <h1 style="${
    styles.heading
  }">Your Booking Request to ${senderName} was Accepted</h1>
  <p style="${styles.paragraph}">Hello ${receiverName},</p>
  <p style="${
    styles.paragraph
  }">${senderName} has accepted your booking request for ${new Date(
  performanceDate
).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}.</p>
  <p style="${
    styles.paragraph
  }">Please <span style="font-weight: bold;">log in to The Greenroom</span> and go to the <span style="font-weight: bold;">My Gigs</span> section to see your confirmed booking.</p>
  <p style="${styles.paragraph}">Thank you for using The Greenroom!</p>
`;

/**
 * @desc  Email sent to the user who initiated a booking to notify them it was declined
 */

export const bookingDeclineEmail = (
  senderName,
  receiverName,
  performanceDate
) => `
  <h1 style="${
    styles.heading
  }">Your Booking Request to ${senderName} was Declined</h1>
  <p style="${styles.paragraph}">Hello ${receiverName},</p>
  <p style="${
    styles.paragraph
  }">${senderName} has declined your booking request for ${new Date(
  performanceDate
).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}.</p>
  <p style="${
    styles.paragraph
  }">The date is now available again for other bookings. You will no longer find this booking in the <span style="font-weight: bold;">Received Bookings</span> section.</p>
  <p style="${styles.paragraph}">Thank you for using The Greenroom!</p>
`;

/**
 * @desc  Email sent to the user to notify them booking was cancelled by other party
 */

export const bookingCancelEmail = (
  senderName,
  receiverName,
  performanceDate
) => `
  <h1 style="${styles.heading}">Your Gig with ${senderName} was Cancelled</h1>
  <p style="${styles.paragraph}">Hello ${receiverName},</p>
  <p style="${
    styles.paragraph
  }">${senderName} has cancelled the gig scheduled for ${new Date(
  performanceDate
).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}.</p>
  <p style="${
    styles.paragraph
  }">The date is now available again for other bookings. You will no longer find this gig in your <span style="font-weight: bold;">My Gigs</span> section.</p>
  <p style="${styles.paragraph}">Thank you for using The Greenroom!</p>
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
  <h1 style="${styles.heading}">Message from ${senderName}</h1>
  <p style="${styles.paragraph}">Hello ${receiverName},</p>
  <p style="${styles.paragraph}">Regarding your booking for ${new Date(
  performanceDate
).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}</p>
  <div style="display: flex; flex-direction: column; align-items: start; text-align: left; background-color: #f5f5f5; padding: 20px; border: 1px solid rgb(48, 48, 48); border-radius: 10px; margin: 20px 0;">
    <h2 style="${styles.subheading}">Subject: ${subject}</h2>
    <p style="${styles.paragraph}">${message}</p>
  </div>
  <p style="${styles.paragraph}">You can reply to this email directly.</p>
  <p style="${styles.paragraph}">Thank you for using The Greenroom!</p>
`;
