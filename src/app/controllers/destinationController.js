import Destination from '../models/destinationModel.js';

// Creating a new destination
export const createDestination = async (req, res) => {
  const { name, distance, baseFare } = req.body;

  try {
    const destination = await Destination.create({ name, distance, baseFare });
    res.status(201).json({ message: 'Destination created successfully', destination });
  } catch (error) {
    res.status(500).json({ message: 'Error creating destination', error });
  }
};

//code to Get all destinations
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destinations', error });
  }
};

// Getting a single destination by ID
export const getDestinationById = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await Destination.findByPk(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destination', error });
  }
};

// Updating a destination
export const updateDestination = async (req, res) => {
  const { id } = req.params;
  const { name, distance, baseFare } = req.body;

  try {
    const destination = await Destination.findByPk(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    destination.name = name || destination.name;
    destination.distance = distance || destination.distance;
    destination.baseFare = baseFare || destination.baseFare;

    await destination.save();
    res.status(200).json({ message: 'Destination updated successfully', destination });
  } catch (error) {
    res.status(500).json({ message: 'Error updating destination', error });
  }
};

// Deleting a destination
export const deleteDestination = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await Destination.findByPk(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    await destination.destroy();
    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting destination', error });
  }
};
