import Bookmark from '../models/Bookmark.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

const fetchTitleFromURL = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('title').text();
  } catch {
    return '';
  }
};

export const createBookmark = async (req, res) => {
  try {
    let { url, title, description, tags, favorite } = req.body;

    if (!url) return res.status(400).json({ error: 'URL is required' });

    if (!title) {
      title = await fetchTitleFromURL(url);
    }

 const bookmark = new Bookmark({
      url,
      title,
      description,
      tags,
      favorite,
      user: req.user._id 
    });

    const saved = await bookmark.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookmarks = async (req, res) => {
  const { q, tags } = req.query;
  const query = { user: req.user._id };

  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
  }

  if (tags) {
    query.tags = { $in: tags.split(',') };
  }

  try {
    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Bookmark by ID
export const getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Bookmark
export const updateBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Bookmark
export const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.json({ message: 'Bookmark deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
