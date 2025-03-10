Doctor Schema

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  availability: [{
    day: { type: String, required: true }, // e.g., Monday, Tuesday
    slots: [{
      startTime: { type: String, required: true }, // e.g., "09:00 AM"
      endTime: { type: String, required: true },
      isBooked: { type: B}

const bookingSchema = new mongoose.Schema({
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timeSlot: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  },
  status: { type: String, enum: ['Scheduled', 'Accepted', 'Declined', 'Completed'], default: 'Scheduled' }
}, { timestamps: true });

- add opening times only to venues
- artists/venues both have a calendar
- both can accept/reject bookings -> status: accepted/declined
- add availability to user schema
- keep user collection for both