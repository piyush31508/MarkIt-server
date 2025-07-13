import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import {
  createBookmark,
  getBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark,
} from '../controllers/bookmarkController.js';

const router = express.Router();

router.post('/', isAuth, createBookmark);
router.get('/', isAuth, getBookmarks);
router.get('/:id', isAuth, getBookmarkById);
router.put('/:id', isAuth, updateBookmark);
router.delete('/:id', isAuth, deleteBookmark);

export default router; 
