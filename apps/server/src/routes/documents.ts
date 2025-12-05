import { Router, Response } from 'express';
import { query } from '../config/database';
import { AuthRequest, authenticateToken } from '../middleware/auth';
import { Document, DocumentMetadata } from '@logue/shared';

const router = Router();

// Get all documents for the authenticated user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT id, title, owner_id, created_at, updated_at FROM documents WHERE owner_id = $1 ORDER BY updated_at DESC',
      [req.userId]
    );

    const documents: DocumentMetadata[] = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      ownerId: row.owner_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific document
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM documents WHERE id = $1 AND owner_id = $2',
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const row = result.rows[0];
    const document: Document = {
      id: row.id,
      title: row.title,
      ownerId: row.owner_id,
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    res.json(document);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new document
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content = '' } = req.body;

    const result = await query(
      'INSERT INTO documents (title, owner_id, content) VALUES ($1, $2, $3) RETURNING *',
      [title, req.userId, content]
    );

    const row = result.rows[0];
    const document: Document = {
      id: row.id,
      title: row.title,
      ownerId: row.owner_id,
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    res.status(201).json(document);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a document
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const result = await query(
      'UPDATE documents SET title = $1, updated_at = NOW() WHERE id = $2 AND owner_id = $3 RETURNING *',
      [title, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const row = result.rows[0];
    const document: Document = {
      id: row.id,
      title: row.title,
      ownerId: row.owner_id,
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    res.json(document);
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a document
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM documents WHERE id = $1 AND owner_id = $2 RETURNING id',
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
