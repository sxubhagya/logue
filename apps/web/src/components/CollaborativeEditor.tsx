'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface CollaborativeEditorProps {
  documentId: string;
}

export default function CollaborativeEditor({ documentId }: CollaborativeEditorProps) {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Disable local history as Yjs handles it
      }),
    ],
    content: '<p>Loading...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-4',
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    // Create Yjs document
    const ydoc = new Y.Doc();

    // Create WebSocket provider
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/collaboration';
    const wsProvider = new WebsocketProvider(wsUrl, documentId, ydoc);

    wsProvider.on('status', (event: { status: string }) => {
      setIsConnected(event.status === 'connected');
    });

    setProvider(wsProvider);

    // Get random color for cursor
    const colors = ['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Configure collaboration extensions
    const collaborationExtension = Collaboration.configure({
      document: ydoc,
    });

    const collaborationCursorExtension = CollaborationCursor.configure({
      provider: wsProvider,
      user: {
        name: 'User ' + Math.floor(Math.random() * 1000),
        color: randomColor,
      },
    });

    // Add collaboration extensions to editor
    editor.extensionManager.extensions.push(collaborationExtension);
    editor.extensionManager.extensions.push(collaborationCursorExtension);

    return () => {
      wsProvider.destroy();
      ydoc.destroy();
    };
  }, [editor, documentId]);

  if (!editor) {
    return <div className="p-4">Loading editor...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded ${
              editor.isActive('bold') ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded ${
              editor.isActive('italic') ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-1 rounded ${
              editor.isActive('heading', { level: 1 }) ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            H1
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
