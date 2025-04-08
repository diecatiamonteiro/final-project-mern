# The Greenroom, Where Artists Meet Their Stage (MERN Stack)

## 1. Project Overview

The Greenroom is a web platform connecting artists and small venues in Germany for performances, jam sessions, and gigs. It provides a space where musicians, comedians, poets, and other performers can showcase their work and easily find performance opportunities, while venues can discover new talent and manage their bookings efficiently.

## 2. Core Features

### User Accounts & Authentication

- User Registration & Login (Artists & venues)
- Welcome Email upon Signup (email verification required)
- Role Selection (Artist or venue) upon Signup
- Guest Access (Limited browsing, no booking access or chat/contact)

### Profile Management in User Dashboard (Artists & Venues)

- Edit account settings (first name, last name, email)
- Change password
- Delete account and all associated data
- Edit profile information (description, media, photos, revenue split, etc.)
- Set own available dates on calendar and see booked dates

### Artist and Venue Features

- Create bio and upload media and photos about their work/space
- Browse venues and artists and view individual profiles
- Set own available dates in dashboard
- Check availability and book an artist or venue via calendar on individual profile pages (both artists and venues can do this)
- Request a booking (both artists and venues can do this)
- Receive a booking (both artists and venues can do this)
- Received and made bookings are stored under My Bookings in the user dashboard
- Booking dates can be edited by the user who initated it until booking is accepted from the receiver
- Once booking is accepted by the other party, the booking moves from My Bookings to My Gigs
- When a booking is declined by the other party, an email is sent to the other party and removed from user dashboard (kept in DB)
- When a booking is cancelled by the other party, an email is sent to the other party and removed from user dashboard (kept in DB)

### Platform-Wide Features

- Search & filter system with text search for artist and venue names, and dropdown filters for location (neighbourhood/district), perfomance type (e.g., Band) and venue type (e.g., Bar)
- User dashboard (upcoming & past bookings, profile and user data management)
- Contact user via email form or social links
- Responsive design (accessible across devices)

### Possible Future Features

- Admin controls
- Notifications system (for status of received & sent bookings and gigs)
- Review and rating system
- Preview and then publish profile in the user dashboard
- Expand artist type to include comedians, poets, dancers, etc.

## 3. User Stories

Users can be artists, venues or guests.

### Artist User Stories

- As an artist, I want to register and receive a verification email. I am redirected to homepage.
- As an artist, I want to be able to change my password using a verification link in my email that redirects me to user dashboard with the open change password modal.
- As an artist, I want to create a profile so that I can showcase my work and attract venues.
- As an artist, I want to upload links and photos to my profile so that venues can see examples of my performances.
- As an artist, I want to be able to set my availability in my calendar in the user dashboard.
- As an artist, I want to browse all venues and see their available gig dates and revenue split so that I can decide whether to make a booking.
- As an artist, I want to browse other artists.
- As an artist, I want to receive bookings from venues via my booking calendar on my profile page.
- As an artist, I want to book venues via the venue's booking calendar on their profile page.
- As an artist, I want to see my received and sent bookings in my user dashboard with the booking details (name, profile picture, link to profile, date, revenue split).
- As an artist, I want to be able to edit the booking date I requested before the booking is accepted by the other party.
- As an artist, I want to be able to accept or decline received bookings, and an email will be sent to the other party in both cases.
- As an artist, I want to contact the venue via an email form once booking is confirmed. Users can always access each other's social media.
- As an artist, I want to see my accepted bookings stored under "My Gigs" in the user dashboard.
- As an artist, I want to be able to cancel accepted bookings, and an email will be sent to the other party.
- As an artist, I want to favourite artists and venues.

### Venue User Stories

- As a venue, I want to register and receive a verification email. I am redirected to homepage.
- As a venue, I want to be able to change my password using a verification link in my email that redirects me to user dashboard with the open change password modal.
- As a venue, I want to create a profile so that artists can learn about my venue and available gig dates.
- As a venue, I want to upload photos of my venue so that artists can see the performance space.
- As a venue, I want to be able to set my availability in my calendar in the user dashboard.
- As a venue, I want to define the revenue split on my profile.
- As a venue, I want to browse all artists and see their available gig dates and music so that I can decide whether to make a booking.
- As a venue, I want to browse other venues.
- As a venue, I want to receive bookings from artists via my booking calendar on my profile page.
- As a venue, I want to book artists via the artist's booking calendar on their profile page.
- As a venue, I want to see my received and sent bookings in my user dashboard with the booking details (name, profile picture, link to profile, date, revenue split).
- As a venue, I want to be able to edit the booking date I requested before the booking is accepted by the other party.
- As a venue, I want to be able to accept or decline received bookings, and an email will be sent to the other party in both cases.
- As a venue, I want to contact the artist via an email form once booking is confirmed. Users can always access each other's social media.
- As a venue, I want to see my accepted bookings stored under "My Gigs" in the user dashboard.
- As a venue, I want to be able to cancel accepted bookings, and an email will be sent to the other party.
- As a venue, I want to favourite artists and venues.

### Guest User Stories

- As a guest, I want to see a homepage explaining how The Greenroom works so that I understand the platform's purpose before signing up. Registered users can also see this.
- As a guest, I want to access the registration and login pages so that I can create an account when I'm ready.
- As a guest, I want to browse all venues so that I can explore potential performance spaces before signing up.
- As a guest, I want to browse all artists so that I can see the types of performers available on the platform.
- As a guest, I want to see individual venue and artist profiles so that I can get a sense of the platform. I cannot make bookings nor email artists/venues but I can see their social media links.

## 3. Pages in the FE

- **Register Page**: Sign up for an account
- **Login Page**: Securely log in
- **Homepage**: Explain how platform works and have a glimpse of what users can
  - **My Account**: Profile type, first name, last name, email, password. Ability to edit all data, change password and delete account.
  - **My Profile**: Artistic name/venue name, description, profile picture, performance type, genre, images, social links, media links, and calendar availability. Address, revenue split, opening times and performing times for venues only. Ability to edit all data.
  - **My Bookings**: Received bookings (to accept or decline) & sent bookings (with option to edit booking date, only enabled until booking is accepted). If accepted, booking moves to My Gigs and an email is sent to the other party. If declined, booking is removed from dashboard but remains in DB (soft delete) and an email is sent to the other party.
  - **My Gigs** - Gig cards with option to message other party via email form or to cancel. If cancelled, booking is removed from dashboard but remains in DB (soft delete) and an email is sent to the other party.
- **Not Found Page**: A 404 page for invalid URLs

## 4. Data Structure (MongoDB & Mongoose)

#### 4.1. User Collection (Stores user data for both artists and venues)

```js
{
    // Registration
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["artist", "venue"], required: true }, // Defines account type
    isConfirmed: {type: Boolean, default: false} // Email verification

    // Profile
    name: { type: String }, // artisticName for artists & venue name for venues
    description: { type: String }, // Bio for artists & description for venues
    type: [{ type: String }], // Performance type for artists & venue type for venues

    // additionalInfo for venue or artist only
    additionalInfo: {
      //Venue only:
    address: {
      streetName: { type: String },
      number: { type: String },
      zipCode: { type: String },
      city: { type: String }
    },
    revenueSplit: { type: String },
    openingTimes: [{ type: String }],
    performingTimes: [{ type: String }],
    // Artist only:
    genre: [{type: String}]
  },

    // Media
    profilePicture: { type: String, default: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1700000000/default-avatar.png"}, // Default Cloudinary image
    media: [{ url: { type: String }, platform: { type: String}}], // YouTube for artists & venues. Spotify and SoundCloud for artists only
    images: [{ type: String }], // Cloudinary URLs to store images
    socialLinks: [{ type: String }], // Social media and portfolio links

    // Mark own availability
    availability: [{ type: Date }],  // Dates the user has marked as available in their availability calendar

    // Bookings
    bookingsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    bookingsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],

    // Favourites
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},
{ timestamps: true }
```

#### 4.2. Booking Collection (Stores booking data between artists and venues)

```js
{
  // Venue or artist who makes the request booking
  initiatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Venue or artist who receives the request booking
  receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  performanceDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined', 'cancelled'], default: 'pending' },
  statusUpdatedAt: { type: Date, default: Date.now },
  isCancelledOrDeclined: { type: Boolean, default: false }, // Soft deleted from DB (not deleted from DB but does not appear in the FE)
},
{ timestamps: true };
```

---

FE will check: If a date is in availability, it's clickable (open for booking).
Once booked, the date is removed from availability and stored in the Booking model.

#### How the Booking Flow Works

1. User Requests a Booking
2. A booking is created with status: "pending".
3. The requested date is still available in the calendar.

#### User Accepts a Booking

1. The booking status updates from "pending" → "confirmed".
2. FE now blocks that date in the calendar.
3. Other pending requests for the same date are still visible but won't block the date.

#### User Declines a Booking

1. The booking status updates to "declined".
2. The date remains available.

#### User Cancels a Confirmed Booking

1. The booking status updates to "cancelled".
2. FE removes the date from blocked dates, making it available again.

---

## 5. Backend API Design (Express & MongoDB)

#### 5.1. Auth Routes (`/api/auth`)

| Method | Endpoint           | Description                                                                           | Logged in User? |
| ------ | ------------------ | ------------------------------------------------------------------------------------- | --------------- |
| POST   | `/register`        | Register a new user as an artist or venue                                             | ❌ No           |
| GET    | `/verify-email`    | User verifies email and is sent to log in page                                        | ❌ No           |
| POST   | `/login`           | Authenticate user & return JWT token                                                  | ❌ No           |
| POST   | `/login/google`    | Authenticate user & return JWT token (registration & login)                           | ❌ No           |
| GET    | `/logout`          | Log out user                                                                          | ✅ Yes          |
| GET    | `/user-data`       | Fetch logged-in user data                                                             | ✅ Yes          |
| PATCH  | `/update-account`  | Update user auth data                                                                 | ✅ Yes          |
| PATCH  | `/change-password` | User clicks change password, is sent an email and redirected to change password modal | ✅ Yes          |
| DELETE | `/delete-account`  | Delete user account and all related data                                              | ✅ Yes          |
| POST   | `/forgot-password` | User clicks forgot password, is sent an                                               | ❌ No           |
| POST   | `/reset-password`  | User clicks reset password, is sent an                                                | ✅ Yes          |

#### 5.2. User Routes: Artists & Venues (`api/users`)

| Method | Endpoint                     | Description                                                                             | Logged in User? |
| ------ | ---------------------------- | --------------------------------------------------------------------------------------- | --------------- |
| GET    | `/venues`                    | Display all venues on venues page                                                       | ❌ No           |
| GET    | `/artists`                   | Display all artists on artists page                                                     | ❌ No           |
| GET    | `/:id`                       | Get specific artist/venue profile                                                       | ❌ No           |
| ------ | ---------------------------- | --------------------------------------------------------------------------------------- | --------------- |
| PATCH  | `/:id/update-profile`        | Update an existing artist/venue profile (includes everything profile related)           | ✅ Yes          |
| DELETE | `/:id/delete-media/:mediaId` | Delete individual media link                                                            | ✅ Yes          |
| DELETE | `/:id/delete-image/:imageId` | Delete individual image                                                                 | ✅ Yes          |
| ------ | ---------------------------- | --------------------------------------------------------------------------------------- | --------------- |
| POST   | `/favourites`                | Add artist/venue to favourites                                                          | ✅ Yes          |
| DELETE | `/favourites/:id`            | Remove artist/venue from favourites                                                     | ✅ Yes          |
| GET    | `/favourites`                | Display all favourited artists/venues                                                   | ✅ Yes          |
| ------ | ---------------------------- | --------------------------------------------------------------------------------------- | --------------- |
| GET    | `/:id/bookings`              | Get all received & sent bookings of a user                                              | ✅ Yes          |
| GET    | `/:id/bookings/received`     | Get only received bookings of a user                                                    | ✅ Yes          |
| GET    | `/:id/bookings/sent`         | Get only sent bookings of a user                                                        | ✅ Yes          |
| ------ | ---------------------------- | --------------------------------------------------------------------------------------- | --------------- |
| GET    | `/search?q=searchTerm`       | Search artists/venues by name, performance/venue type, artist genre, location           | ✅ Yes          |

#### 5.3. Booking Routes (`api/bookings`)

| Method | Endpoint       | Description                                                      | Logged in User? |
| ------ | -------------- | ---------------------------------------------------------------- | --------------- |
| POST   | `/`            | Artist requests a venue or venue requests an artist              | ✅ Yes          |
| GET    | `/:id`         | Get a specific booking                                           | ✅ Yes          |
| PATCH  | `/:id/edit`    | Modify booking date (only enabled until booking accepted)        | ✅ Yes          |
| PATCH  | `/:id/accept`  | Accept booking request and notify other party (automatic email)  | ✅ Yes          |
| PATCH  | `/:id/decline` | Decline request and notify other party (automatic email)         | ✅ Yes          |
| PATCH  | `/:id/cancel`  | Cancel accepted booking and notify other party (automatic email) | ✅ Yes          |
| GET    | `/accepted`    | Get all accepted bookings (under My Gigs)                        | ✅ Yes          |

#### 5.4 Email Routes (`api/email`)

| Method | Endpoint | Description                                          | Logged in User? |
| ------ | -------- | ---------------------------------------------------- | --------------- |
| POST   | `/`      | Send message via email form once booking is accepted | ✅ Yes          |

---

### Steps for auth / user controller

Step 1: Registration (POST /api/auth/register)

Creates a user only with auth-related fields (email, password, role).
Other fields remain empty or undefined until the user creates their profile.

Step 2: Profile Creation (POST /api/users/:id/create-profile)

Updates the existing user with profile details (name, bio, media, availability, etc.).
Does not modify email, password, or role.

## 6. Backend Middleware

| Page              | Description                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `checkToken.js`   | Validates user identity and ensures that only authenticated users can access protected routes |
| `errorHandler.js` | Global error handler & 404 route not found                                                    |
| `checkUploads.js` | Checks link origin for media and social links and converts media to embed                     |

## 7. User Journey

#### 🎭 User Registration & Authentication Flow

📌 **User registers (with email verification)**

1. User clicks "Register".
2. Selects role: Artist or Venue.
3. Fills out the form (email, password, first name, last name).
4. Clicks "Create Account".
5. Account is created in "isConfirmed: false" state.
6. Verification email is sent with a unique link.
7. User is NOT automatically logged in.
8. Sees message on register page: "Please check your email to verify your account before logging in."

📌 **User verifies email after registration**

1. User opens the email.
2. Clicks the verification link.
3. Redirected to verification page (loading state).
4. Once verification is complete, automatically redirected to login page with an added message on top: "Your email has been successfully verified. Please log in to continue."
5. User manually enters credentials & logs in.
6. Account is now marked as "isConfirmed: true" in the database.

📌 **User tries to log in without verifying email**

1. User goes to the login page.
2. Enters email & password.
3. Clicks "Login".
4. Sees error message: "Please verify your email before logging in."
5. Can request resend verification email.

📌 **User is logged in and changes password in dashboard**

1. User logs in and navigates to Dashboard > My Account.
2. Clicks "Change Password".
3. Backend generates a one-time secure link with a token.
4. Email is sent and sees a message: "For security reasons, we have sent you an email with a link to change your password."
5. User receives an email with a "Change Password" button.
6. Clicks the link → Redirected to Dashboard page with an open change password modal.
7. Enters New Password & Confirm Password.
8. Clicks "Save New Password" and password is updated.
9. User is logged out. Previous session is invalidated (logs out from all devices).
10. User logs in manually again.

📌 **User is logged out and forgets password**

1. User clicks "Forgot Password?" on the login page.
2. Enters their email address.
3. Clicks "Send Reset Link".
4. Receives an email with a unique link.
5. Clicks the link and is redirected to the login page with a added message on top: "Your password has been successfully changed. Please log in to continue."
6. Enters a new password and clicks "Save New Password".
7. Sees confirmation message:"Your password has been updated. Please log in."
8. User logs in manually.

📌 **User logs in after verifying account**

1. User clicks "Log In".
2. Enters email & password.
3. Clicks "Login".
4. Redirected to the homepage.
5. Can now access their dashboard.

📌 **User deletes account**

1. User navigates to Dashboard > My Account.
2. Clicks "Delete Account".
3. Sees confirmation modal.
4. Clicks "Confirm Delete".
5. Account is deleted & user is logged out.

#### Profile Management Flow

📌 **User creates or updates profile**

1. Navigates to Dashboard > My Profile.
2. Fills out profile fields:
   - Name (artist name/venue name)
   - Bio/Description
   - Profile Picture
   - **For venues**: Revenue split, opening times, address
   - Media links (YouTube, Spotify, etc.)
   - Images (venue photos, artist performances)
   - Social media links
3. Clicks "Save Changes".
4. Success message appears.
5. Profile is updated.

📌 **User sets availability (calendar)**

1. Navigates to Dashboard > My Profile.
2. Clicks on the availability calendar.
3. Selects available dates.
4. Clicks "Save".
5. Success toast appears.
6. Available dates are saved and can now be booked.

#### Booking Flow

📌 **Artist/venue initiates booking**

1. User navigates to an artist or venue profile.
2. Selects an available date from the calendar.
3. Clicks "Request Booking".
4. Clicks "Send Request".
5. Success toast appears.
6. Pending booking is created and added to Dashboard > My Bookings > Sent Bookings.
7. The other party receives an email.

📌 **Artist/venue who initiated booking edits a pending booking**

1. User navigates to Dashboard > My Bookings > Sent Bookings.
2. Clicks "Edit Date".
3. Modal appears and user selects another available date from the calendar.
4. Clicks "Confirm".
5. Success toast appears.
6. Pending booking is updated and awaits confirmation from the other party.
7. The other party receives an email and the booking is updated in their user dashboard.

📌 **Other party confirms booking**

1. User navigates to Dashboard > My Bookings > Received Bookings.
2. Sees pending booking request.
3. Clicks "Accept".
4. Success toast appears.
5. Booking status updates to "accepted".
6. An email confirmation is sent to the other party.
7. The booked date is removed from availability.
8. Booking moves from "My Bookings" to "My Gigs".
9. Messaging (email form - nodemailer) is now enabled.

📌 **Other party declines booking**

1. User navigates to Dashboard > My Bookings > Received Bookings.
2. Sees pending booking request.
3. Clicks "Decline".
4. Success toast appears.
5. Booking status updates to "declined".
6. An email is sent to the other party.
7. The booking disappears from the dashboard (soft delete).
8. The requested date remains available.

📌 **User cancels an accepted booking**

1. User navigates to Dashboard > My Gigs.
2. Clicks "Cancel Gig".
3. Sees confirmation modal.
4. Clicks "Cancel Gig".
5. Success toast appears.
6. Booking status updates to "cancelled".
7. The booking disappears from the dashboard (soft delete).
8. The date becomes available again in the calendar.
9. An email is sent to the other party.

#### Search & Browse Flow

📌 **User searches for artists or venues**

1. Navigates to "Artists" or "Venues" page.
2. Can browse all artists and venues (pagination)
3. Can use the search bar to type a name.
4. Can use filters (performance type/venue type, artist genre, venue location, revenue split) to refine search.
5. Clicks "Search Venues" or "Search Artists".
6. Sees filtered results.
7. Clicks on a profile to view more details.

📌 **Guest browsing**

1. Navigates to homepage.
2. Reads how The Greenroom works.
3. Clicks on "Browse Artists" or "Browse Venues".
4. Can view profiles, including:
   - Name
   - Description
   - Photos
   - Social media links
   - Media links (YouTube, SoundCloud, etc.)
   - Revenue split, opening hours, performance times (for venues)
   - Availability calendar (but cannot book)
5. Cannot book Artist/Venue or contact them via email form.
6. When tries to book, a toast appears asking guest user to log in to make a booking.
7. When tries to favourite, a toast appears asking guest user to log in to add a favourite.

#### Favourites Flow

📌 **User favourites an artist/venue**

1. Navigates to Find Artists or Find Venues page, or individual artist/venue page.
2. Clicks heart icon.
3. Success toast appears.
4. The favourite is saved.
5. Navigates to Favourites page.
6. Sees list of saved artists and venues.

📌 **User removes a favourite**

1. Navigates to Favourites page.
2. Clicks the "X" button on an artist/venue.
3. Success toast appears.
4. Artist/venue is removed from favourites.

#### Communication Flow

📌 **User contacts another user**

1. Once a booking is accepted, user navigates to My Gigs and can contact other party via an email form.
2. User clicks "Message".
3. A modal pops up with subject and message inputs.
4. Writes a message in a form with pre-filled sender and receiver emails.
5. Clicks "Send Message".
6. The other party receives an email and can reply directly.

#### Error & Edge Case Flow

📌 **User tries to book a date that was taken**

1. User navigates to an artist or venue profile.
2. Tries to select a date that was booked by someone else, button is faded and unclickable.
3. Selects a new date & reattempts booking.

📌 **User tries to book without a profile**

1. User logs in but hasn't completed their profile.
2. Tries to book an artist/venue.
3. Sees error message: "Please complete your profile before making a booking." (middleware to check for profile completion)
4. Redirected to Dashboard > My Profile.

## 8. Permissions

| Action                                          | Unregistered User (Guest) | Registered User (Artist/Venue) |
| ----------------------------------------------- | ------------------------- | ------------------------------ |
| Browse homepage (see how it works)              | ✅ Yes                    | ✅ Yes                         |
| Register                                        | ✅ Yes                    | ❌ No (already registered)     |
| Login                                           | ❌ No                     | ✅ Yes                         |
| Browse venues & artists                         | ✅ Yes                    | ✅ Yes                         |
| View artist profiles                            | ✅ Yes                    | ✅ Yes                         |
| View venue profiles                             | ✅ Yes                    | ✅ Yes                         |
| See social media links                          | ✅ Yes                    | ✅ Yes                         |
| View available gig dates & revenue split        | ✅ Yes                    | ✅ Yes                         |
| Create a profile (after registering)            | ❌ No                     | ✅ Yes                         |
| Edit profile (bio, media, availability, images) | ❌ No                     | ✅ Yes                         |
| Set & update availability calendar              | ❌ No                     | ✅ Yes                         |
| Upload media (links, photos, profile picture)   | ❌ No                     | ✅ Yes                         |
| Send a booking request                          | ❌ No                     | ✅ Yes                         |
| Modify a booking request before acceptance      | ❌ No                     | ✅ Yes                         |
| Accept or decline a booking                     | ❌ No                     | ✅ Yes                         |
| Cancel a confirmed booking                      | ❌ No                     | ✅ Yes                         |
| View received & sent bookings in dashboard      | ❌ No                     | ✅ Yes                         |
| See accepted bookings ("My Gigs")               | ❌ No                     | ✅ Yes                         |
| Contact a venue/artist via email form           | ❌ No                     | ✅ Yes                         |
| Favorite artists & venues                       | ❌ No                     | ✅ Yes                         |
| Delete account                                  | ❌ No                     | ✅ Yes                         |

## 9. Frontend Structure

| Page                       | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| `RegisterPage.jsx`         | Create an account                                             |
| `VerificationPage.jsx`     | Temporary page during email verification process              |
| `LoginPage.jsx`            | Securely log in                                               |
| `Homepage.jsx`             | Overview, FAQ, how it works                                   |
| `AllVenuesPage.jsx`        | Browse all venues                                             |
| `AllArtistsPage.jsx`       | Browse all artists                                            |
| `IndividualVenuePage.jsx`  | Venue profile                                                 |
| `IndividualArtistPage.jsx` | Artist profile                                                |
| `FavouritesPage.jsx`       | Favourited artists & venues                                   |
| `UserDashboardPage.jsx`    | User dashboard (my account, my profile, my bookings, my gigs) |
| `NotFoundPage.jsx`         | A 404 page for invalid URLs                                   |

#### State Management (Context API & Reducers)

- Users (`usersReducer.js`)
- Bookings (`bookingsReducer.js`)
- These are managed in `Context.jsx` to provide a **global state**.

## 10. Branch naming

- Use **`feature/...`** if you’re adding or enhancing functionality or content.

- Use **`fix/...`** if you’re correcting a mistake.

- Use **`refactor/...`** if you’re improving structure or code without adding new functionality.

- Please add **your name** before: `catia/refactor/navbar`

#### Examples:

`evie/feature/artists-page`

`omar/fix/dashboard-user-data`

`swagatika/refactor/home-page`

## 11. Getting Started

1. Clone the repository:

```bash
git clone git@github.com:diecatiamonteiro/final-project-mern.git
```

2. Install dependencies and run the development on **`server/` (BE)**:

```bash
npm install
npm start
```

3. Install dependencies and run the development on **`client/` (FE)**:

```bash
npm install
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser **(FE)**.
