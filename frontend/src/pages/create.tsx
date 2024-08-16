import Head from 'next/head';
import { useState } from 'react';
import CreatePromptForm, { PromptFormData } from '@/components/CreatePromptForm';

export default function CreatePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: PromptFormData) => {
    setLoading(true);
    setSuccess(false);

    try {
      console.log('Creating prompt with data:', data);
      
      // TODO: Upload to IPFS
      // TODO: Call smart contract
      
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
    } catch (error) {
      console.error('Error creating prompt:', error);
      alert('Failed to create prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Prompt - PromptFi</title>
        <meta name="description" content="Create and mint your AI prompt as an NFT" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create Prompt NFT
            </h1>
            <p className="text-lg text-gray-600">
              Transform your AI prompt into a valuable digital asset
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {success ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Prompt Created Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your prompt has been minted as an NFT
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg"
                >
                  Create Another
                </button>
              </div>
            ) : (
              <CreatePromptForm onSubmit={handleSubmit} loading={loading} />
            )}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-2">💡 Tips for Creating Great Prompts</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Be specific and clear in your prompt instructions</li>
              <li>Include relevant context and examples</li>
              <li>Test your prompt before minting</li>
              <li>Use appropriate tags for discoverability</li>
              <li>Set a fair royalty ratio (5-20% recommended)</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

