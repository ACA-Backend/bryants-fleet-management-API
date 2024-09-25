import Vehicle from '../models/vehicleModel.js';

// Create a new vehicle
export const createVehicle = async (req, res) => {
  const { plateNumber, model, capacity, status } = req.body;

  try {
    //code to Check if the plateNumber already exists
    const existingVehicle = await Vehicle.findOne({ where: { plateNumber } });
    if (existingVehicle) {
      return res.status(400).json({ message: 'Vehicle with this plate number already exists' });
    }

    // Creating a new vehicle
    const vehicle = await Vehicle.create({
      plateNumber,
      model,
      capacity,
      status,
    });

    res.status(201).json({ message: 'Vehicle created successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error });
  }
};

//code to Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
};

// Getting a single vehicle by ID
export const getVehicleById = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle', error });
  }
};

// Updating a vehicle
export const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { plateNumber, model, capacity, status, assignedDriverId } = req.body;

  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.plateNumber = plateNumber || vehicle.plateNumber;
    vehicle.model = model || vehicle.model;
    vehicle.capacity = capacity || vehicle.capacity;
    vehicle.status = status || vehicle.status;
    vehicle.assignedDriverId = assignedDriverId || vehicle.assignedDriverId;

    await vehicle.save();

    res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error });
  }
};

// to Delete a vehicle
export const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    await vehicle.destroy();
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error });
  }
};
