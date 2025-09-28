import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Clock, Car, CheckCircle, X, Edit } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { useRepStore } from '../../stores/repStore';
import { useJobsStore } from '../../stores/jobsStore';
import { meetingTypes } from '../../data/mockData';

const RepQuotes = () => {
  const { myQuotes, getQuotesByStatus, updateQuote, withdrawQuote } = useRepStore();
  const { jobs } = useJobsStore();
  const [activeTab, setActiveTab] = useState('all');

  const pendingQuotes = getQuotesByStatus('pending');
  const acceptedQuotes = getQuotesByStatus('accepted');
  const rejectedQuotes = getQuotesByStatus('rejected');

  const tabs = [
    { id: 'all', label: 'All Quotes', count: myQuotes.length },
    { id: 'pending', label: 'Pending', count: pendingQuotes.length },
    { id: 'accepted', label: 'Accepted', count: acceptedQuotes.length },
    { id: 'rejected', label: 'Rejected', count: rejectedQuotes.length }
  ];

  const getQuotesToShow = () => {
    switch (activeTab) {
      case 'pending': return pendingQuotes;
      case 'accepted': return acceptedQuotes;
      case 'rejected': return rejectedQuotes;
      default: return myQuotes;
    }
  };

  const getJobDetails = (jobId) => {
    return jobs.find(job => job.id === jobId);
  };

  const getMeetingTypeLabel = (type) => {
    const meetingType = meetingTypes.find(mt => mt.value === type);
    return meetingType ? meetingType.label : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      case 'withdrawn': return 'default';
      default: return 'default';
    }
  };

  const handleWithdrawQuote = (quoteId) => {
    if (confirm('Are you sure you want to withdraw this quote?')) {
      withdrawQuote(quoteId);
    }
  };

  const formatCurrency = (amount) => `R${amount.toFixed(2)}`;

  const quotesToShow = getQuotesToShow();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mt-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Quotes</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {tabs.map(({ id, label, count }) => {
          const getCardStyle = () => {
            const baseStyle = 'cursor-pointer transition-all bg-white border border-gray-200';

            if (activeTab === id) {
              // Selected state with colored background
              switch (id) {
                case 'pending':
                  return `${baseStyle} ring-2 ring-yellow-500 bg-yellow-50`;
                case 'accepted':
                  return `${baseStyle} ring-2 ring-green-500 bg-green-50`;
                case 'rejected':
                  return `${baseStyle} ring-2 ring-red-500 bg-red-50`;
                default: // all
                  return `${baseStyle} ring-2 ring-blue-500 bg-blue-50`;
              }
            } else {
              // Default white background with hover states
              switch (id) {
                case 'pending':
                  return `${baseStyle} hover:bg-yellow-50 hover:border-yellow-300`;
                case 'accepted':
                  return `${baseStyle} hover:bg-green-50 hover:border-green-300`;
                case 'rejected':
                  return `${baseStyle} hover:bg-red-50 hover:border-red-300`;
                default: // all
                  return `${baseStyle} hover:bg-blue-50 hover:border-blue-300`;
              }
            }
          };

          const getTextColor = () => {
            switch (id) {
              case 'pending':
                return 'text-yellow-600';
              case 'accepted':
                return 'text-green-600';
              case 'rejected':
                return 'text-red-600';
              default: // all
                return 'text-blue-600';
            }
          };

          return (
            <Card
              key={id}
              className={getCardStyle()}
              onClick={() => setActiveTab(id)}
            >
              <Card.Content className="text-center p-6">
                <p className={`text-2xl font-bold ${getTextColor()}`}>{count}</p>
                <p className="text-sm font-medium text-gray-600">{label}</p>
              </Card.Content>
            </Card>
          );
        })}
      </div>

      {/* Quotes List */}
      <div>
        {quotesToShow.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab === 'all' ? '' : activeTab} quotes found
            </h3>
            <p className="text-gray-600">
              {activeTab === 'pending' && "You don't have any pending quotes at the moment."}
              {activeTab === 'accepted' && "No quotes have been accepted yet."}
              {activeTab === 'rejected' && "No quotes have been rejected."}
              {activeTab === 'all' && "You haven't submitted any quotes yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {quotesToShow.map((quote) => {
              const job = getJobDetails(quote.jobId);
              if (!job) return null;

              return (
                <div key={quote.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  {/* Quote Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getMeetingTypeLabel(job.meetingType)}
                        </h3>
                        <Badge variant={getStatusVariant(quote.status)}>
                          {quote.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(job.dateTime).toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location.address}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(quote.amount)}
                      </p>
                      <p className="text-sm text-gray-600">Your Quote</p>
                    </div>
                  </div>

                  {/* Quote Details */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Car className="h-5 w-5 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Transportation</p>
                        <p className="text-sm">
                          {quote.transportation.method.replace('_', ' ')} - {quote.transportation.details}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Arrival Details</p>
                        <p className="text-sm">
                          Expected: {quote.estimatedArrival.time}
                        </p>
                        <p className="text-xs text-gray-500">
                          Travel time: {quote.estimatedArrival.travelDuration}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Special Considerations */}
                  {quote.specialConsiderations && quote.specialConsiderations.length > 0 && (
                    <div className="mb-4">
                      <p className="font-medium text-gray-900 mb-2">Special Considerations</p>
                      <div className="flex flex-wrap gap-2">
                        {quote.specialConsiderations.map((consideration, index) => (
                          <Badge key={index} variant="info" size="sm">
                            {consideration}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Notes */}
                  {quote.additionalNotes && (
                    <div className="mb-4">
                      <p className="font-medium text-gray-900 mb-1">Additional Notes</p>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {quote.additionalNotes}
                      </p>
                    </div>
                  )}

                  {/* Quote Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <p>Submitted: {new Date(quote.quotedAt).toLocaleString()}</p>
                      <p>Valid until: {new Date(quote.validUntil).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      {quote.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit Quote
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleWithdrawQuote(quote.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Withdraw
                          </Button>
                        </>
                      )}

                      {quote.status === 'accepted' && (
                        <Button variant="primary" size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          View Assignment
                        </Button>
                      )}

                      {quote.status === 'rejected' && (
                        <Button variant="outline" size="sm">
                          Submit New Quote
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default RepQuotes;