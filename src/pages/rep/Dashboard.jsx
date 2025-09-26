import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, MapPin, TrendingUp, User, Star, Clock, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { useAuthStore } from '../../stores/authStore';
import { useRepStore } from '../../stores/repStore';

const RepDashboard = () => {
  const { user } = useAuthStore();
  const {
    availableJobs,
    myQuotes,
    myAssignments,
    earnings,
    profile,
    getQuotesByStatus,
    getAssignmentsByStatus,
    getCompletionRate,
    getRating
  } = useRepStore();

  const pendingQuotes = getQuotesByStatus('pending');
  const acceptedQuotes = getQuotesByStatus('accepted');
  const upcomingAssignments = getAssignmentsByStatus('in_progress');
  const completedAssignments = getAssignmentsByStatus('completed');
  const completionRate = getCompletionRate();
  const rating = getRating();

  const stats = [
    {
      label: 'Available Jobs',
      value: availableJobs.length,
      icon: Calendar,
      color: 'accent',
      link: '/rep/jobs'
    },
    {
      label: 'Pending Quotes',
      value: pendingQuotes.length,
      icon: Clock,
      color: 'warning',
      link: '/rep/quotes'
    },
    {
      label: 'Active Assignments',
      value: upcomingAssignments.length,
      icon: CheckCircle,
      color: 'primary',
      link: '/rep/assignments'
    },
    {
      label: 'This Month Earnings',
      value: `R${earnings.thisMonth.toFixed(0)}`,
      icon: DollarSign,
      color: 'success',
      link: '/rep/earnings'
    }
  ];

  const formatCurrency = (amount) => `R${amount.toFixed(2)}`;

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
            Welcome back, {user?.profile?.name || 'Representative'}
          </h1>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900">{rating}</span>
              <span className="text-sm text-gray-600">rating</span>
            </div>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">
              {profile.statistics.completedJobs} jobs completed
            </span>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">
              {completionRate}% completion rate
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color, link }) => (
          <Link key={label} to={link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
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
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </Card.Header>
        <Card.Content>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/rep/jobs">
              <Button className="w-full" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Browse Jobs
              </Button>
            </Link>
            <Link to="/rep/quotes">
              <Button variant="outline" className="w-full" size="lg">
                <Clock className="h-5 w-5 mr-2" />
                My Quotes
              </Button>
            </Link>
            <Link to="/rep/assignments">
              <Button variant="outline" className="w-full" size="lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                Assignments
              </Button>
            </Link>
            <Link to="/rep/profile">
              <Button variant="outline" className="w-full" size="lg">
                <User className="h-5 w-5 mr-2" />
                Update Profile
              </Button>
            </Link>
          </div>
        </Card.Content>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Available Jobs</h2>
              <Link to="/rep/jobs">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            {availableJobs.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No available jobs at the moment</p>
                <p className="text-sm text-gray-500">New jobs will appear here when posted</p>
              </div>
            ) : (
              <div className="space-y-4">
                {availableJobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">
                          {job.meetingType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <Badge variant="accent" size="sm">
                          {job.budget}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location.address.split(',')[0]}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(job.dateTime).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Link to={`/rep/jobs`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Earnings Overview */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Earnings Overview</h2>
              <Link to="/rep/earnings">
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Available Balance</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(earnings.balance)}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(earnings.thisMonth)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Earnings:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(earnings.totalEarnings)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending Payments:</span>
                  <span className="font-medium text-accent-600">
                    {formatCurrency(earnings.pendingPayments)}
                  </span>
                </div>
              </div>

              {earnings.pendingPayments > 0 && (
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    You have {formatCurrency(earnings.pendingPayments)} in pending payments
                  </p>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>

        {/* Active Assignments */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Active Assignments</h2>
              <Link to="/rep/assignments">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            {upcomingAssignments.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No active assignments</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {assignment.meetingDetails.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <Badge variant="primary" size="sm">
                        {formatCurrency(assignment.amount)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(assignment.meetingDetails.dateTime).toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {assignment.meetingDetails.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Performance Stats */}
        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold text-gray-900">Performance</h2>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900">{rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completion Rate</span>
                <span className="font-medium text-gray-900">{completionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Rate</span>
                <span className="font-medium text-gray-900">{profile.statistics.responseRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">On-Time Rate</span>
                <span className="font-medium text-gray-900">{profile.statistics.onTimeRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Jobs</span>
                <span className="font-medium text-gray-900">{profile.statistics.totalJobs}</span>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default RepDashboard;