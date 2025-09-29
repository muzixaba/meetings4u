import React from 'react';
import Card from '../../components/ui/Card';
import { useFormStore } from '../../stores/formStore';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import { useEntitiesStore } from '../../stores/entitiesStore';
import { meetingTypes } from '../../data/mockData';
import { useForm } from 'react-hook-form';
import { attireOptions } from '../../data/mockData';
import { useJobsStore } from '../../stores/jobsStore';
import Button from '../../components/ui/Button';

const steps = [
  'Meeting Details',
  'Requirements',
  'Documents & Attachments',
  'Additional Information',
  'Review & Submit',
];

const TASK_OPTIONS = [
  { value: 'sign_register', label: 'Sign attendance register' },
  { value: 'ask_questions', label: 'Ask specific questions' },
  { value: 'engage_discussions', label: 'Engage in discussions' },
  { value: 'take_photos', label: 'Take photos' },
  { value: 'return_documents', label: 'Return documents' },
];

// Enhance Stepper with progress bar
const Stepper = ({ currentStep }) => (
  <div className="mb-8">
    <div className="flex justify-between mb-3">
      {steps.map((label, idx) => (
        <div key={label} className="flex-1 flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mb-1 ${currentStep === idx + 1
                ? 'bg-blue-600'
                : currentStep > idx + 1
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
          >
            {idx + 1}
          </div>
          <span className={`text-xs text-center ${currentStep === idx + 1 ? 'font-semibold text-blue-700' : 'text-gray-500'}`}>{label}</span>
        </div>
      ))}
    </div>
    <div className="w-full bg-gray-200 rounded h-2">
      <div
        className="bg-blue-600 h-2 rounded"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />
    </div>
  </div>
);

const MeetingDetailsStep = () => {
  const { entities } = useEntitiesStore();
  const { jobForm, updateJobFormData } = useFormStore();
  const defaultValues = {
    meetingType: jobForm.data.meetingType || '',
    selectedEntityId: jobForm.data.selectedEntityId || '',
    dateTime: jobForm.data.dateTime || '',
    address: jobForm.data.location?.address || '',
    agenda: jobForm.data.agenda || '',
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ defaultValues });

  // Sync form state to store on change
  const watched = watch();
  React.useEffect(() => {
    updateJobFormData({
      meetingType: watched.meetingType,
      selectedEntityId: watched.selectedEntityId,
      dateTime: watched.dateTime,
      location: { ...jobForm.data.location, address: watched.address },
      agenda: watched.agenda,
    });
    // eslint-disable-next-line
  }, [watched.meetingType, watched.selectedEntityId, watched.dateTime, watched.address, watched.agenda]);

  return (
    <form className="space-y-6">
      <Select
        label="Meeting Type"
        required
        options={meetingTypes}
        error={errors.meetingType?.message}
        placeholder="Select meeting type"
        helperText="Choose the type that best matches your meeting"
        {...register('meetingType', { required: 'Meeting type is required' })}
      />
      <Select
        label="Entity"
        required
        options={entities.map(e => ({ value: e.id, label: `${e.name} (${e.type})` }))}
        error={errors.selectedEntityId?.message}
        placeholder="Select entity"
        helperText="Jobs are posted on behalf of a specific entity"
        {...register('selectedEntityId', { required: 'Entity is required' })}
      />
      <Input
        label="Date & Time"
        required
        type="datetime-local"
        error={errors.dateTime?.message}
        helperText="Select the meeting start date and time"
        {...register('dateTime', { required: 'Date and time are required' })}
      />
      <Input
        label="Location Address"
        required
        placeholder="Enter meeting address"
        error={errors.address?.message}
        helperText="A precise address helps reps estimate travel"
        {...register('address', { required: 'Address is required' })}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Agenda</label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors border-gray-300"
          rows={3}
          placeholder="Describe the meeting agenda (optional)"
          {...register('agenda')}
        />
      </div>
    </form>
  );
};

const RequirementsStep = () => {
  const { jobForm, updateJobFormRequirements } = useFormStore();
  const requirements = jobForm.data.requirements || {};
  const [tasks, setTasks] = React.useState(requirements.tasks || []);
  const [attire, setAttire] = React.useState(requirements.attire || 'formal');
  const [ppe, setPpe] = React.useState(requirements.ppe || false);
  const [ppeType, setPpeType] = React.useState(requirements.ppeType || '');
  const [specialInstructions, setSpecialInstructions] = React.useState(requirements.specialInstructions || '');
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    updateJobFormRequirements({
      tasks,
      attire,
      ppe,
      ppeType: ppe ? ppeType : '',
      specialInstructions,
    });
    // eslint-disable-next-line
  }, [tasks, attire, ppe, ppeType, specialInstructions]);

  const handleTaskChange = (taskValue) => {
    setTouched(true);
    setTasks((prev) =>
      prev.includes(taskValue)
        ? prev.filter((t) => t !== taskValue)
        : [...prev, taskValue]
    );
  };

  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tasks <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TASK_OPTIONS.map((task) => (
            <label key={task.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={tasks.includes(task.value)}
                onChange={() => handleTaskChange(task.value)}
                className="accent-blue-600"
              />
              <span>{task.label}</span>
            </label>
          ))}
        </div>
        {touched && tasks.length === 0 && (
          <p className="text-sm text-red-600 mt-1">Select at least one task</p>
        )}
      </div>
      <Select
        label="Attire"
        required
        options={attireOptions}
        value={attire}
        onChange={e => setAttire(e.target.value)}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">PPE Required?</label>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={ppe}
            onChange={e => setPpe(e.target.checked)}
            className="accent-blue-600"
            id="ppe-checkbox"
          />
          <label htmlFor="ppe-checkbox" className="text-gray-700">Yes</label>
        </div>
        {ppe && (
          <Input
            label="PPE Type(s)"
            required
            placeholder="e.g. Hard hat, safety boots"
            value={ppeType}
            onChange={e => setPpeType(e.target.value)}
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors border-gray-300"
          rows={3}
          placeholder="Any special instructions for the rep (optional)"
          value={specialInstructions}
          onChange={e => setSpecialInstructions(e.target.value)}
        />
      </div>
    </form>
  );
};

const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_ATTACHMENTS = 10;

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const FileIcon = ({ type }) => {
  if (type === 'application/pdf') return <span className="text-red-500">📄</span>;
  if (type === 'image/jpeg' || type === 'image/png') return <span className="text-blue-500">🖼️</span>;
  if (type.includes('word')) return <span className="text-indigo-500">📃</span>;
  return <span>📁</span>;
};

// Documents & Attachments: dropzone styling + drag-and-drop
const DocumentsAttachmentsStep = () => {
  const { jobForm, updateJobFormData } = useFormStore();
  const [requiredDocs, setRequiredDocs] = React.useState(jobForm.data.requirements?.documents || []);
  const [attachments, setAttachments] = React.useState(jobForm.data.attachments || []);
  const [error, setError] = React.useState('');
  const reqInputRef = React.useRef(null);
  const attInputRef = React.useRef(null);

  const addRequiredFiles = (files) => {
    let newDocs = [...requiredDocs];
    for (let file of files) {
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setError('Invalid file type.');
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError('File too large (max 10MB).');
        continue;
      }
      newDocs.push({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        requiredToPrint: false,
        status: 'ready',
      });
    }
    setRequiredDocs(newDocs);
    setError('');
  };

  const addAttachmentFiles = (files) => {
    let newAtt = [...attachments];
    for (let file of files) {
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setError('Invalid file type.');
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError('File too large (max 10MB).');
        continue;
      }
      if (newAtt.length >= MAX_ATTACHMENTS) {
        setError('Maximum 10 attachments allowed.');
        break;
      }
      newAtt.push({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'ready',
      });
    }
    setAttachments(newAtt);
    setError('');
  };

  const handleRequiredDocs = (e) => addRequiredFiles(Array.from(e.target.files));
  const handleAttachments = (e) => addAttachmentFiles(Array.from(e.target.files));

  const onDropReq = (e) => {
    e.preventDefault();
    addRequiredFiles(Array.from(e.dataTransfer.files));
  };
  const onDropAtt = (e) => {
    e.preventDefault();
    addAttachmentFiles(Array.from(e.dataTransfer.files));
  };

  const removeDoc = (id) => setRequiredDocs(requiredDocs.filter(d => d.id !== id));
  const removeAttachment = (id) => setAttachments(attachments.filter(a => a.id !== id));
  const togglePrint = (id) => setRequiredDocs(requiredDocs.map(d => d.id === id ? { ...d, requiredToPrint: !d.requiredToPrint } : d));

  React.useEffect(() => {
    updateJobFormData({
      requirements: {
        ...jobForm.data.requirements,
        documents: requiredDocs,
      },
      attachments,
    });
    // eslint-disable-next-line
  }, [requiredDocs, attachments]);

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Required Documents Upload (must be printed/signed)</label>
        <div
          className="border-2 border-dashed rounded-lg p-6 text-center bg-white hover:bg-gray-50 cursor-pointer"
          onClick={() => reqInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropReq}
          aria-label="Drop required documents here or click to browse"
        >
          <p className="text-sm text-gray-600">Drag & drop files here, or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG, DOC, DOCX (max 10MB)</p>
          <input
            ref={reqInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            multiple
            onChange={handleRequiredDocs}
            className="hidden"
          />
        </div>
        <div className="space-y-2 mt-3">
          {requiredDocs.map(doc => (
            <div key={doc.id} className="flex items-center justify-between bg-gray-50 rounded p-2 border">
              <div className="flex items-center gap-2">
                <FileIcon type={doc.type} />
                <span className="font-medium">{doc.name}</span>
                <span className="text-xs text-gray-500">({formatBytes(doc.size)})</span>
                <label className="ml-4 flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={doc.requiredToPrint}
                    onChange={() => togglePrint(doc.id)}
                    className="accent-blue-600 mr-1"
                  />
                  Required to print
                </label>
              </div>
              <button type="button" className="text-red-500 hover:underline ml-2" onClick={() => removeDoc(doc.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Job Attachments Upload (optional, max 10, 10MB each)</label>
        <div
          className="border-2 border-dashed rounded-lg p-6 text-center bg-white hover:bg-gray-50 cursor-pointer"
          onClick={() => attInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropAtt}
          aria-label="Drop attachments here or click to browse"
        >
          <p className="text-sm text-gray-600">Drag & drop files here, or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG, DOC, DOCX (max 10MB)</p>
          <input
            ref={attInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            multiple
            onChange={handleAttachments}
            className="hidden"
          />
        </div>
        <div className="space-y-2 mt-3">
          {attachments.map(att => (
            <div key={att.id} className="flex items-center justify-between bg-gray-50 rounded p-2 border">
              <div className="flex items-center gap-2">
                <FileIcon type={att.type} />
                <span className="font-medium">{att.name}</span>
                <span className="text-xs text-gray-500">({formatBytes(att.size)})</span>
                <span className="ml-2 text-xs text-gray-400">{att.status}</span>
              </div>
              <button type="button" className="text-red-500 hover:underline ml-2" onClick={() => removeAttachment(att.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
};

const AdditionalInfoStep = () => {
  const { jobForm, updateJobFormData } = useFormStore();
  const [notes, setNotes] = React.useState(jobForm.data.additionalNotes || '');
  const maxChars = 500;
  const charsLeft = maxChars - notes.length;

  React.useEffect(() => {
    updateJobFormData({ additionalNotes: notes });
    // eslint-disable-next-line
  }, [notes]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Additional Notes
      </label>
      <textarea
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors border-gray-300 ${notes.length > maxChars ? 'border-red-500' : ''}`}
        rows={5}
        placeholder="Special instructions for the rep, parking info, security requirements, contact person, etc. (max 500 characters)"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        maxLength={maxChars + 1}
      />
      <div className="flex justify-between items-center text-xs mt-1">
        <span className={charsLeft < 0 ? 'text-red-500' : 'text-gray-500'}>
          {charsLeft} characters left
        </span>
        {charsLeft < 0 && <span className="text-red-500">Character limit exceeded!</span>}
      </div>
    </div>
  );
};

// Review: use Button for submit
const ReviewSubmitStep = () => {
  const { jobForm } = useFormStore();
  const { entities } = useEntitiesStore();
  const addJob = useJobsStore(state => state.addJob);
  const setJobFormStep = useFormStore(state => state.setJobFormStep);
  const resetJobForm = useFormStore(state => state.resetJobForm);

  const data = jobForm.data;
  const selectedEntity = entities.find(e => e.id === data.selectedEntityId);

  const handleSubmit = () => {
    const payload = {
      selectedEntityId: data.selectedEntityId,
      meetingType: data.meetingType,
      dateTime: data.dateTime,
      location: data.location,
      requirements: data.requirements,
      attachments: data.attachments,
      additionalNotes: data.additionalNotes,
    };
    addJob(payload);
    alert('Job posted successfully (mock).');
    resetJobForm();
  };

  return (
    <div className="space-y-6">
      {/* Overview, Requirements, Documents, Notes sections unchanged */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
        <button className="text-blue-600 hover:underline text-sm" onClick={() => setJobFormStep(1)}>Edit</button>
      </div>
      <div className="bg-gray-50 rounded p-4 border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Entity</p>
            <p className="font-medium">{selectedEntity ? `${selectedEntity.name} (${selectedEntity.type})` : '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Meeting Type</p>
            <p className="font-medium">{data.meetingType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="font-medium">{data.dateTime || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{data.location?.address || '—'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
        <button className="text-blue-600 hover:underline text-sm" onClick={() => setJobFormStep(2)}>Edit</button>
      </div>
      <div className="bg-gray-50 rounded p-4 border space-y-2">
        <p><span className="text-sm text-gray-500">Attire:</span> <span className="font-medium">{data.requirements?.attire || '—'}</span></p>
        <p><span className="text-sm text-gray-500">PPE:</span> <span className="font-medium">{data.requirements?.ppe ? `Yes (${data.requirements?.ppeType || ''})` : 'No'}</span></p>
        <div>
          <p className="text-sm text-gray-500">Tasks:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {(data.requirements?.tasks || []).map(t => (
              <span key={t} className="text-xs bg-white border rounded px-2 py-1">{t}</span>
            ))}
          </div>
        </div>
        {data.requirements?.specialInstructions && (
          <div>
            <p className="text-sm text-gray-500">Special Instructions:</p>
            <p className="mt-1">{data.requirements.specialInstructions}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
        <button className="text-blue-600 hover:underline text-sm" onClick={() => setJobFormStep(3)}>Edit</button>
      </div>
      <div className="bg-gray-50 rounded p-4 border space-y-2">
        <div>
          <p className="text-sm text-gray-500 mb-1">Required Documents</p>
          <div className="space-y-1">
            {(data.requirements?.documents || []).map(d => (
              <div key={d.id} className="flex items-center justify-between">
                <span className="text-sm">{d.name}</span>
                <span className="text-xs text-gray-500">{d.requiredToPrint ? 'Print' : 'Reference'}</span>
              </div>
            ))}
            {(!data.requirements?.documents || data.requirements?.documents.length === 0) && (
              <p className="text-sm text-gray-500">No required documents</p>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Attachments</p>
          <div className="space-y-1">
            {(data.attachments || []).map(a => (
              <div key={a.id} className="flex items-center justify-between">
                <span className="text-sm">{a.name}</span>
                <span className="text-xs text-gray-500">{(a.size / (1024 * 1024)).toFixed(1)} MB</span>
              </div>
            ))}
            {(!data.attachments || data.attachments.length === 0) && (
              <p className="text-sm text-gray-500">No attachments</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Additional Notes</h3>
        <button className="text-blue-600 hover:underline text-sm" onClick={() => setJobFormStep(4)}>Edit</button>
      </div>
      <div className="bg-gray-50 rounded p-4 border">
        <p className="text-sm whitespace-pre-wrap">{data.additionalNotes || '—'}</p>
      </div>

      <div className="flex items-center justify-end">
        <Button
          variant="primary"
          onClick={handleSubmit}
        >
          Submit Job
        </Button>
      </div>
    </div>
  );
};

const PostJob = () => {
  const { jobForm, setJobFormStep, validateJobFormStep } = useFormStore();
  const { currentStep } = jobForm;

  const handlePrev = () => {
    if (currentStep > 1) setJobFormStep(currentStep - 1);
  };
  const handleNext = () => {
    if (!validateJobFormStep(currentStep)) {
      alert('Please complete required fields before continuing.');
      return;
    }
    if (currentStep < steps.length) setJobFormStep(currentStep + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-6">Post New Job</h1>
      <Card>
        <Card.Content>
          <Stepper currentStep={currentStep} />
          <div className="min-h-[300px] flex items-center justify-center text-gray-400">
            {currentStep === 1 ? (
              <div className="w-full">
                <MeetingDetailsStep />
              </div>
            ) : currentStep === 2 ? (
              <div className="w-full">
                <RequirementsStep />
              </div>
            ) : currentStep === 3 ? (
              <div className="w-full">
                <DocumentsAttachmentsStep />
              </div>
            ) : currentStep === 4 ? (
              <div className="w-full">
                <AdditionalInfoStep />
              </div>
            ) : (
              <div className="w-full">
                <ReviewSubmitStep />
              </div>
            )}
          </div>
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentStep === steps.length}
            >
              Next
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default PostJob;