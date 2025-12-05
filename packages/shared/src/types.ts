// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
  user: User;
}

// Document types
export interface Document {
  id: string;
  title: string;
  ownerId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentMetadata {
  id: string;
  title: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Screenwriting specific types
export interface Scene {
  id: string;
  heading: string;
  content: string;
  order: number;
}

export interface Character {
  id: string;
  name: string;
  description?: string;
}

export interface ScriptElement {
  type: 'scene_heading' | 'action' | 'character' | 'dialogue' | 'parenthetical' | 'transition';
  content: string;
}

// Collaboration types
export interface CollaborationSession {
  documentId: string;
  userId: string;
  joinedAt: Date;
}

export interface Presence {
  userId: string;
  userName: string;
  color: string;
  cursor?: {
    position: number;
  };
}
