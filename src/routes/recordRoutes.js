import express from 'express';
import {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
} from '../services/recordService.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getRecords);
router.get('/:id', getRecord);

router.post('/', authorize('admin'), createRecord);
router.put('/:id', authorize('admin'), updateRecord);
router.delete('/:id', authorize('admin'), deleteRecord);

export default router;
