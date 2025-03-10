# The Greenroom, Where Artists Meet Their Stage (MERN Stack)

## 1. Project Overview

The Greenroom is a web platform connecting artists and small venues in Berlin for performances, jam sessions, and gigs. It provides a space where musicians, comedians, poets, and other performers can showcase their work and easily find performance opportunities, while venues can discover new talent and manage their bookings efficiently.

## 2. Core Features

### User Accounts & Authentication

- User Registration & Login (Artists & Venues)
- Welcome Email upon Signup (No email verification required)
- Role Selection (Artist or Venue) upon Signup
- Guest Access (Limited Browsing, No Chat or Booking Access)

### Profile Management (Artists & Venues)

- Edit profile information (bio, media, links, dates, revenue split)
- Edit account settings (change email, update profile picture, update location)
- Change password via user dashboard
- Delete account and all associated data

### Artist and Venue Features

- Create bio and upload media and links about their work/space
- Browse venues and artists and view individual profiles
- Send & receive collaboration invitations
- Chat with venues and artists (chat is unlocked after sending/receiving an invitation)
- After chatting, venues send an offical offer to artists and artists accept/decline it
- Both receive a confirmation email is offer is accepted
- User dashboard is updated to show booked gigs
- Rate and review artists and venues

### Platform-Wide Features

- Search & filter system with text search for artist and venue names, and dropdown filters for location (neighbourhood/district), perfomance type (e.g., Music), Genres (e.g., Stand-up) and venue type (e.g., Bar)
- User dashboard (upcoming & past bookings, profile management)
- Chat system for artist-venue interactions (socket.io or notifications received in the user dashboard)
- Responsive design (accessible across devices)

### Possible Future Features

- Admin controls
- Notifications system (for new messages, invitations, and gig offers)

## 3. User Stories

Users can be artists, venues or guests.

### Artist User Stories

- As an artist, I want to register and receive a confirmation by email (welcome message only, no confirmation needed). I am redirected to homepage.
- As an artist, I want to create a profile so that I can showcase my work and attract venue opportunities.
- As an artist, I want to upload videos, photos, and links so that venues can see examples of my performances.
- As an artist, I want to browse available venues and see their listed gig dates and revenue split so that I can decide whether to apply.
- As an artist, I want to browse other artists.
- As an artist, I want to receive invitations from venues.
- As an artist, I want to send invitations to venues.
- As an artist, I want to chat with venues after sending or receiving an invitation so that I can discuss performance details like dates before making a decision. Chat is only available after sending or receiving an invitation.
- As an artist, I want to receive an official offer from the venue in the chat, suggesting the gig date, time, and agreed revenue split, so that I can review and accept or decline it directly in the chat.
- As an artist, I want to accept or decline an official offer from the venue within the chat and receive a confirmation via email with the booking details. If offer is declined, no confirmation email is sent.
- As an artist, I want to see my upcoming and past bookings in my user dashboard with the booking details.
- As an artist, I want to keep the chat open after accepting a gig so that I can coordinate performance details with the venue.
- As an artist, I want to leave reviews and ratings for venues so that others can see their performance history.
- As an artist, I want to receive feedback and ratings from venues so that I can build credibility on the platform.

### Venue User Stories

- As a venue owner, I want to register and receive a confirmation by email (welcome message only, no confirmation needed). I am redirected to homepage.
- As a venue owner, I want to create a profile so that artists can learn about my venue and available gigs.
- As a venue owner, I want to upload photos of my venue so that artists can see the performance space.
- As a venue owner, I want to define the revenue split and list general available gig dates (e.g., Fridays and Saturdays) on my profile so that artists can see detail before applying.
- As a venue owner, I want to browse available artists.
- As a venue owner, I want to receive invitations from artists.
- As a venue owner, I want to send invitations to artists.
- As a venue owner, I want to chat with artists after sending or receiving an invitation so that we can discuss performance details like dates before making a decision. Chat is only available after sending or receiving an invitation.
- As a venue owner, I want to send an official offer to an artist in the chat, confirming the gig date, time, and agreed revenue split, so that they can review and accept or decline it directly in the chat.
- As a venue owner, I want to receive a confirmation in the chat when an artist accepts or declines my offer so that I know the status of the booking.
- As a venue owner, I want to receive a confirmation email with booking details when an artist accepts an offer. If the artist declines, no confirmation email is sent.
- As a venue owner, I want to see my upcoming and past bookings in my user dashboard with the booking details.
- As a venue owner, I want to keep the chat open after confirming a booking so that I can coordinate performance details with the artist.
- As a venue owner, I want to leave reviews and ratings for artists so that others can see their performance history.
- As a venue owner, I want to receive reviews and ratings from artists so that I can build credibility on the platform.

- No unnecessary restrictions—artists and venues can freely send offers and chat.

### Guest User Stories

- As a guest, I want to see a homepage explaining how The Greenroom works so that I understand the platform's purpose before signing up.
- As a guest, I want to access the registration and login pages so that I can create an account when I'm ready.
- As a guest, I want to browse venue profiles so that I can explore potential performance spaces before signing up.
- As a guest, I want to browse artist profiles so that I can see the types of performers available on the platform.
- As a guest, I want to see a homepage explaining how The Greenroom works so that I understand the platform's purpose before signing up. Registred users can also do that.
- As a guest, I want to see venue and artist profiles so that I can get a sense of the platform without being able to send invitations/collaboration requests.

## 3. Pages in the FE

- **Register Page**: Sign up for an account
- **Login Page**: Securely log in
- **Homepage**: Browse all help requests and offer help
- **About Page**: Learn more about the project and the community
- **Venues Page**: Browse all venues available for gigs
- **Artists Page**: Browse all the artists available for performance
- **Individual Venue Page**: Venue profile with links, media, description and split revenue
- **Individual Artist Page**: Artist profile with links, media and description
- **User Dashboard**:
  - User Profile
  - Account Information
  - Upcoming and past collaborations
  - Offers received
  - Offers sent
- **Chat Page**: Artists and venues can chat and close deals
- **Not Found Page**: A 404 page for invalid URLs

## 4. Data Structure (MongoDB & Mongoose)

#### 4.1. User Collection (Manages authentication for both artists & venues)

```js
{
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["artist", "venue"], required: true }, // Defines account type
  },
{ timestamps: true }

```

#### UPDATED User Collection (Stores artist-specific data)

```js
{
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["artist", "venue"], required: true }, // Defines account type
    name: { type: String },
    description: { type: String }, // bio & description
    type: [{ type: String }], // performance & venue
    profilePicture: { type: String, default: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1700000000/default-avatar.png"}, // Default Cloudinary image
    media: [
      {
        url: { type: String }, // YouTube, Spotify, SoundCloud LINKS only
        platform: { type: String, enum: ["YouTube", "Spotify", "SoundCloud", "Other"] },
      },
    ], // for both artists & venues
    images: [{ type: String }], // Cloudinary URLs to store artist performing images
    socialLinks: [{ type: String }], // Artist's social media and portfolio
    calendar: [] // For venues only
    bookedDates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // for venues & artists?
  },
{ timestamps: true }
```

If user registers as artist, render the form wiht media; if not, with photo only.
In register controller user only email, pass & role; in the createProfile controller use the remaining collection/schema fields. Hence they are not required: true, so the user can register without filling these out.

AVAILABLE DATES COLLECTION
```js
{
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Participants
}
```


#### 4.2. Artist Collection (Stores artist-specific data)

```js
{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    bio: { type: String, required: true },
    performanceTypes: [{ type: String, required: true }],
    profilePicture: { type: String, default: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1700000000/default-avatar.png"}, // Default Cloudinary image
    media: [
      {
        url: { type: String, required: true }, // YouTube, Spotify, SoundCloud LINKS only
        platform: { type: String, enum: ["YouTube", "Spotify", "SoundCloud", "Other"] },
      },
    ],
    images: [{ type: String }], // Cloudinary URLs to store artist performing images
    socialLinks: [{ type: String }], // Artist's social media and portfolio
  },
{ timestamps: true }
```

**Create a dropdown in the FE only with the following:**

- performanceType: ["Music", "Comedy", "Poetry & Spoken Word", "Dance", "Theater", "Experimental & Visual", "Other"]

**!Use react-player library**: can automatically detect a link (YouTube, Spotify, SoundCloud, etc.) and render it as an embedded player. Alternatively, use react-embed or react-oembed-container.

#### 4.3. Venue Collection (Stores venue-specific data)

```js
{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    location: { type: String, required: true }, // address typed by user
    description: { type: String, required: true },
    venueType: { type: String, required: true },
    revenueSplit: { type: { type: String },
    profilePicture: { type: String, default: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1700000000/default-venue.png" }, // Default Cloudinary image
    images: [{ type: String }], // Photos of the venue
    socialLinks: [{ type: String }], // Artist's social media and portfolio
  },
{ timestamps: true }
```

**Create a dropdown in the FE only with the following:**

- venueType: ["Bar", "Café", "Club", "Pub", "Restaurant", "Live Music Venue", "Theater", "Art Gallery", "Community Center", "Cultural Space", "Outdoor Venue", "Concert Hall", "Jazz Club", "Underground Venue", "Co-working Space", "Bookstore", "Hotel Lounge", "Rooftop Venue", "Pop-up Space", "Other",]
- revenueSplit: ["100% to Artist", "80/20 (Artist/Venue)", "70/30 (Artist/Venue)", "50/50", "Other"]

#### 4.4. Message Collection (Stores chat messages & offers)

```js
{
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    messages: [{ type: String }], // Normal message flow content
    messageType: { type: String, enum: ["text", "offer"], default: "text" }, // Regular message or an offer
    offers: {},
    gigDate: { type: Date }, // Only for offer messages
    revenueSplit: { type: String }, // Only for offer messages
    offerStatus: { type: String, enum: ["pending", "accepted"], default: "pending" }, // Tracks accepted offers (when rejected, offer remain in chat but is not stored as rejected in the DB)
    createdAt: { type: Date, default: Date.now },
  }
```

#### 4.5. Booking Collection (Stores only confirmed bookings, i.e. accepted offers in the chat)

```js
 {
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gigDate: { type: Date, required: true },
    revenueSplit: { type: String, required: true }, // from Message model (message.revenueSplit)
    createdAt: { type: Date, default: Date.now },
  }
```

## 5. Backend API Design (Express & MongoDB)

#### 5.1. User Routes (`/users`)

| Method | Endpoint        | Description                                                 | Logged in User? |
| ------ | --------------- | ----------------------------------------------------------- | --------------- |
| POST   | `/register`     | Create a new user                                           | ❌ No           |
| POST   | `/login`        | Authenticate user & return JWT token                        | ❌ No           |
| POST   | `/login/google` | Authenticate user & return JWT token (registration & login) | ❌ No           |
| GET    | `/logout`       | Log out user                                                | ✅ Yes          |
| GET    | `/data`         | Fetch logged-in user data ????                              | ✅ Yes          |
| PATCH  | `/update`       | Update user data                                            | ✅ Yes          |
| DELETE | `/delete`       | Delete user account and all related data                    | ✅ Yes          |

#### 5.2. Artist Routes (`/artists`)

| Method | Endpoint       | Description                            | Logged in User? |
| ------ | -------------- | -------------------------------------- | --------------- |
| GET    | `/`            | Display all artists on artists page    | ❌ No           |
| GET    | `/:id`         | Display individual artist profile page | ❌ No           |
| GET    | `/my-requests` | Fetch all requests from logged-in user | ✅ Yes          |
| POST   | `/`            | Create a new help request              | ✅ Yes          |
| PATCH  | `/:id`         | Request creator edits their request    | ✅ Yes          |
| DELETE | `/:id`         | Request creator deletes their request  | ✅ Yes          |

#### 5.3. Venue Routes (`/venues`)

| Method | Endpoint           | Description                                 | Logged in User? |
| ------ | ------------------ | ------------------------------------------- | --------------- |
| GET    | `/my-offers`       | Fetch all offers from logged-in user        | ✅ Yes          |
| POST   | `/:requestId`      | Post an offer on a request                  | ✅ Yes          |
| GET    | `/:requestId`      | Fetch all offers for a specific request     | ✅ Yes          |
| DELETE | `/cancel/:offerId` | User cancels own offers                     | ✅ Yes          |
| DELETE | `/reject/:offerId` | User rejects offers from other users        | ✅ Yes          |
| PATCH  | `/accept/:offerId` | Request owner accepts an offer              | ✅ Yes          |
| PATCH  | `/:offerId`        | Offer owner edits their offer (NOT APPLIED) | ✅ Yes          |

#### 5.4. Message Routes (`/messages`)

| Method | Endpoint           | Description                                 | Logged in User? |
| ------ | ------------------ | ------------------------------------------- | --------------- |
| GET    | `/my-offers`       | Fetch all offers from logged-in user        | ✅ Yes          |
| POST   | `/:requestId`      | Post an offer on a request                  | ✅ Yes          |
| GET    | `/:requestId`      | Fetch all offers for a specific request     | ✅ Yes          |
| DELETE | `/cancel/:offerId` | User cancels own offers                     | ✅ Yes          |
| DELETE | `/reject/:offerId` | User rejects offers from other users        | ✅ Yes          |
| PATCH  | `/accept/:offerId` | Request owner accepts an offer              | ✅ Yes          |
| PATCH  | `/:offerId`        | Offer owner edits their offer (NOT APPLIED) | ✅ Yes          |

#### 5.5. Booking Routes (`/bookings`)

| Method | Endpoint           | Description                                 | Logged in User? |
| ------ | ------------------ | ------------------------------------------- | --------------- |
| GET    | `/my-offers`       | Fetch all offers from logged-in user        | ✅ Yes          |
| POST   | `/:requestId`      | Post an offer on a request                  | ✅ Yes          |
| GET    | `/:requestId`      | Fetch all offers for a specific request     | ✅ Yes          |
| DELETE | `/cancel/:offerId` | User cancels own offers                     | ✅ Yes          |
| DELETE | `/reject/:offerId` | User rejects offers from other users        | ✅ Yes          |
| PATCH  | `/accept/:offerId` | Request owner accepts an offer              | ✅ Yes          |
| PATCH  | `/:offerId`        | Offer owner edits their offer (NOT APPLIED) | ✅ Yes          |

## 6. User Journey

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

## 6. Permissions

| Action                               | Unregistered User | Registered User            |
| ------------------------------------ | ----------------- | -------------------------- |
| Browse help requests in the homepage | ✅ Yes            | ✅ Yes                     |
| Register                             | ✅ Yes            | ❌ No (already registered) |
| Login                                | ❌ No             | ✅ Yes                     |
| Ask for help (post a request)        | ❌ No             | ✅ Yes                     |
| Offer help on a request              | ❌ No             | ✅ Yes                     |
| Securely logout                      | ❌ No             | ✅ Yes                     |
| Edit and delete requests             | ❌ No             | ✅ Yes                     |
| Refuse/cancel an offer               | ❌ No             | ✅ Yes                     |
| Edit user data                       | ❌ No             | ✅ Yes                     |
| Delete account                       | ❌ No             | ✅ Yes                     |

## 7. Frontend Structure

#### Pages

| Page             | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| `Register.jsx`   | Create an account                                                            |
| `Login.jsx`      | Securely log in                                                              |
| `Homepage.jsx`   | Browse help requests & "Need Help?" button                                   |
| `AskForHelp.jsx` | Post a help request                                                          |
| `About.jsx`      | About the project and the community                                          |
| `MyAccount.jsx`  | User dashboard (see/edit/delete requests, offers, user data, & user account) |
| `NotFound.jsx`   | A 404 page for invalid URLs                                                  |

#### State Management (Context API & Reducers)

- Users (`usersReducer.js`)
- Requests (`requestsReducer.js`)
- Offers (`offersReducer.js`)
- These are managed in `Context.jsx` to provide a **global state**.

## 8. Getting Started

1. Clone the repository:

```bash
git clone git@github.com:diecatiamonteiro/neighbourhood-helper-fullstack-mern.git
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
