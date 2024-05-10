import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>PromptFi - AI Prompt Tokenization</title>
        <meta name="description" content="Transform your AI prompts into valuable NFTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to PromptFi
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your AI prompts into tradeable NFTs and earn rewards every time they're used
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <FeatureCard 
              title="Tokenize Prompts"
              description="Convert your AI prompts into ERC-1155 NFTs with full ownership rights"
              icon="🎨"
            />
            <FeatureCard 
              title="Track Usage"
              description="Monitor how your prompts are being used across the ecosystem"
              icon="📊"
            />
            <FeatureCard 
              title="Earn Royalties"
              description="Automatically receive payments when others use your prompts"
              icon="💰"
            />
          </div>

          <div className="text-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

