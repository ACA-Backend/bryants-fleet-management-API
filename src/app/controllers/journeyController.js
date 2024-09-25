import Journey from '../models/journeyModel.js';
import Vehicle from '../models/vehicleModel.js';

//code to Create a new journey
export const createJourney = async (req, res) => {
  const { vehicleId, destinationId, departureTime } = req.body;

  try {
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const journey = await Journey.create({ vehicleId, destinationId, departureTime });
    res.status(201).json({ message: 'Journey created successfully', journey });
  } catch (error) {
    res.status(500).json({ message: 'Error creating journey', error });
  }
};

// code to Get all journeys
export const getAllJourneys = async (req, res) => {
  try {
    const journeys = await Journey.findAll();
    res.status(200).json(journeys);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journeys', error });
  }
};

// Getting a single journey by ID
export const getJourneyById = async (req, res) => {
  const { id } = req.params;

  try {
    const journey = await Journey.findByPk(id);
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    res.status(200).json(journey);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journey', error });
  }
};

// Updating a journey
export const updateJourney = async (req, res) => {
  const { id } = req.params;
  const { vehicleId, destinationId, departureTime, status } = req.body;

  try {
    const journey = await Journey.findByPk(id);
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    journey.vehicleId = vehicleId || journey.vehicleId;
    journey.destinationId = destinationId || journey.destinationId;
    journey.departureTime = departureTime || journey.departureTime;
    journey.status = status || journey.status;

    await journey.save();
    res.status(200).json({ message: 'Journey updated successfully', journey });
  } catch (error) {
    res.status(500).json({ message: 'Error updating journey', error });
  }
};

// Deleting a journey
export const deleteJourney = async (req, res) => {
  const { id } = req.params;

  try {
    const journey = await Journey.findByPk(id);
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    await journey.destroy();
    res.status(200).json({ message: 'Journey deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting journey', error });
  }
};
