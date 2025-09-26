import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, Users, FileText, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { useAuthStore } from '../../stores/authStore';
import { useEntitiesStore } from '../../stores/entitiesStore';
import { useJobsStore } from '../../stores/jobsStore';

const ClientDashboard = () => {
  const { user } = useAuthStore();
  const { entities, selectedEntity } = useEntitiesStore();
  const { jobs, getJobsByStatus } = useJobsStore();

  const openJobs = getJobsByStatus('open');
  const inProgressJobs = getJobsByStatus('in_progress');
  const completedJobs = getJobsByStatus('completed');

  const stats = [
    { label: 'Open Jobs', value: openJobs.length, icon: Calendar, color: 'accent' },
    { label: 'In Progress', value: inProgressJobs.length, icon: Users, color: 'primary' },
    { label: 'Completed', value: completedJobs.length, icon: FileText, color: 'success' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center space-x-4">
        <Avatar
          src={user?.profile?.profilePhoto?.url}
          alt={user?.profile?.name || user?.email}
          size="lg"
          fallbackText={user?.profile?.name || user?.email}
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.profile?.name || 'Client'}
          </h1>
          <p className="text-gray-600">
            Current Entity: <span className="font-medium">{selectedEntity?.name}</span>
          </p>
        </div>
      </div>

      {/* Phone Verification Banner */}
      {!user?.phone_verified && (
        <Card className="border-yellow-200 bg-yellow-50">
          <Card.Content className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Phone Verification Required</p>
                <p className="text-sm text-yellow-700">
                  Verify your phone number to receive job notifications and quotes
                </p>
              </div>
            </div>
            <Link to="/verify-phone">
              <Button variant="accent" size="sm">
                Verify Phone
              </Button>
            </Link>
          </Card.Content>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <Card.Content className="flex items-center p-6">
              <div className={`bg-${color}-100 rounded-full p-3 mr-4`}>
                <Icon className={`h-6 w-6 text-${color}-600`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </Card.Header>
        <Card.Content>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/client/post-job">
              <Button className="w-full" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Post New Job
              </Button>
            </Link>
            <Link to="/client/jobs">
              <Button variant="outline" className="w-full" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                View Jobs
              </Button>
            </Link>
            <Link to="/client/entities">
              <Button variant="outline" className="w-full" size="lg">
                <Users className="h-5 w-5 mr-2" />
                Manage Entities
              </Button>
            </Link>
            <Link to="/client/messages">
              <Button variant="outline" className="w-full" size="lg">
                <FileText className="h-5 w-5 mr-2" />
                Messages
              </Button>
            </Link>
          </div>
        </Card.Content>
      </Card>

      {/* Recent Jobs */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Jobs</h2>
            <Link to="/client/jobs">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </Card.Header>
        <Card.Content>
          {jobs.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No jobs posted yet</p>
              <Link to="/client/post-job">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Post Your First Job
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.slice(0, 3).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">
                        {job.meetingType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <Badge
                        variant={
                          job.status === 'open' ? 'accent' :
                          job.status === 'in_progress' ? 'primary' : 'success'
                        }
                        size="sm"
                      >
                        {job.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {job.location.address} • {new Date(job.dateTime).toLocaleDateString()}
                    </p>
                  </div>
                  <Link to={`/client/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Entity Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Current Entity</h2>
              <Link to="/client/entities">
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            {selectedEntity ? (
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">{selectedEntity.name}</h3>
                <p className="text-sm text-gray-600">{selectedEntity.type}</p>
                <p className="text-sm text-gray-600">{selectedEntity.address}</p>
                <p className="text-sm text-gray-600">{selectedEntity.phone}</p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">No entity selected</p>
                <Link to="/client/entities">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Entity
                  </Button>
                </Link>
              </div>
            )}
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold text-gray-900">Account Status</h2>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Verified</span>
                <Badge variant={user?.verified ? 'success' : 'warning'} size="sm">
                  {user?.verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Phone Verified</span>
                <Badge variant={user?.phone_verified ? 'success' : 'warning'} size="sm">
                  {user?.phone_verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Entities</span>
                <span className="text-sm font-medium text-gray-900">{entities.length}</span>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;