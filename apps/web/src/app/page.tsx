import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Logue</h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          <h2 className="text-4xl font-bold">
            Real-time Collaborative Screenwriting
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Write your screenplay together, in real-time, with your team.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              href="/editor/demo"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Try Demo Editor
            </Link>
            <Link
              href="/documents"
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 font-semibold py-3 px-6 rounded-lg transition"
            >
              My Documents
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Real-time Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                See changes as they happen with Yjs-powered real-time sync.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Screenplay Formatting</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Industry-standard formatting with Tiptap editor.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Cloud Storage</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your screenplays are safely stored in the cloud.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-900 py-4 px-6 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 Logue. Real-time screenwriting software.</p>
      </footer>
    </div>
  );
}
