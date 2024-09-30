import Ticket from '../models/ticketModel.js';
import Journey from '../models/journeyModel.js';
import Destination from '../models/destinationModel.js';
import { sequelize } from '../../config/dbConfig.js';

const calculateTicketPrice = async (journeyId) => {
  const journey = await Journey.findByPk(journeyId, {
    include: Destination,
  });
  return journey.Destination.baseFare;
};

export const bookTicket = async (req, res) => {
  const { journeyId } = req.body;
  const userId = req.user.id; 

  try {
    const journey = await Journey.findByPk(journeyId);
    if (!journey || journey.availableSeats <= 0) {
      return res.status(400).json({ message: 'No available seats or journey not found' });
    }

    const price = await calculateTicketPrice(journeyId);
    
    const transaction = await sequelize.transaction();

    try {
      const seatNumber = journey.availableSeats; 
      const ticket = await Ticket.create({
        userId,
        journeyId,
        seatNumber,
        price,
        status: 'booked',
      }, { transaction });

      journey.availableSeats -= 1;
      await journey.save({ transaction });

      await transaction.commit();

      res.status(201).json({ message: 'Ticket booked successfully', ticket });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: 'Error booking ticket', error });
  }
};

export const getUserTickets = async (req, res) => {
  const userId = req.user.id;

  try {
    const tickets = await Ticket.findAll({ where: { userId } });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};

export const cancelTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.status === 'cancelled') {
      return res.status(400).json({ message: 'Ticket already cancelled' });
    }

    ticket.status = 'cancelled';
    await ticket.save();

    const journey = await Journey.findByPk(ticket.journeyId);
    journey.availableSeats += 1;
    await journey.save();

    res.status(200).json({ message: 'Ticket cancelled successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling ticket', error });
  }
};
