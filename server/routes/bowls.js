import express from 'express';
import Bowl from '../models/Bowl.js';
import { isMongoConnected, memoryStore } from '../config/db.js';

const router = express.Router();

// GET /api/bowls - list all bowls
router.get('/', async (req, res, next) => {
  try {
    if (isMongoConnected) {
      const bowls = await Bowl.find().select('-__v').sort({ createdAt: 1 });
      return res.json({
        success: true,
        source: 'mongodb',
        count: bowls.length,
        data: bowls
      });
    }

    return res.json({
      success: true,
      source: 'memory',
      count: memoryStore.bowls.length,
      data: memoryStore.bowls
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/bowls/:id - get bowl details by ID or slug
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Sanitize identifier: allow only alphanumeric characters and hyphens
    if (typeof id !== 'string' || !/^[a-zA-Z0-9-]{2,50}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bowl identifier format.'
      });
    }

    if (isMongoConnected) {
      let bowl = null;
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        bowl = await Bowl.findById(id).select('-__v');
      }
      if (!bowl) {
        bowl = await Bowl.findOne({ slug: id.toLowerCase() }).select('-__v');
      }

      if (!bowl) {
        return res.status(404).json({
          success: false,
          message: `Bowl with identifier '${id}' was not found.`
        });
      }

      return res.json({
        success: true,
        source: 'mongodb',
        data: bowl
      });
    }

    // In-memory lookup
    const bowl = memoryStore.bowls.find(
      (b) => b._id === id || b.slug === id.toLowerCase()
    );

    if (!bowl) {
      return res.status(404).json({
        success: false,
        message: `Bowl with identifier '${id}' was not found.`
      });
    }

    return res.json({
      success: true,
      source: 'memory',
      data: bowl
    });
  } catch (err) {
    next(err);
  }
});

export default router;
