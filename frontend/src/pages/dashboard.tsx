import Head from 'next/head';
import StatsCard from '@/components/StatsCard';

export default function DashboardPage() {
  // Mock data - will be replaced with real blockchain data
  const stats = {
    totalPrompts: 12,
    totalEarnings: '2.45 ETH',
    totalUsage: 387,
    reputationScore: 156
  };

  return (
    <>
      <Head>
        <title>Dashboard - PromptFi</title>
        <meta name="description" content="View your creator dashboard and statistics" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Creator Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Track your prompts, earnings, and performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard
              title="Total Prompts"
              value={stats.totalPrompts}
              icon="🎨"
              change="+3 this month"
              changeType="positive"
            />
            <StatsCard
              title="Total Earnings"
              value={stats.totalEarnings}
              icon="💰"
              change="+0.5 ETH"
              changeType="positive"
            />
            <StatsCard
              title="Total Usage"
              value={stats.totalUsage}
              icon="📊"
              change="+45 this week"
              changeType="positive"
            />
            <StatsCard
              title="Reputation Score"
              value={stats.reputationScore}
              icon="⭐"
              change="+12 points"
              changeType="positive"
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <ActivityItem
                action="Prompt Used"
                promptTitle="SEO Blog Post Generator"
                user="0x1234...5678"
                earnings="0.01 ETH"
                time="2 hours ago"
              />
              <ActivityItem
                action="New Prompt Minted"
                promptTitle="Code Review Assistant"
                user="You"
                earnings="-"
                time="1 day ago"
              />
              <ActivityItem
                action="Earnings Withdrawn"
                promptTitle="-"
                user="You"
                earnings="1.5 ETH"
                time="3 days ago"
              />
            </div>
          </div>

          {/* Top Performing Prompts */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Top Performing Prompts
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Prompt</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Usage</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Earnings</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <TopPromptRow
                    name="SEO Blog Post Generator"
                    usage={203}
                    earnings="1.2 ETH"
                    rating={4.8}
                  />
                  <TopPromptRow
                    name="Social Media Content"
                    usage={127}
                    earnings="0.8 ETH"
                    rating={4.6}
                  />
                  <TopPromptRow
                    name="Code Review Assistant"
                    usage={89}
                    earnings="0.45 ETH"
                    rating={4.9}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function ActivityItem({ action, promptTitle, user, earnings, time }: any) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-medium text-gray-900">{action}</p>
        <p className="text-sm text-gray-600">{promptTitle !== '-' ? promptTitle : user}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-900">{earnings}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}

function TopPromptRow({ name, usage, earnings, rating }: any) {
  return (
    <tr>
      <td className="px-4 py-3 text-sm text-gray-900">{name}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{usage}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{earnings}</td>
      <td className="px-4 py-3 text-sm text-gray-700">⭐ {rating}</td>
    </tr>
  );
}

