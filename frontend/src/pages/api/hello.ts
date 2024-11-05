import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  timestamp: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    message: 'Welcome to PromptFi API',
    timestamp: new Date().toISOString()
  });
}

