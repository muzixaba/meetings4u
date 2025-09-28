import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Plus, Eye, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Select from '../../components/ui/Select';
import { useJobsStore } from '../../stores/jobsStore';
import { useEntitiesStore } from '../../stores/entitiesStore';
import { meetingTypes } from '../../data/mockData';

const ClientJobs = () => {
  const { jobs, getQuotesForJob } = useJobsStore();
  const { entities } = useEntitiesStore();
  const [statusFilter, setStatusFilter] = useState('all');
  const [entityFilter, setEntityFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Jobs' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'disputed', label: 'Disputed' }
  ];

  const entityOptions = [
    { value: 'all', label: 'All Entities' },
    ...entities.map(entity => ({
      value: entity.id,
      label: entity.name
    }))
  ];

  const filteredJobs = jobs.filter(job => {
    const statusMatch = statusFilter === 'all' || job.status === statusFilter;
    const entityMatch = entityFilter === 'all' || job.selectedEntityId === entityFilter;
    return statusMatch && entityMatch;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case 'open': return 'accent';
      case 'in_progress': return 'primary';
      case 'completed': return 'success';
      case 'disputed': return 'danger';
      default: return 'default';
    }
  };

  const getMeetingTypeLabel = (type) => {
    const meetingType = meetingTypes.find(mt => mt.value === type);
    return meetingType ? meetingType.label : type;
  };

  const getEntityName = (entityId) => {
    const entity = entities.find(e => e.id === entityId);
    return entity ? entity.name : 'Unknown Entity';
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
        </div>
        <Link to="/client/post-job">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <Card.Content className="py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select
                label="Filter by Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={statusOptions}
              />
            </div>
            <div className="flex-1">
              <Select
                label="Filter by Entity"
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
                options={entityOptions}
              />
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <Card>
          <Card.Content className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Jobs Found</h3>
            <p className="text-gray-600 mb-6">
              {statusFilter === 'all' && entityFilter === 'all'
                ? "You haven't posted any jobs yet."
                : "No jobs match your current filters."
              }
            </p>
            <Link to="/client/post-job">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Post Your First Job
              </Button>
            </Link>
          </Card.Content>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const quotes = getQuotesForJob(job.id);
            const entityName = getEntityName(job.selectedEntityId);

            return (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <Card.Content className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getMeetingTypeLabel(job.meetingType)}
                        </h3>
                        <Badge variant={getStatusVariant(job.status)} size="sm">
                          {job.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="space-y-1 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.location.address}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(job.dateTime).toLocaleString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          Entity: {entityName}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">
                          Budget: <span className="font-medium text-gray-900">{job.budget}</span>
                        </span>
                        <span className="text-gray-600">
                          Quotes: <span className="font-medium text-gray-900">{quotes.length}</span>
                        </span>
                        <span className="text-gray-600">
                          Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Link to={`/client/jobs/${job.id}`}>
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>

                      {job.status === 'open' && (
                        <Button variant="outline" size="sm">
                          Edit Job
                        </Button>
                      )}

                      {quotes.length > 0 && (
                        <Link to={`/client/jobs/${job.id}#quotes`}>
                          <Button variant="accent" size="sm" className="w-full">
                            View Quotes ({quotes.length})
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      )}

      {/* Stats Summary */}
      {filteredJobs.length > 0 && (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{filteredJobs.length}</p>
                <p className="text-sm text-gray-600">Total Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-600">
                  {filteredJobs.filter(j => j.status === 'open').length}
                </p>
                <p className="text-sm text-gray-600">Open</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">
                  {filteredJobs.filter(j => j.status === 'in_progress').length}
                </p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {filteredJobs.filter(j => j.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default ClientJobs;