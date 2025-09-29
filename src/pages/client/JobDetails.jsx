import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, FileText, Download, Star, Clock, Car } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { useJobsStore } from '../../stores/jobsStore';
import { useEntitiesStore } from '../../stores/entitiesStore';
import { meetingTypes, attireOptions } from '../../data/mockData';

const JobDetails = () => {
  const { id } = useParams();
  const { jobs, getQuotesForJob, acceptQuote } = useJobsStore();
  const { entities } = useEntitiesStore();

  const job = jobs.find(j => j.id === id);
  const quotes = getQuotesForJob(id);
  const entity = entities.find(e => e.id === job?.selectedEntityId);

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
        <Link to="/client/jobs">
          <Button>Back to Jobs</Button>
        </Link>
      </div>
    );
  }

  const getMeetingTypeLabel = (type) => {
    const meetingType = meetingTypes.find(mt => mt.value === type);
    return meetingType ? meetingType.label : type;
  };

  const getAttireLabel = (attire) => {
    const attireOption = attireOptions.find(ao => ao.value === attire);
    return attireOption ? attireOption.label : attire;
  };

  const handleAcceptQuote = async (quoteId) => {
    try {
      await acceptQuote(quoteId);
      // Quote acceptance will update the job status and quote statuses
    } catch (error) {
      console.error('Failed to accept quote:', error);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'open': return 'accent';
      case 'in_progress': return 'primary';
      case 'completed': return 'success';
      case 'disputed': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {getMeetingTypeLabel(job.meetingType)}
            </h1>
            <Badge variant={getStatusVariant(job.status)}>
              {job.status.replace('_', ' ')}
            </Badge>
          </div>
          <p className="text-gray-600">Job ID: {job.id}</p>
        </div>
        <Link to="/client/jobs">
          <Button variant="outline">Back to Jobs</Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Details */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Meeting Details</h2>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Date & Time</p>
                    <p>{new Date(job.dateTime).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p>{job.location.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">Requirements</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Attire:</span>{' '}
                    <span className="font-medium">{getAttireLabel(job.requirements.attire)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">PPE Required:</span>{' '}
                    <span className="font-medium">{job.requirements.ppe ? 'Yes' : 'No'}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600">Tasks:</span>
                  <ul className="list-disc list-inside mt-1 text-sm">
                    {job.requirements.tasks.map((task, index) => (
                      <li key={index} className="text-gray-700">
                        {task.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {job.additionalNotes && (
                <div>
                  <p className="font-medium text-gray-900 mb-2">Additional Notes</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                    {job.additionalNotes}
                  </p>
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Documents */}
          {job.attachments && job.attachments.length > 0 && (
            <Card>
              <Card.Header>
                <h2 className="text-lg font-semibold text-gray-900">Documents & Attachments</h2>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {job.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{attachment.originalName}</p>
                          <p className="text-sm text-gray-600">
                            {attachment.fileType} • {(attachment.fileSize / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          )}

          {/* Quotes Section */}
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Quotes Received ({quotes.length})
                </h2>
                <span className="text-sm text-gray-600">Budget: {job.budget}</span>
              </div>
            </Card.Header>
            <Card.Content>
              {quotes.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No quotes received yet</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Representatives will submit quotes based on your requirements
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Representative</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600 ml-1">4.5</span>
                              </div>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-600">23 jobs completed</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">R{quote.amount.toFixed(2)}</p>
                          <Badge
                            variant={
                              quote.status === 'pending' ? 'warning' :
                                quote.status === 'accepted' ? 'success' : 'default'
                            }
                            size="sm"
                          >
                            {quote.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Car className="h-4 w-4 mr-2" />
                          <div>
                            <p className="font-medium text-gray-900">Transportation</p>
                            <p>{quote.transportation.method.replace('_', ' ')} - {quote.transportation.details}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <div>
                            <p className="font-medium text-gray-900">Arrival</p>
                            <p>Expected: {quote.estimatedArrival.time}</p>
                          </div>
                        </div>
                      </div>

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

                      {quote.additionalNotes && (
                        <div className="mb-4">
                          <p className="font-medium text-gray-900 mb-1">Additional Notes</p>
                          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                            {quote.additionalNotes}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          <p>Quoted: {new Date(quote.quotedAt).toLocaleString()}</p>
                          <p>Valid until: {new Date(quote.validUntil).toLocaleString()}</p>
                        </div>

                        {quote.status === 'pending' && job.status === 'open' && (
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Contact Rep
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAcceptQuote(quote.id)}
                            >
                              Accept Quote
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Content>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Entity Details */}
          {entity && (
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Entity Details</h3>
              </Card.Header>
              <Card.Content className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900">{entity.name}</p>
                  <p className="text-gray-600">{entity.type}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Contact</p>
                  <p className="text-gray-600">{entity.phone}</p>
                  <p className="text-gray-600">{entity.email}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">{entity.address}</p>
                </div>
                {entity.registrationNumber && (
                  <div>
                    <p className="font-medium text-gray-900">Registration</p>
                    <p className="text-gray-600">{entity.registrationNumber}</p>
                  </div>
                )}
              </Card.Content>
            </Card>
          )}

          {/* Job Actions */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
            </Card.Header>
            <Card.Content className="space-y-3">
              {job.status === 'open' && (
                <>
                  <Button variant="outline" className="w-full">
                    Edit Job
                  </Button>
                  <Button variant="danger" className="w-full">
                    Cancel Job
                  </Button>
                </>
              )}
              <Button variant="outline" className="w-full">
                Download Report
              </Button>
              <Link to="/client/messages">
                <Button variant="outline" className="w-full">
                  View Messages
                </Button>
              </Link>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;