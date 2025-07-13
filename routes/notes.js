import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} from '../controllers/noteController.js';

const router = express.Router();

router.post('/', isAuth, createNote);
router.get('/', isAuth, getNotes);
router.get('/:id', isAuth, getNoteById);
router.put('/:id', isAuth, updateNote);
router.delete('/:id', isAuth, deleteNote);

export default router;
