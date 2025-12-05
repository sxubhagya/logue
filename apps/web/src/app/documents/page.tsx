'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DocumentsPage() {
  const [documents] = useState([
    { id: 'demo', title: 'Demo Document', updatedAt: new Date() },
    { id: 'sample-1', title: 'Untitled Screenplay', updatedAt: new Date() },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300">
          Logue
        </Link>
        <Link
          href="/"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition"
        >
          Back to Home
        </Link>
      </header>
      
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Documents</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              New Document
            </button>
          </div>
          
          <div className="space-y-4">
            {documents.map((doc) => (
              <Link
                key={doc.id}
                href={`/editor/${doc.id}`}
                className="block bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Last updated: {doc.updatedAt.toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
          
          {documents.length === 0 && (
            <div className="text-center py-16 text-gray-600 dark:text-gray-400">
              <p className="text-lg">No documents yet.</p>
              <p className="mt-2">Create your first screenplay to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
