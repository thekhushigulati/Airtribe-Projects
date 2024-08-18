const Event = require('./../models/eventModel');

const createEvent = async (req, res) => {
  try {
    const { message } = res;
    if (req.user === undefined) {
      return res.status(req.status).send({ message });
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
      return res.status(req.status).send({ message });
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
      return res.status(req.status).send({ message });
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
      return res.status(req.status).send({ message });
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
      return res.status(req.status).send({ message });
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

module.exports = { createEvent, getEvents, getEvent, updateEvent, deleteEvent };
