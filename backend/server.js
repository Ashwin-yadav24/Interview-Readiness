import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { evaluateProfile } from './controllers/evaluationController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API endpoint for evaluating the profile
app.post('/api/evaluate', evaluateProfile);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
