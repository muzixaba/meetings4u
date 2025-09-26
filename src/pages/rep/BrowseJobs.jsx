import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Users, FileText, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import { useRepStore } from '../../stores/repStore';
import { meetingTypes } from '../../data/mockData';

const BrowseJobs = () => {
  const { availableJobs, filters, updateFilters, getFilteredJobs } = useRepStore();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const meetingTypeOptions = [
    { value: '', label: 'All Meeting Types' },
    ...meetingTypes
  ];

  const filteredJobs = getFilteredJobs();

  const getMeetingTypeLabel = (type) => {
    const meetingType = meetingTypes.find(mt => mt.value === type);
    return meetingType ? meetingType.label : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleQuoteClick = (job) => {
    setSelectedJob(job);
    setShowQuoteModal(true);
  };

  const calculateDistance = (job) => {
    // Mock distance calculation - in real app would use geolocation
    const distances = [5, 12, 8, 15, 25, 35, 18, 22];
    const index = parseInt(job.id.slice(-1)) || 0;
    return distances[index % distances.length];
  };

  const formatRequirements = (requirements) => {
    const items = [];
    if (requirements.attire) items.push(`${requirements.attire} attire`);
    if (requirements.ppe) items.push('PPE required');
    if (requirements.tasks) items.push(`${requirements.tasks.length} tasks`);
    return items.join(' • ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Available Jobs</h1>
        <p className="text-gray-600">Find meeting representation opportunities in your area</p>
      </div>

      {/* Filters */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-gray-900">Filter Jobs</h2>
        </Card.Header>
        <Card.Content>
          <div className="grid md:grid-cols-4 gap-4">
            <Select
              label="Meeting Type"
              value={filters.meetingType || ''}
              onChange={(e) => updateFilters({ meetingType: e.target.value || null })}
              options={meetingTypeOptions}
            />
            <Input
              label="Minimum Fee (R)"
              type="number"
              placeholder="150"
              value={filters.minFee || ''}
              onChange={(e) => updateFilters({ minFee: e.target.value ? parseInt(e.target.value) : null })}
            />
            <Input
              label="Max Distance (km)"
              type="number"
              placeholder="50"
              value={filters.distance || ''}
              onChange={(e) => updateFilters({ distance: e.target.value ? parseInt(e.target.value) : 50 })}
            />
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => updateFilters({ meetingType: null, minFee: null, distance: 50 })}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
          <Select
            options={[
              { value: 'date_asc', label: 'Date: Earliest First' },
              { value: 'date_desc', label: 'Date: Latest First' },
              { value: 'fee_asc', label: 'Fee: Low to High' },
              { value: 'fee_desc', label: 'Fee: High to Low' },
              { value: 'distance', label: 'Distance: Nearest First' }
            ]}
            placeholder="Sort by..."
          />
        </div>

        {filteredJobs.length === 0 ? (
          <Card>
            <Card.Content className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Jobs Available</h3>
              <p className="text-gray-600 mb-6">
                {availableJobs.length === 0
                  ? "There are no jobs available at the moment."
                  : "No jobs match your current filters. Try adjusting your criteria."
                }
              </p>
              {availableJobs.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => updateFilters({ meetingType: null, minFee: null, distance: 50 })}
                >
                  Clear Filters
                </Button>
              )}
            </Card.Content>
          </Card>
        ) : (
          filteredJobs.map((job) => {
            const distance = calculateDistance(job);
            const isNearby = distance <= (filters.distance || 50);

            return (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <Card.Content className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {getMeetingTypeLabel(job.meetingType)}
                        </h3>
                        <Badge variant="accent">
                          {job.budget}
                        </Badge>
                        {!isNearby && (
                          <Badge variant="warning" size="sm">
                            {distance}km away
                          </Badge>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-5 w-5 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">Date & Time</p>
                            <p className="text-sm">{new Date(job.dateTime).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">Location</p>
                            <p className="text-sm">{job.location.address}</p>
                            <p className="text-xs text-gray-500">~{distance}km from you</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Requirements:</p>
                        <p className="text-sm text-gray-900">{formatRequirements(job.requirements)}</p>
                      </div>

                      {job.additionalNotes && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-1">Additional Notes:</p>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg line-clamp-2">
                            {job.additionalNotes}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                        {job.attachments && job.attachments.length > 0 && (
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {job.attachments.length} attachment{job.attachments.length !== 1 ? 's' : ''}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Urgent
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 ml-6">
                      <Button
                        onClick={() => handleQuoteClick(job)}
                        className="min-w-[120px]"
                      >
                        Submit Quote
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="min-w-[120px]"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="min-w-[120px]"
                      >
                        Save for Later
                      </Button>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            );
          })
        )}
      </div>

      {/* Stats Summary */}
      {filteredJobs.length > 0 && (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold text-gray-900">Job Statistics</h3>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{filteredJobs.length}</p>
                <p className="text-sm text-gray-600">Available Jobs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-600">
                  {filteredJobs.filter(j => j.meetingType === 'tender_briefing').length}
                </p>
                <p className="text-sm text-gray-600">Tender Briefings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-600">
                  {filteredJobs.filter(j => j.meetingType === 'site_inspection').length}
                </p>
                <p className="text-sm text-gray-600">Site Inspections</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {filteredJobs.filter(j => calculateDistance(j) <= 20).length}
                </p>
                <p className="text-sm text-gray-600">Within 20km</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredJobs.filter(j => j.requirements.ppe).length}
                </p>
                <p className="text-sm text-gray-600">Require PPE</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Quick Quote Modal Placeholder */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Quote for {selectedJob && getMeetingTypeLabel(selectedJob.meetingType)}
            </h3>
            <p className="text-gray-600 mb-4">
              Quote submission form would go here with amount, transportation details, and notes.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowQuoteModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowQuoteModal(false);
                  // Would submit quote here
                }}
                className="flex-1"
              >
                Submit Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseJobs;