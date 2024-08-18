const Event = require('./../models/eventModel');
const sendEmail = require('./../utils/sendEmail');

const createEvent = async (req, res) => {
  try {
    const { message } = res;
    if (req.user === undefined) {
      return res.status(req.status).json({ message });
    }
    const { name, date, time, description } = req.body;
    const event = new Event({
      name,
      date,
      time,
      description,
      participants: []
    });
    await event.save();
    return res
      .status(201)
      .json({ message: 'Event created successfully', event });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating event', error });
  }
};

const getEvents = async (req, res) => {
  try {
    const { message } = res;
    if (req.user === undefined) {
      return res.status(req.status).json({ message });
    }
    const events = await Event.find();
    if (events.length === 0) {
      return res.status(404).json({ message: 'No upcoming events!' });
    }
    return res
      .status(200)
      .json({ message: 'Events fetched successfully', events });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching events', error });
  }
};

const getEvent = async (req, res) => {
  try {
    const { message } = res;
    if (req.user === undefined) {
      return res.status(req.status).json({ message });
    }
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res
      .status(200)
      .json({ message: 'Event fetched successfully', event });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching event', error });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { message } = res;
    if (req.user === undefined) {
      return res.status(req.status).json({ message });
    }
    const { id } = req.params;
    const { name, date, time, description } = req.body;
    const event = await Event.findByIdAndUpdate(
      id,
      { name, date, time, description },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    // await sendEmail(
    //   participantEmail,
    //   'Event Update Notification',
    //   `The event ${event.name} has been updated. Details: ${JSON.stringify(updatedDetails)}`
    // );
    return res
      .status(200)
      .json({ message: 'Event updated successfully', event });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating event', error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { message } = res;
    if (req.user === undefined) {
      return res.status(req.status).json({ message });
    }
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.status(204).json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting event', error });
  }
};

const registerForEvent = async (req, res) => {
  try {
    const { message } = res;
    if (req.user === undefined) {
      return res.status(req.status).json({ message });
    }
    const { id } = req.params;
    const userId = req.user.id;
    const userEmail = req.user.email;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found!' });
    }
    if (event.participants.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'Already registered for this event!' });
    }
    if (event) {
      if (event.participants.length >= event.capacity) {
        return res.status(400).json({ message: 'Event is full!' });
      }
      event.participants.push(userId);
      await event.save();
      try {
        await sendEmail(
          userEmail,
          'Event Registration Confirmation',
          `You have successfully registered for ${event.name}.`
        );
        return res
          .status(200)
          .json({ message: 'Registered for event successfully', event });
      } catch (error) {
        res.status(500).json({ message: 'Error sending confirmation email' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering for event', error });
  }
};

const getEventParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate('participants');
    if (!event) {
      return res.status(404).json({ message: 'Event not found!' });
    }
    if (event.participants.length === 0) {
      return res
        .status(200)
        .json({ message: 'No participants for this event' });
    }
    return res.status(200).json(event.participants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching participants', error });
  }
};

const deleteParticipant = async (req, res) => {
  try {
    const { message } = res;
    if (req.user === undefined) {
      return res.status(req.status).json({ message });
    }
    const { id, userId } = req.params;
    const event = await Event.findById(id);
    if (event) {
      const participantIndex = event.participants.indexOf(userId);
      if (participantIndex > -1) {
        event.participants.splice(participantIndex, 1);
        await event.save();
        res.status(200).json({ message: 'Participant removed successfully' });
      } else {
        res
          .status(404)
          .json({ message: 'Participant not found in this event' });
      }
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting participant', error });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventParticipants,
  deleteParticipant
};
