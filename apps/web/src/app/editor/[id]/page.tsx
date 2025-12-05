'use client';

import { useParams } from 'next/navigation';
import CollaborativeEditor from '@/components/CollaborativeEditor';
import Link from 'next/link';

export default function EditorPage() {
  const params = useParams();
  const documentId = params.id as string;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300">
            Logue
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-300">Document: {documentId}</span>
        </div>
        <Link
          href="/"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition"
        >
          Back to Home
        </Link>
      </header>
      
      <main className="flex-1 flex flex-col">
        <CollaborativeEditor documentId={documentId} />
      </main>
    </div>
  );
}
