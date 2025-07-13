import Note from '../models/Note.js';

export const createNote = async (req, res) => {
  try {
    const { title, content, tags, favorite } = req.body;

    const note = new Note({
      title,
      content,
      tags,
      favorite,
      user: req.user._id  
    });

    await note.save();
    res.status(201).json({ message: 'Note created successfully', note });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create note' });
  }
};


export const getNotes = async (req, res) => {
  try {
    const { q, tags } = req.query;

    let query = { user: req.user._id };

    if (q) {
      query.$or = [
        { title: new RegExp(q, 'i') },
        { content: new RegExp(q, 'i') }
      ];
    }

    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.status(200).json(notes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};


export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
