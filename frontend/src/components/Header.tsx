import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            PromptFi
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/explore" className="text-gray-700 hover:text-purple-600 font-medium">
              Explore
            </Link>
            <Link href="/create" className="text-gray-700 hover:text-purple-600 font-medium">
              Create
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium">
              Dashboard
            </Link>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

