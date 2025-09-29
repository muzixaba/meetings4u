import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { mockEarnings } from '../../data/mockData';

const TransactionIcon = ({ type }) => {
  if (type === 'payment_received') {
    return (
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
    );
  }
  if (type === 'payment_pending') {
    return (
      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  }
  if (type === 'withdrawal') {
    return (
      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </div>
    );
  }
  return null;
};

const StatusBadge = ({ status }) => {
  const colors = {
    completed: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    failed: 'bg-red-100 text-red-800 border-red-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {status}
    </span>
  );
};

const RepEarnings = () => {
  const [timeFilter, setTimeFilter] = React.useState('all');

  const filteredTransactions = mockEarnings.transactions.filter(transaction => {
    if (timeFilter === 'all') return true;
    const transactionDate = new Date(transaction.date);
    const now = new Date();

    if (timeFilter === 'month') {
      return transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear();
    }
    if (timeFilter === 'quarter') {
      const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
      return transactionDate >= quarterStart;
    }
    return true;
  });

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
      </div>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-green-600">R{mockEarnings.balance.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">R{mockEarnings.totalEarnings.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">R{mockEarnings.thisMonth.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">R{mockEarnings.pendingPayments.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card>
        <Card.Content className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="primary">Request Withdrawal</Button>
              <Button variant="outline">Download Statement</Button>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-600">Filter:</label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Transaction History */}
      <Card>
        <Card.Header>
          <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
          <p className="text-gray-600">{filteredTransactions.length} transactions</p>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions found for the selected period.</p>
              </div>
            ) : (
              filteredTransactions.map(transaction => (
                <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <TransactionIcon type={transaction.type} />
                      <div>
                        <h3 className="font-medium text-gray-900">{transaction.description}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('en-ZA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        {transaction.jobId && (
                          <p className="text-xs text-gray-400">Job ID: {transaction.jobId}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {transaction.amount > 0 ? '+' : ''}R{Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <StatusBadge status={transaction.status} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredTransactions.length > 0 && (
            <div className="mt-6 text-center">
              <Button variant="ghost">Load More Transactions</Button>
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Withdrawal Information */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-bold text-gray-900">Withdrawal Information</h2>
        </Card.Header>
        <Card.Content>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">Withdrawal Schedule</p>
                <ul className="text-blue-700 space-y-1">
                  <li>• Minimum withdrawal amount: R100.00</li>
                  <li>• Processing time: 3-5 business days</li>
                  <li>• Withdrawals processed twice weekly (Tuesday & Friday)</li>
                  <li>• Bank transfer fees may apply</li>
                </ul>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default RepEarnings;