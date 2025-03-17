export const verificationEmail = (verificationLink) => `
  <h1>Welcome to The Greenroom!</h1>
  <p>Please click the link below to verify your email:</p>
  <a href="${verificationLink}">Verify Email</a>
  <p>This link will expire in 24 hours.</p>
`;

export const bookingAcceptanceEmail = (bookingDetails) => `
  <h1>Booking Acceptance</h1>
  <p>Your booking has been accepted!</p>
  <p>Go to My Gigs to see more details.</p>
`;
