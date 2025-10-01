import React, { useState } from 'react';
import { User, CreditCard, Settings as SettingsIcon, Calendar, FileCheck, BarChart3, Save, CheckCircle2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { useRepStore } from '../../stores/repStore';

const TabButton = ({ active, onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 ${
      active
        ? 'border-primary-600 text-primary-600'
        : 'border-transparent text-gray-600 hover:text-gray-900'
    }`}
  >
    <Icon className="w-4 h-4" />
    {children}
  </button>
);

const PersonalInformationTab = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: profile.personalInfo.name,
    email: profile.personalInfo.email,
    phone: profile.personalInfo.phone,
    alternativePhone: profile.personalInfo.alternativePhone || '',
    address: profile.personalInfo.address,
    idNumber: profile.personalInfo.idNumber,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    onUpdate({ personalInfo: { ...profile.personalInfo, ...formData } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
          <Input
            label="Primary Phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
          <Input
            label="Alternative Phone"
            value={formData.alternativePhone}
            onChange={(e) => handleChange('alternativePhone', e.target.value)}
          />
          <Input
            label="ID Number"
            value={formData.idNumber}
            onChange={(e) => handleChange('idNumber', e.target.value)}
            required
          />
          <div className="md:col-span-2">
            <Input
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

const BankingPaymentsTab = ({ profile, onUpdate }) => {
  const bankingDetails = profile.bankingDetails || {};
  const [formData, setFormData] = useState({
    bankName: bankingDetails.bankName || '',
    accountHolderName: bankingDetails.accountHolderName || '',
    accountNumber: bankingDetails.accountNumber || '',
    branchCode: bankingDetails.branchCode || '',
    accountType: bankingDetails.accountType || 'Cheque',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    onUpdate({ bankingDetails: { ...formData, verified: false } });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Banking Details</h3>
          {bankingDetails.verified && (
            <Badge variant="success" className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </Badge>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900">
            Your banking details are used for payment withdrawals. Ensure all information is accurate to avoid payment delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Bank Name"
            value={formData.bankName}
            onChange={(e) => handleChange('bankName', e.target.value)}
            required
          />
          <Input
            label="Account Holder Name"
            value={formData.accountHolderName}
            onChange={(e) => handleChange('accountHolderName', e.target.value)}
            helperText="Must match ID name exactly"
            required
          />
          <Input
            label="Account Number"
            value={formData.accountNumber}
            onChange={(e) => handleChange('accountNumber', e.target.value)}
            required
          />
          <Input
            label="Branch Code"
            value={formData.branchCode}
            onChange={(e) => handleChange('branchCode', e.target.value)}
            required
          />
          <Select
            label="Account Type"
            value={formData.accountType}
            onChange={(e) => handleChange('accountType', e.target.value)}
            required
          >
            <option value="Cheque">Cheque Account</option>
            <option value="Savings">Savings Account</option>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Banking Details
        </Button>
      </div>
    </div>
  );
};

const ServiceSettingsTab = ({ profile, onUpdate }) => {
  const serviceSettings = profile.serviceSettings || {};
  const [formData, setFormData] = useState({
    homeAddress: serviceSettings.homeAddress || '',
    serviceRadius: serviceSettings.serviceRadius || 50,
    transportationType: serviceSettings.transportationType || 'own_transport',
    vehicleDetails: serviceSettings.vehicleDetails || '',
    languages: serviceSettings.languages?.join(', ') || '',
    specialSkills: serviceSettings.specialSkills?.join(', ') || '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    const updatedSettings = {
      ...formData,
      languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
      specialSkills: formData.specialSkills.split(',').map(s => s.trim()).filter(Boolean),
    };
    onUpdate({ serviceSettings: updatedSettings });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Home Address"
              value={formData.homeAddress}
              onChange={(e) => handleChange('homeAddress', e.target.value)}
              helperText="Used to calculate travel distance to jobs"
              required
            />
          </div>
          <Input
            label="Service Radius (km)"
            type="number"
            value={formData.serviceRadius}
            onChange={(e) => handleChange('serviceRadius', e.target.value)}
            helperText="Maximum distance you'll travel for jobs"
            required
          />
          <Select
            label="Transportation Type"
            value={formData.transportationType}
            onChange={(e) => handleChange('transportationType', e.target.value)}
            required
          >
            <option value="own_transport">Own Transport</option>
            <option value="public_transport">Public Transport</option>
            <option value="both">Both</option>
          </Select>
          <div className="md:col-span-2">
            <Input
              label="Vehicle Details"
              value={formData.vehicleDetails}
              onChange={(e) => handleChange('vehicleDetails', e.target.value)}
              helperText="e.g., Toyota Corolla, Silver, CA-123-456"
            />
          </div>
          <Input
            label="Languages"
            value={formData.languages}
            onChange={(e) => handleChange('languages', e.target.value)}
            helperText="Comma-separated (e.g., English, Afrikaans, isiXhosa)"
          />
          <Input
            label="Special Skills"
            value={formData.specialSkills}
            onChange={(e) => handleChange('specialSkills', e.target.value)}
            helperText="Comma-separated areas of expertise"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Service Settings
        </Button>
      </div>
    </div>
  );
};

const AvailabilityTab = ({ profile, onUpdate }) => {
  const availability = profile.availability || {};
  const [workingHours, setWorkingHours] = useState(
    availability.workingHours || {
      monday: { available: true, start: '08:00', end: '17:00' },
      tuesday: { available: true, start: '08:00', end: '17:00' },
      wednesday: { available: true, start: '08:00', end: '17:00' },
      thursday: { available: true, start: '08:00', end: '17:00' },
      friday: { available: true, start: '08:00', end: '17:00' },
      saturday: { available: false, start: '', end: '' },
      sunday: { available: false, start: '', end: '' },
    }
  );

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const handleDayToggle = (day) => {
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        available: !workingHours[day].available,
      },
    });
  };

  const handleTimeChange = (day, field, value) => {
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    onUpdate({ availability: { ...availability, workingHours } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h3>
        <div className="space-y-3">
          {days.map((day) => (
            <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border rounded-lg">
              <div className="flex items-center gap-3 sm:w-40">
                <input
                  type="checkbox"
                  checked={workingHours[day].available}
                  onChange={() => handleDayToggle(day)}
                  className="w-4 h-4"
                />
                <span className="font-medium capitalize">{day}</span>
              </div>
              {workingHours[day].available && (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="time"
                    value={workingHours[day].start}
                    onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-gray-500">to</span>
                  <Input
                    type="time"
                    value={workingHours[day].end}
                    onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                    className="flex-1"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Availability
        </Button>
      </div>
    </div>
  );
};

const VerificationTab = ({ profile }) => {
  const verification = profile.verification || {};

  const verificationItems = [
    { label: 'ID Verification', verified: verification.idVerified, key: 'id' },
    { label: 'Phone Verification', verified: verification.phoneVerified, key: 'phone' },
    { label: 'Address Verification', verified: verification.addressVerified, key: 'address' },
    { label: 'Education Verification', verified: verification.educationVerified, key: 'education' },
    { label: 'Professional Certifications', verified: verification.professionalCertsVerified, key: 'certs' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification & Documents</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-900">
            Verified accounts have higher visibility and trust with clients. Complete all verifications to increase your job opportunities.
          </p>
        </div>

        <div className="space-y-3">
          {verificationItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-medium text-gray-900">{item.label}</span>
              <div className="flex items-center gap-3">
                {item.verified ? (
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </Badge>
                ) : (
                  <>
                    <Badge variant="warning">Pending</Badge>
                    <Button size="sm" variant="outline">
                      Verify Now
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatisticsTab = ({ profile }) => {
  const statistics = profile.statistics || {};

  const stats = [
    { label: 'Rating', value: `${statistics.rating || 0}/5`, icon: BarChart3 },
    { label: 'Total Jobs', value: statistics.totalJobs || 0, icon: BarChart3 },
    { label: 'Completed Jobs', value: statistics.completedJobs || 0, icon: BarChart3 },
    { label: 'Cancelled Jobs', value: statistics.cancelledJobs || 0, icon: BarChart3 },
    { label: 'Response Rate', value: `${statistics.responseRate || 0}%`, icon: BarChart3 },
    { label: 'On-Time Rate', value: `${statistics.onTimeRate || 0}%`, icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RepSettings = () => {
  const { profile, updateProfile } = useRepStore();
  const [activeTab, setActiveTab] = useState('personal');

  const handleUpdate = (updates) => {
    updateProfile(updates);
    // Show success notification (would integrate with uiStore)
    alert('Settings updated successfully!');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User, component: PersonalInformationTab },
    { id: 'banking', label: 'Banking', icon: CreditCard, component: BankingPaymentsTab },
    { id: 'service', label: 'Service Settings', icon: SettingsIcon, component: ServiceSettingsTab },
    { id: 'availability', label: 'Availability', icon: Calendar, component: AvailabilityTab },
    { id: 'verification', label: 'Verification', icon: FileCheck, component: VerificationTab },
    { id: 'statistics', label: 'Statistics', icon: BarChart3, component: StatisticsTab },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div className="space-y-6">
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <Card>
        <div className="border-b overflow-x-auto">
          <div className="flex gap-2 min-w-max px-6">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                icon={tab.icon}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
        </div>

        <Card.Content>
          {ActiveComponent && (
            <ActiveComponent profile={profile} onUpdate={handleUpdate} />
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default RepSettings;
