import express from 'express';
import { Request } from '../entities/Request';
import { AppDataSource } from '../config/data-source';
import { authenticateJWT } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = express.Router();

// Submit request (Employee)
router.post('/', authenticateJWT, requireRole(['Employee']), async (req, res) => {
    try {
        const newRequest = new Request();
        newRequest.user = req.user!;
        newRequest.software = req.body.softwareId;
        newRequest.accessType = req.body.accessType;
        newRequest.reason = req.body.reason;
        
        await AppDataSource.manager.save(newRequest);
        res.status(201).json(newRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting request' });
    }
});

// Get pending requests (Manager)
router.get('/pending', authenticateJWT, requireRole(['Manager']), async (req, res) => {
    try {
        const requests = await AppDataSource.manager.find(Request, {
            where: { status: 'Pending' },
            relations: ['user', 'software']
        });
        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching requests' });
    }
});

// Update request status (Manager)
router.patch('/:id', authenticateJWT, requireRole(['Manager']), async (req, res) => {
    try {
        const request = await AppDataSource.manager.findOne(Request, {
            where: { id: parseInt(req.params.id) },
            relations: ['user']
        });

        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = req.body.status;
        await AppDataSource.manager.save(request);
        
        res.json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating request' });
    }
});

export default router;