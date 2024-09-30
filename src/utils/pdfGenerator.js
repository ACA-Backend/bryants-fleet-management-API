import PDFDocument from 'pdfkit';
import fs from 'fs';

// code to generate PDF manifest for passengers
const generatePassengerManifest = async (journey, passengers, outputPath) => {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(outputPath));

  doc.fontSize(18).text(`Passenger Manifest for Journey: ${journey.id}`, { align: 'center' });
  doc.moveDown();

  doc.fontSize(14).text(`Vehicle: ${journey.vehicleId}`);
  doc.text(`Destination: ${journey.destinationId}`);
  doc.text(`Departure Time: ${journey.departureTime}`);
  doc.moveDown();

  
  doc.fontSize(12).text('Passenger List:');
  passengers.forEach((passenger, index) => {
    doc.text(
      `${index + 1}. Seat Number: ${passenger.seatNumber}, User ID: ${passenger.userId}, Ticket Status: ${passenger.status}`
    );
  });

  doc.end();
};

export default generatePassengerManifest;
