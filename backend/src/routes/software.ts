import express from 'express';
import { Software } from '../entities/Software';
import { AppDataSource } from '../config/data-source';
import { authenticateJWT } from '../middleware/auth';
import { requireRole } from '../middleware/roles'; 

const router = express.Router();

// Create software (Admin only)
router.post('/', authenticateJWT, requireRole(['Admin']), async (req, res) => {
    try {
        const software = new Software();
        software.name = req.body.name;
        software.description = req.body.description;
        software.accessLevels = req.body.accessLevels;
        
        await AppDataSource.manager.save(software);
        res.status(201).json(software);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating software' });
    }
});

// Get all software
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const software = await AppDataSource.manager.find(Software);
        res.json(software);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching software' });
    }
});

export default router;