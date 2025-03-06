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

### Guest User Stories

- As a guest, I want to see a homepage explaining how The Greenroom works so that I understand the platform’s purpose before signing up.
- As a guest, I want to access the registration and login pages so that I can create an account when I’m ready.
- As a guest, I want to browse venue profiles so that I can explore potential performance spaces before signing up.
- As a guest, I want to browse artist profiles so that I can see the types of performers available on the platform.
- As a guest, I want to see a homepage explaining how The Greenroom works so that I understand the platform’s purpose before signing up. Registred users can also do that.
- As a guest, I want to see venue and artist profiles so that I can get a sense of the platform without being able to send invitations/collaboration requests.

## 3. Main Pages

- **Register Page**: Sign up for an account
- **Login Page**: Securely log in
- **Homepage**: Browse all help requests and offer help
- **Ask for Help Page**: Post a help request on homepage
- **About Page**: Learn more about the project and the community
- **My Account Page (User Dashboard)**:
  - User Information
  - My Requests (requests the user has posted)
  - My Offers (requests the user has offered to help with)

## 4. Data Structure (MongoDB & Mongoose)

#### 4.1. User Collection (to store user information)

```js
{
  username: { type: String, required, unique },
  firstName: { type: String, required },
  lastName: { type: String, required },
  email: { type: String, required, unique },
  password: { type: String, required },
  zipCode: {
    type: String,
    enum: [
      "04177 Lindenau, Alt-Lindenau, Neu-Lindenau",
      "04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen",
      "04179 Leutzsch",
    ],
    required,
  },
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }], // Requests posted by the user
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }], // Offers made by the user
  offersReceived: [{ type: Schema.Types.ObjectId, ref: "Offer" }], // Offers received on user's requests
  createdAt: { type: Date, default: Date.now },
}
```

#### 4.2. Request Collection (to store help requests information)

```js
{
  userId: { type: Schema.Types.ObjectId, ref: "User" }, // Who posted it
  description: { type: String, required },
  category: {
    type: String,
    enum: [
      "Errands",
      "Groceries",
      "Transport",
      "Household",
      "Pet Care",
      "Childcare",
      "Tutoring",
      "Tech Support",
      "Moving",
    ],
    default: "Errands",
  },
  when: { type: String, required },
  status: { type: String, enum: ["open", "helped"], default: "open" },
  acceptedHelper: { type: Schema.Types.ObjectId, ref: "User" }, // Who helped (not the user who posted the request)
  receivedOffers: [{ type: Schema.Types.ObjectId, ref: "Offer" }], // Offers received on a request (not the offers made by the user)
  createdAt: { type: Date, default: Date.now },
}
```

Note: Zip Code is already set when user registers.

#### 4.3. Offer Collection (to store help offers information)

```js
{
  requestId: { type: Schema.Types.ObjectId, ref: "Request" }, // To which request
  helperId: { type: Schema.Types.ObjectId, ref: "User" }, // Who offered help
  message: { type: String, required: true },
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
| GET    | `/data`         | Fetch logged-in user data                                   | ✅ Yes          |
| PATCH  | `/update`       | Update user data                                            | ✅ Yes          |
| DELETE | `/delete`       | Delete user account and all related offers & requests.      | ✅ Yes          |

#### How will the frontend use these?

- The register & login pages will use `/register` and `/login`.
- The frontend will store the JWT token in localStorage or cookies to authenticate the user.
- After login, the app will use `GET /data` to show the logged-in user's profile or dashboard, and to keep user logged in after refreshing page.

#### 5.2. Requests Routes (`/requests`)

| Method | Endpoint       | Description                            | Logged in User? |
| ------ | -------------- | -------------------------------------- | --------------- |
| GET    | `/`            | Display all requests on homepage       | ❌ No           |
| GET    | `/:id`         | View details of a specific request     | ❌ No           |
| GET    | `/my-requests` | Fetch all requests from logged-in user | ✅ Yes          |
| POST   | `/`            | Create a new help request              | ✅ Yes          |
| PATCH  | `/:id`         | Request creator edits their request    | ✅ Yes          |
| DELETE | `/:id`         | Request creator deletes their request  | ✅ Yes          |

#### How will the frontend use these?

- The homepage (`GET /requests`) will display all requests.
- The request card (`GET /requests/:id`) will show details of a specific request.
- The create request page (`POST /requests`) will let users add a new request.
- The edit request page (`PATCH /requests/:id`) will allow modifying a request.
- A delete button (`DELETE /requests/:id`) will let users remove their request.

#### 5.3. Offers Routes (`/offers`)

| Method | Endpoint           | Description                                 | Logged in User? |
| ------ | ------------------ | ------------------------------------------- | --------------- |
| GET    | `/my-offers`       | Fetch all offers from logged-in user        | ✅ Yes          |
| POST   | `/:requestId`      | Post an offer on a request                  | ✅ Yes          |
| GET    | `/:requestId`      | Fetch all offers for a specific request     | ✅ Yes          |
| DELETE | `/cancel/:offerId` | User cancels own offers                     | ✅ Yes          |
| DELETE | `/reject/:offerId` | User rejects offers from other users        | ✅ Yes          |
| PATCH  | `/accept/:offerId` | Request owner accepts an offer              | ✅ Yes          |
| PATCH  | `/:offerId`        | Offer owner edits their offer (NOT APPLIED) | ✅ Yes          |

#### How will the frontend use these?

- On a request card, users will see a button "Offer Help" → This calls `POST /offers/:requestId`.
- The request owner can see who offered help → This uses `GET /offers/:requestId`.
- If a user wants to refuse a help offer, they will use `DELETE /offers/:offerId`.
- If a user wants to accept a help offer, they will use `PATCH /offers/:offerId`.

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
