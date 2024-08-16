import Head from 'next/head';
import { useState } from 'react';
import PromptCard from '@/components/PromptCard';

export default function ExplorePage() {
  const [filter, setFilter] = useState('all');
  
  // Mock data - will be replaced with real data from blockchain
  const mockPrompts = [
    {
      tokenId: 1,
      title: "SEO Blog Post Generator",
      description: "Generate high-quality, SEO-optimized blog posts on any topic with proper structure and keywords",
      modelType: "GPT-4",
      usageCount: 127,
      creator: "0x1234567890abcdef1234567890abcdef12345678",
      royaltyRatio: 1000
    },
    {
      tokenId: 2,
      title: "Code Review Assistant",
      description: "Comprehensive code review prompt that checks for bugs, performance issues, and best practices",
      modelType: "Claude",
      usageCount: 89,
      creator: "0xabcdef1234567890abcdef1234567890abcdef12",
      royaltyRatio: 1500
    },
    {
      tokenId: 3,
      title: "Social Media Content Creator",
      description: "Create engaging social media posts optimized for different platforms with hashtags and emojis",
      modelType: "GPT-4",
      usageCount: 203,
      creator: "0x7890abcdef1234567890abcdef1234567890abcd",
      royaltyRatio: 800
    }
  ];

  return (
    <>
      <Head>
        <title>Explore Prompts - PromptFi</title>
        <meta name="description" content="Discover and use AI prompts created by the community" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Prompts
            </h1>
            <p className="text-lg text-gray-600">
              Discover high-quality AI prompts from creators worldwide
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('gpt4')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'gpt4'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              GPT-4
            </button>
            <button
              onClick={() => setFilter('claude')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'claude'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Claude
            </button>
            <button
              onClick={() => setFilter('popular')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'popular'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Most Popular
            </button>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Prompt Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {mockPrompts.map((prompt) => (
              <PromptCard
                key={prompt.tokenId}
                {...prompt}
                onUse={() => console.log('Using prompt', prompt.tokenId)}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-lg border border-gray-300 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

