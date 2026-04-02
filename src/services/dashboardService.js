import FinancialRecord from '../models/FinancialRecord.js';

// @desc    Get dashboard summary
export const getSummary = async (req, res, next) => {
    try {
        const stats = await FinancialRecord.aggregate([
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] },
                    },
                    totalExpenses: {
                        $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] },
                    },
                },
            },
        ]);

        const summary = stats[0] || { totalIncome: 0, totalExpenses: 0 };
        const netBalance = summary.totalIncome - summary.totalExpenses;

        res.status(200).json({
            success: true,
            data: {
                totalIncome: summary.totalIncome,
                totalExpenses: summary.totalExpenses,
                netBalance,
            },
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get category totals
export const getCategoryTotals = async (req, res, next) => {
    try {
        const categoryTotals = await FinancialRecord.aggregate([
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { total: -1 } },
        ]);

        res.status(200).json({
            success: true,
            data: categoryTotals,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get recent activity
export const getRecentActivity = async (req, res, next) => {
    try {
        const recent = await FinancialRecord.find()
            .sort('-createdAt')
            .limit(5)
            .populate('user', 'name');

        res.status(200).json({
            success: true,
            data: recent,
        });
    } catch (err) {
        next(err);
    }
};
