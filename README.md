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

- Edit profile information (description, media, photos, revenue split, etc.)
- Edit account settings (email, profile picture, etc.)
- Set own available dates on calendar
- Change password
- Delete account and all associated data

### Artist and Venue Features

- Create bio and upload media and photos about their work/space
- Browse venues and artists and view individual profiles
- Set own available dates on dashboard
- Check availability and book an artist or venue via calendar (both artists and venues can do this)
- Request a booking (both artists and venues can do this)
- Receive a booking (both artists and venues can do this)
- Received and made bookings are stored under My Bookings in the user dashboard
- Once booking is accepted by the other party, the booking moves from My Bookings to My Gigs
- When a booking is declined by the other party, an email is sent to both users and it is not kept in userdashboard BUT it is kept in DB
- When a booking is cancelled by the other party, an email is sent to both users and it is not kept in userdashboard BUT it is kept in DB

### Platform-Wide Features

- Search & filter system with text search for artist and venue names, and dropdown filters for location (neighbourhood/district), perfomance type (e.g., Music) and venue type (e.g., Bar)
- User dashboard (upcoming & past bookings, profile and user data management)
- Contact user feature by email or social links
- Responsive design (accessible across devices)

### Possible Future Features

- Admin controls
- Notifications system (for new messages, invitations, and gig offers)
- Review and rating system

## 3. User Stories

Users can be artists, venues or guests.

### Artist User Stories

- As an artist, I want to register and receive a verification email. I am redirected to homepage.
- As an artist, I want to be able to change my password using a verification link in my email that redirects me to user dashboard with the open change password modal.
- As an artist, I want to create a profile so that I can showcase my work and attract venue opportunities.
- As an artist, I want to upload links and photos to my profile so that venues can see examples of my performances.
- As an artist, I want to be able to set my availability in my calendar in the user dashboard.
- As an artist, I want to browse available venues and see their available gig dates and revenue split so that I can decide whether to make a booking.
- As an artist, I want to browse other artists.
- As an artist, I want to receive bookings from venues via my calendar.
- As an artist, I want to book venues via the venue's calendar.
- As an artist, I want to see my received and sent bookings in my user dashboard with the booking details (name, profile picture, link to profile, date, revenue split).
- As an artist, I want to be able to edit the booking date I requested before the booking is accepted by the other party.
- As an artist, I want to be able to accept or decline received bookings, and an email will be sent to the other party in both cases.
- As an artist, I want to contact the venue via email once booking is confirmed. Users can always access each other's social media.
- As an artist, I want to see my accepted bookings stored under "My Gigs" in the user dashboard.
- As an artist, I want to be able to cancel accepted bookings, and an email will be sent to the other party.
- As an artist, I want to favourite artists and venues.

### Venue User Stories

- As a venue owner, I want to register and receive a verification email. I am redirected to homepage.
- As an venue owner, I want to be able to change my password using a verification link in my email that redirects me to user dashboard with the open change password modal.
- As a venue owner, I want to create a profile so that artists can learn about my venue and available gigs.
- As a venue owner, I want to upload photos of my venue so that artists can see the performance space.
- As a venue owner, I want to be able to set my availability in my calendar in the user dashboard.
- As a venue owner, I want to define the revenue split on my profile.
- As a venue owner, I want to browse other venues.
- As a venue owner, I want to browse available artists.
- As a venue owner, I want to receive bookings from artists via my calendar.
- As a venue owner, I want to book artists via the artist's calendar.
- As a venue owner, I want to see my received and sent bookings in my user dashboard with the booking details (name, profile picture, link to profile, date, revenue split).
- As a venue owner, I want to be able to edit the booking date I requested before the booking is accepted by the other party.
- As a venue owner, I want to be able to accept or decline received bookings, and an email will be sent to the other party in both cases.
- As a venue owner, I want to contact the venue via email once booking is confirmed. Users can always access each other's social media.
- As a venue owner, I want to see my accepted bookings stored under "My Gigs" in the user dashboard.
- As a venue owner, I want to be able to cancel accepted bookings, and an email will be sent to the other party.
- As a venue owner, I want to favourite artists and venues.

### Guest User Stories

- As a guest, I want to see a homepage explaining how The Greenroom works so that I understand the platform's purpose before signing up. Registered users can also do that.
- As a guest, I want to access the registration and login pages so that I can create an account when I'm ready.
- As a guest, I want to browse venues so that I can explore potential performance spaces before signing up. I cannot make bookings nor email venues. But I can see their social media links.
- As a guest, I want to browse artists so that I can see the types of performers available on the platform. I cannot make bookings nor email artists. But I can see their social media links.
- As a guest, I want to see individual venue and artist profiles so that I can get a sense of the platform. I cannot make bookings nor email artists/venues. But I can see their social media links.

## 3. Pages in the FE

- **Register Page**: Sign up for an account
- **Login Page**: Securely log in
- **Homepage**: Explain how platform works and have a glimpse of what users can expect
- **All Venues Page**: Browse all venues available for gigs
- **All Artists Page**: Browse all the artists available for performance
- **Individual Venue Page**: Venue profile with name, description, venue type, media, photos, opening times, location, revenue split, social links, reviews, and calendar
- **Individual Artist Page**: Artist profile with name, bio, performance type, media, photos, social links, reviews, and calendar
- **Favourites Page**: User can view their favourite artists/venues
- **User Dashboard**:
  - **My Account**: Email, first name, last name, password. Ability to edit all data and delete account.
  - **My Profile**: Artistic name/venue name, description, profile picture, calendar availability, media links, images, and social links. Address, revenue split, opening times and performing times for venues only. Ability to edit all data.
  - **My Bookings** - Received (to accept, decline) & sent (with option to edit booking date, only enabled until booking is accepted). If accepted, booking moves to My Gigs and an email is sent to the other party. If declined, booking remains in DB but dissappears from dashboard (soft delete) and an email is sent to the other party.
  - **My Gigs** - Booking cards with option to cancel. If cancelled, booking remains in DB but dissappears from dashboard (soft delete) and an email is sent to the other party.
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
    isConfirmed: {type: Boolean, default: false} // email verification

    // Profile
    name: { type: String }, // artisticName for artists & venue name for venues
    description: { type: String }, // Bio for artists & description for venues
    type: [{ type: String }], // Performance type for artists & venue type for venues

    //Venue only
    additionalInfo: {
    address: {
      streetName: { type: String },
      number: { type: String },
      zipCode: { type: String },
      city: { type: String }
    },
    revenueSplit: { type: String },
    openingTimes: [{ type: String }],
    performingTimes: [{ type: String }],
  },

    // Media
    profilePicture: { type: String, default: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1700000000/default-avatar.png"}, // Default Cloudinary image
    media: [{ url: { type: String }, platform: { type: String}}], // For artists & venues, YouTube, Spotify, SoundCloud LINKS only
    images: [{ type: String }], // For venues & artists, Cloudinary URLs to store images
    socialLinks: [{ type: String }], // For artists' & venues' social media and portfolio

    // Mark own availability
    availability: [{ type: Date }],  // Dates the user has marked as available

    // Bookings
    bookingsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    bookingsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],

    // Favourites
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},
{ timestamps: true }
```

---

**FE suggestions:**

- If user registers as artist, render the form wiht media; if not, with photo only.
- In register controller user only needs email, pass & role; in the createProfile controller use the remaining collection/schema fields. Hence they are not required: true, so the user can register without filling these out.
- React-calendar package (check if it's free) - https://www.npmjs.com/package/react-calendar
- FE needs to visually differentiate verified and unverified social links.

**Create a dropdown in the FE only with the following:**

- performanceType: ["Music", "Comedy", "Poetry & Spoken Word", "Dance", "Theater", "Experimental & Visual", "Other"]
- venueType: ["Bar", "Café", "Club", "Pub", "Restaurant", "Live Music Venue", "Theater", "Art Gallery", "Community Center", "Cultural Space", "Outdoor Venue", "Concert Hall", "Jazz Club", "Underground Venue", "Co-working Space", "Bookstore", "Hotel Lounge", "Rooftop Venue", "Pop-up Space", "Other",]
- revenueSplit: ["100% to Artist", "80/20 (Artist/Venue)", "70/30 (Artist/Venue)", "50/50", "Other"]

**Manage source of media & social links protection in BE:**

- "YouTube", "Vimeo", "Spotify", "SoundCloud", "Apple Music", "Bandcamp", "Audiomack", "Instagram", "TikTok", "Other"

**React-player library**

- can automatically detect a link (YouTube, Spotify, SoundCloud, etc.) and render it as an embedded player. Alternatively, use react-embed or react-oembed-container.

---

#### 4.2. Booking Collection (Stores booking data between artists and venues)

```js
{
  initiatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // venue or artist who makes the request booking
  receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // venue or artist who receives the request booking
  performanceDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined', 'cancelled'], default: 'pending' },
  statusUpdatedAt: { type: Date, default: Date.now },
  isCancelledOrDeclined: { type: Boolean, default: false }, // soft deleted from DB (i.e., not deleted from DB but does not appear in the FE)
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
| PATCH  | `/change-password` | User clicks change password, is sent an email and redirected to change password modal | ❌ No           |
| DELETE | `/delete-account`  | Delete user account and all related data                                              | ✅ Yes          |

#### 5.2. User Routes: Artists & Venues (`api/users`)

| Method | Endpoint                     | Description                                                                                       | Logged in User? |
| ------ | ---------------------------- | ------------------------------------------------------------------------------------------------- | --------------- |
| GET    | `/venues`                    | Display all venues on venues page                                                                 | ❌ No           |
| GET    | `/artists`                   | Display all artists on artists page                                                               | ❌ No           |
| GET    | `/:id`                       | Get entire specific artist/venue profile (profile pic & calendar availability included)           | ❌ No           |
| ------ | ---------------------------- | ---------------------------------------------------------------------------------------           | --------------- |
| PATCH  | `/:id/update-profile`        | Updae an existing artist/venue profile (includes everything profile related)                      | ✅ Yes          |
| DELETE | `/:id/delete-media/:mediaId` | Delete individual media link                                                                      | ✅ Yes          |
| DELETE | `/:id/delete-image/:imageId` | Delete individual image                                                                           | ✅ Yes          |
| ------ | ---------------------------- | ---------------------------------------------------------------------------------------           | --------------- |
| POST   | `/favourites`                | Add artist/venue to favourites                                                                    | ✅ Yes          |
| DELETE | `/favourites/:id`            | Remove artist/venue from favourites                                                               | ✅ Yes          |
| GET    | `/favourites`                | Display all favourited artists/venues                                                             | ✅ Yes          |
| ------ | ---------------------------- | ---------------------------------------------------------------------------------------           | --------------- |
| GET    | `/:id/bookings`              | Get all received & sent bookings of a user                                                        | ✅ Yes          |
| GET    | `/:id/bookings/received`     | Get only received bookings of a user                                                              | ✅ Yes          |
| GET    | `/:id/bookings/sent`         | Get only sent bookings of a user                                                                  | ✅ Yes          |
| ------ | ---------------------------- | ---------------------------------------------------------------------------------------           | --------------- |
| GET    | `/search?q=searchTerm`       | Search artists/venues by name, performance/venue type, location (city=leipzig&revenueSplit=80/20) | ✅ Yes          |

#### 5.3. Booking Routes (`api/bookings`)

| Method | Endpoint       | Description                                                             | Logged in User? |
| ------ | -------------- | ----------------------------------------------------------------------- | --------------- |
| POST   | `/`            | Artist requests a venue or venue request an artist (updates user model) | ✅ Yes          |
| GET    | `/:id`         | Get a specific booking                                                  | ✅ Yes          |
| PATCH  | `/:id/edit`    | Modify booking date (only enabled until booking accepted)               | ✅ Yes          |
| PATCH  | `/:id/accept`  | Accept booking request and notify other party (automatic email)         | ✅ Yes          |
| PATCH  | `/:id/decline` | Decline request and notify other party (automatic email)                | ✅ Yes          |
| PATCH  | `/:id/cancel`  | Cancel accepted booking and notify other party (automatic email)        | ✅ Yes          |
| GET    | `/accepted`    | Get all accepted bookings (under My Gigs)                               | ✅ Yes          |

#### 5.4 Email Routes (`api/email`)

| Method | Endpoint | Description                                        | Logged in User? |
| ------ | -------- | -------------------------------------------------- | --------------- |
| POST   | `/`      | Send message from artist - venue or venue - artist | ✅ Yes          |

---

### Steps for auth / user controller

Step 1: Registration (POST /api/auth/register)

Creates a user only with auth-related fields (email, password, role).
Other fields remain empty or undefined until the user creates their profile.

Step 2: Profile Creation (POST /api/users/:id/create-profile)

Updates the existing user with profile details (name, bio, media, availability, etc.).
Does not modify email, password, or role.

## 6. User Journey

1. Artist/Venue initiates booking

   - Creates pending booking
   - Other party receives notification

2. Other party confirms booking

   - Booking status → 'accepted'
   - Update both users' availability
   - Add booking to both users' bookings array
   - Send confirmation emails
   - Enable messaging

3. After event
   - Booking status → 'completed'
   - Enable reviews

#### 📌 User registers

1. User creates an account.
2. Automatically logged in.
3. Redirected to the homepage (see all requests).

#### 📌 User asks for help

1. User logs in.
2. Redirected to the homepage.
3. Clicks on "Ask for Help" page.
4. Fills out a form:
   - Category (e.g., "Transport").
   - Description (details about the request).
   - When (date and time).
5. Clicks "Submit Request" → Sees success message → Request is added to the homepage.
6. Other users see the request on homepage and can offer help.

#### 📌 User offers help

1. User logs in.
2. Redirected to the homepage.
3. Clicks "Offer Help" in chosen request card.
4. Fills out a form:
   - Message.
5. Clicks "Submit Offer" → Sees success message → Offer is added to the request.
6. Button "Offer Help" turned into "Offer Sent" and no more clicks are allowed on this request.

#### 📌 User securely logs out

1. User clicks "Logout".
2. JWT token is removed from storage.
3. Redirected to homepage.

#### 📌 User views their dashboard to see and manage their requests & offers

1. User logs in.
2. Redirected to the homepage (all requests).
3. Clicks on "My Account".
4. Sees:
   - User information.
   - My Requests (requests they posted).
   - My Offers (requests they offered help on).
5. Can update their account data and delete their account.
6. Can edit or delete their own requests.
7. Can accept or decline offers on other users' requests.

#### 📌 Request owner chooses who helps them by accepting or declining help offers

1. User logs in.
2. Redirected to the homepage.
3. Clicks on and goes to "My Account" page.
4. Clicks on a request with offers.
5. Sees a list of users who offered help.
6. Clicks "Accept" on one of the offers.
7. Request is marked as "Helped" and deleted from the homepage (other users can't offer help anymore).
8. Alternatively, clicks "Reject" to reject an offer.

#### 📌 User updates their data (e.g., username, password) and deletes their account

1. User logs in.
2. Redirected to the homepage.
3. Clicks on and goes to "My Account" page.
4. Clicks on "Update Profile" and updates the names, username, email, or Zip code.
5. Clicks on "Change Password" and updates the password.
6. Alternatively, clicks "Delete Account" → Account is permanently deleted.

#### 📌 User updates or deletes own requests

1. User logs in.
2. Redirected to the homepage.
3. Clicks on and goes to "My Account" page.
4. Clicks "Edit Request" and updates the message of the request.
5. Alternatively, clicks "Delete Request" → Request is removed from homepage.
   test

## 6. Permissions

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
| Contact a venue/artist via email                | ❌ No                     | ✅ Yes                         |
| Favorite artists & venues                       | ❌ No                     | ✅ Yes                         |
| Delete account                                  | ❌ No                     | ✅ Yes                         |

## 7. Frontend Structure

| Page                       | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| `RegisterPage.jsx`         | Create an account                                             |
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

## 8. Branch naming

- Use **`feature/...`** if you’re adding or enhancing functionality or content.

- Use **`fix/...`** if you’re correcting a mistake.

- Use **`refactor/...`** if you’re improving structure or code without adding new functionality.

- Please add **your name** before: `catia/refactor/navbar`

#### Examples:

`evie/feature/artists-page`

`omar/fix/dashboard-user-data`

`swagatika/refactor/home-page`

## 9. Getting Started

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
