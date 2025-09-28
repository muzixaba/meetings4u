import React from 'react';
import Button from '../../components/ui/Button';
import { mockAssignments, mockUsers, mockJobs, mockEntities } from '../../data/mockData';

const StatusBadge = ({ status }) => {
  const colors = {
    upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
    in_progress: 'bg-amber-100 text-amber-800 border-amber-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

const AssignmentCard = ({ item }) => {
  // Get client details
  const client = mockUsers.find(user => user.id === item.clientId);

  // Get job details to find the entity
  const job = mockJobs.find(job => job.id === item.jobId);
  const entity = job ? mockEntities.find(entity => entity.id === job.selectedEntityId) : null;

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Job {item.jobId}</h3>
          <div className="mt-1 flex items-center gap-2">
            <StatusBadge status={item.status} />
            <span className="text-xs text-gray-500">Assigned: {new Date(item.assignedAt).toLocaleString()}</span>
            {item.completedAt && (
              <span className="text-xs text-gray-500">· Completed: {new Date(item.completedAt).toLocaleString()}</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Amount</div>
          <div className="font-semibold">R{item.amount?.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded p-3 border">
          <div className="text-sm text-gray-500">Meeting Details</div>
          <div className="mt-1">
            <div className="text-sm"><span className="text-gray-500">Type:</span> <span className="font-medium">{item.meetingDetails?.type}</span></div>
            <div className="text-sm"><span className="text-gray-500">Date:</span> <span className="font-medium">{new Date(item.meetingDetails?.dateTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
            <div className="text-sm"><span className="text-gray-500">Time:</span> <span className="font-medium">{new Date(item.meetingDetails?.dateTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span></div>
            <div className="text-sm"><span className="text-gray-500">Location:</span> <span className="font-medium">{item.meetingDetails?.location}</span></div>
          </div>
        </div>
        <div className="bg-gray-50 rounded p-3 border">
          <div className="text-sm text-gray-500">Your Accepted Quote</div>
          <div className="mt-1 text-sm space-y-1">
            <div><span className="text-gray-500">Amount:</span> <span className="font-medium">R{item.amount?.toFixed(2)} ZAR</span></div>
            {item.transportation && (
              <div><span className="text-gray-500">Transport:</span> <span className="font-medium">{item.transportation}</span></div>
            )}
            {item.meetingDetails?.duration && (
              <div><span className="text-gray-500">Planned duration:</span> <span className="font-medium">{item.meetingDetails.duration}</span></div>
            )}
          </div>
        </div>
        <div className="bg-gray-50 rounded p-3 border">
          <div className="text-sm text-gray-500">Client & Entity</div>
          <div className="mt-1 text-sm space-y-1">
            <div><span className="text-gray-500">Client:</span> <span className="font-medium">{client?.profile?.name || 'Unknown Client'}</span></div>
            <div><span className="text-gray-500">Entity:</span> <span className="font-medium">{entity?.name || 'Unknown Entity'}</span></div>
            {item.status !== 'upcoming' && (
              <div className="text-xs text-gray-500">Contact details available after confirmation</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button variant="outline">View Job Summary</Button>
        {item.status === 'upcoming' && (
          <>
            <Button variant="primary">Confirm Attendance</Button>
            <Button variant="ghost">Message Client</Button>
          </>
        )}
        {item.status === 'in_progress' && (
          <>
            <Button variant="outline">Upload Location Proof</Button>
            <Button variant="primary">Submit Completion Report</Button>
          </>
        )}
        {item.status === 'completed' && (
          <>
            <Button variant="ghost">View Report</Button>
            <Button variant="outline">Contact Support</Button>
          </>
        )}
      </div>
    </div>
  );
};

const RepAssignments = () => {
  // Get all assignments and sort by meeting date
  const sortedAssignments = mockAssignments
    .map(a => {
      // derive 'upcoming' if assigned but completionReport null and start date in future
      if (a.status === 'in_progress' && new Date(a.meetingDetails?.dateTime) > new Date()) {
        return { ...a, status: 'upcoming' };
      }
      return a;
    })
    .sort((a, b) => {
      // Sort by meeting date - earliest first
      const dateA = new Date(a.meetingDetails?.dateTime || 0);
      const dateB = new Date(b.meetingDetails?.dateTime || 0);
      return dateA - dateB;
    });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
      </div>
      <div className="space-y-3">
        {sortedAssignments.length === 0 && (
          <div className="text-center text-gray-500 py-10">No assignments found.</div>
        )}
        {sortedAssignments.map(item => (
          <AssignmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RepAssignments;