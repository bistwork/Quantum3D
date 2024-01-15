import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public/leads.json');

export default (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    } catch (error) {
      console.error('Error reading data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const newLead = req.body;

    try {
      const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const updatedData = [...existingData, newLead];

      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
      res.status(200).json({ message: 'Lead added successfully' });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
