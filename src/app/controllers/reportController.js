import Report from '../models/reportModel.js';
import Journey from '../models/journeyModel.js';

//to Create a journey report
export const createReport = async (req, res) => {
  const { journeyId, passengerFeedback, issuesReported, journeyDuration, fuelConsumption } = req.body;
  
  const driverId = req.user.id; 

  try {
    const journey = await Journey.findByPk(journeyId);
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    // Creating the report using the driver's ID
    const report = await Report.create({
      journeyId,
      driverId, 
      passengerFeedback,
      issuesReported,
      journeyDuration,
      fuelConsumption,
    });

    res.status(201).json({ message: 'Report created successfully', report });
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error });
  }
};

// Getting all reports for a journey 
export const getReportsByJourney = async (req, res) => {
  const { journeyId } = req.params;

  try {
    const journey = await Journey.findByPk(journeyId);
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    const reports = await Report.findAll({ where: { journeyId } });

    res.status(200).json({ reports });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
};

// submiting journey report
export const submitJourneyReport = async (req, res) => {
  try {
      const { journeyId, driverId, passengerFeedback, issuesReported, journeyDuration, fuelConsumption } = req.body;
      
      
      const newReport = await Report.create({
          journeyId,
          driverId,
          passengerFeedback,
          issuesReported,
          journeyDuration,
          fuelConsumption
      });

      res.status(201).json({ message: 'Report submitted successfully', report: newReport });
  } catch (error) {
      res.status(500).json({ message: 'Failed to submit report', error });
  }
};

export default { submitJourneyReport };
