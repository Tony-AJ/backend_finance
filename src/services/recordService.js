import FinancialRecord from '../models/FinancialRecord.js';

//Get all records with filtering
export const getRecords = async (req, res, next) => {
    try {
        let query;
        const reqQuery = { ...req.query };
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        query = FinancialRecord.find(JSON.parse(queryStr)).populate('user', 'name email');

        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        const records = await query;
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (err) {
        next(err);
    }
};

//Get single record
export const getRecord = async (req, res, next) => {
    try {
        const record = await FinancialRecord.findById(req.params.id).populate('user', 'name email');
        if (!record) {
            return res.status(404).json({ success: false, error: 'Record not found' });
        }
        res.status(200).json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
};

//Create record
export const createRecord = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const record = await FinancialRecord.create(req.body);
        res.status(201).json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
};

//Update record
export const updateRecord = async (req, res, next) => {
    try {
        let record = await FinancialRecord.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!record) {
            return res.status(404).json({ success: false, error: 'Record not found' });
        }
        res.status(200).json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
};

//Delete record
export const deleteRecord = async (req, res, next) => {
    try {
        const record = await FinancialRecord.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ success: false, error: 'Record not found' });
        }
        await record.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
