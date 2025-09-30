import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useEntitiesStore } from '../../stores/entitiesStore';
import { entityTypes } from '../../data/mockData';

const DefaultBadge = () => (
  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">Default</span>
);

const EntityRow = ({ entity, onEdit, onDelete, onSetDefault }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-4 bg-white">
    <div className="space-y-1">
      <div className="flex items-center">
        <h3 className="font-semibold text-gray-900">{entity.name}</h3>
        {entity.isDefault && <DefaultBadge />}
      </div>
      <p className="text-sm text-gray-600">{entity.type}</p>
      <p className="text-sm text-gray-600">{entity.phone} · {entity.email}</p>
      <p className="text-sm text-gray-500">{entity.address}</p>
      <div className="text-xs text-gray-500 flex flex-wrap gap-3 mt-1">
        {entity.cipcNumber && <span>CIPC: {entity.cipcNumber}</span>}
        {entity.csdNumber && <span>CSD: {entity.csdNumber}</span>}
        {entity.taxNumber && <span>Tax: {entity.taxNumber}</span>}
        {entity.vatNumber && <span>VAT: {entity.vatNumber}</span>}
      </div>
    </div>
    <div className="flex flex-col gap-2 mt-3 md:mt-0 md:min-w-[150px]">
      {!entity.isDefault && (
        <Button variant="outline" className="!border-green-600 !text-green-600 hover:!bg-green-50" onClick={() => onSetDefault(entity.id)}>Set as Default</Button>
      )}
      <Button variant="outline" className="!border-gray-400 !text-gray-700 hover:!bg-gray-50" onClick={() => onEdit(entity)}>Edit</Button>
      <Button variant="outline" className="!border-red-600 !text-red-600 hover:!bg-red-50" onClick={() => onDelete(entity.id)}>Delete</Button>
    </div>
  </div>
);

const EntityModal = ({ open, mode, entity, onClose, onSave, error }) => {
  const [form, setForm] = React.useState({
    name: '',
    type: 'Private Company',
    phone: '',
    email: '',
    address: '',
    cipcNumber: '',
    csdNumber: '',
    taxNumber: '',
    vatNumber: '',
    isDefault: false,
  });

  React.useEffect(() => {
    if (entity) {
      setForm({
        name: entity.name || '',
        type: entity.type || 'Private Company',
        phone: entity.phone || '',
        email: entity.email || '',
        address: entity.address || '',
        cipcNumber: entity.cipcNumber || '',
        csdNumber: entity.csdNumber || '',
        taxNumber: entity.taxNumber || '',
        vatNumber: entity.vatNumber || '',
        isDefault: !!entity.isDefault,
      });
    } else {
      setForm((prev) => ({ ...prev, isDefault: false }));
    }
  }, [entity]);

  if (!open) return null;

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Entity name is required';
    if (!form.phone) e.phone = 'Phone number is required';
    if (!form.email) e.email = 'Email address is required';
    if (!form.address) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">{mode === 'edit' ? 'Edit Entity' : 'Add New Entity'}</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>
        </div>
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Entity Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
            />
            <Select
              label="Entity Type"
              required
              options={entityTypes}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
            <Input
              label="Phone Number"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              error={errors.phone}
            />
            <Input
              label="Email Address"
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <div className="md:col-span-2">
              <Input
                label="Address"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                error={errors.address}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Registration Numbers (optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="CIPC Registration Number"
                value={form.cipcNumber}
                onChange={(e) => setForm({ ...form, cipcNumber: e.target.value })}
              />
              <Input
                label="CSD Supplier Number"
                value={form.csdNumber}
                onChange={(e) => setForm({ ...form, csdNumber: e.target.value })}
              />
              <Input
                label="SARS Tax Number"
                value={form.taxNumber}
                onChange={(e) => setForm({ ...form, taxNumber: e.target.value })}
              />
              <Input
                label="VAT Registration Number"
                value={form.vatNumber}
                onChange={(e) => setForm({ ...form, vatNumber: e.target.value })}
              />
            </div>
            <div className="mt-3 flex items-center space-x-2">
              <input
                id="set-default"
                type="checkbox"
                className="accent-blue-600"
                checked={form.isDefault}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              />
              <label htmlFor="set-default" className="text-sm text-gray-700">Set as default</label>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>{mode === 'edit' ? 'Save Changes' : 'Add Entity'}</Button>
        </div>
      </div>
    </div>
  );
};

const ClientEntities = () => {
  const { entities, addEntity, updateEntity, deleteEntity, setDefault } = useEntitiesStore();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState('create');
  const [editingEntity, setEditingEntity] = React.useState(null);
  const [error, setError] = React.useState('');

  const openCreate = () => {
    setEditingEntity(null);
    setModalMode('create');
    setModalOpen(true);
    setError('');
  };
  const openEdit = (entity) => {
    setEditingEntity(entity);
    setModalMode('edit');
    setModalOpen(true);
    setError('');
  };
  const closeModal = () => setModalOpen(false);

  const handleSave = (form) => {
    try {
      if (modalMode === 'create') {
        addEntity(form);
      } else if (editingEntity) {
        updateEntity(editingEntity.id, form);
      }
      setModalOpen(false);
    } catch (e) {
      setError(e.message || 'Failed to save entity');
    }
  };

  const handleDelete = (id) => {
    try {
      deleteEntity(id);
    } catch (e) {
      setError(e.message || 'Cannot delete entity');
    }
  };

  const handleSetDefault = (id) => setDefault(id);

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between mt-6 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Entities</h1>
        </div>
        <Button variant="primary" onClick={openCreate}>Add New Entity</Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">{error}</div>
      )}
      <div className="space-y-3">
        {entities.map((entity) => (
          <EntityRow
            key={entity.id}
            entity={entity}
            onEdit={openEdit}
            onDelete={handleDelete}
            onSetDefault={handleSetDefault}
          />
        ))}
      </div>

      <EntityModal
        open={modalOpen}
        mode={modalMode}
        entity={editingEntity}
        onClose={closeModal}
        onSave={handleSave}
        error={error}
      />
    </div>
  );
};

export default ClientEntities;