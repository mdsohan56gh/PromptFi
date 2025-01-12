import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="description" content="AI Prompt Tokenization & Usage Protocol" />
        
        {/* Open Graph */}
        <meta property="og:title" content="PromptFi - AI Prompt Tokenization" />
        <meta property="og:description" content="Transform your AI prompts into valuable NFTs" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PromptFi" />
        <meta name="twitter:description" content="AI Prompt Tokenization & Usage Protocol" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

