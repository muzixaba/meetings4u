import { create } from 'zustand';
import { mockEntities } from '../data/mockData';

export const useEntitiesStore = create((set, get) => ({
  // State
  entities: mockEntities,
  selectedEntity: mockEntities.find(e => e.isDefault) || mockEntities[0],
  loading: false,
  error: null,

  // Actions
  setEntities: (entities) => {
    const defaultEntity = entities.find(e => e.isDefault) || entities[0];
    set({
      entities,
      selectedEntity: defaultEntity,
      loading: false
    });
  },

  selectEntity: (entityId) => {
    const entity = get().entities.find(e => e.id === entityId);
    set({ selectedEntity: entity });
  },

  addEntity: (entityData) => {
    const newEntity = {
      id: "entity_" + Date.now(),
      ...entityData,
      isDefault: get().entities.length === 0 // First entity becomes default
    };

    set((state) => ({
      entities: [...state.entities, newEntity],
      selectedEntity: newEntity.isDefault ? newEntity : state.selectedEntity
    }));

    return newEntity;
  },

  updateEntity: (entityId, updates) => set((state) => ({
    entities: state.entities.map(e =>
      e.id === entityId ? { ...e, ...updates } : e
    ),
    selectedEntity: state.selectedEntity?.id === entityId
      ? { ...state.selectedEntity, ...updates }
      : state.selectedEntity
  })),

  deleteEntity: (entityId) => {
    const { entities, selectedEntity } = get();
    if (entities.length <= 1) {
      throw new Error("Cannot delete the last entity");
    }

    const remainingEntities = entities.filter(e => e.id !== entityId);
    const newSelectedEntity = selectedEntity?.id === entityId
      ? remainingEntities[0]
      : selectedEntity;

    set({
      entities: remainingEntities,
      selectedEntity: newSelectedEntity
    });
  },

  setDefault: (entityId) => set((state) => ({
    entities: state.entities.map(e => ({
      ...e,
      isDefault: e.id === entityId
    })),
    selectedEntity: state.entities.find(e => e.id === entityId)
  }))
}));