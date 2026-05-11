import {
    getAllFields as getFieldsRequest,
    createField as createFieldRequest,
    updateField as updateFieldRequest,
    deleteField as deleteFieldRequest
} from "../../../shared/api";
import { create } from "zustand"
export const useFieldStore = create((set, get) => ({
    fields: [],
    loading: false,
    error: null,
    getFields: async () => {
        try {
            set({
                loading: true,
                error: null
            });
            const response = await getFieldsRequest();
            console.log(response);

            set({
                fields: response?.data.data || [],
                loading: false,
                error: null
            })
        }
        catch (error) {
            set({
                loading: false,
                error: error.message || "An error occurred while fetching fields."
            });
        }
    },

    createField: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await createFieldRequest(data);

            set({
                fields: [response.data.data, ...get().fields],
                loading: false,
                error: null
            });

        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al crear el campo."
            });
        }
    },
    updateField: async (id, data) => {
        try {
            set({ loading: true, error: null });

            const response = await updateFieldRequest(id, data);
            const updated = response.data.data;

            set({
                fields: get().fields.map((f) => f.id === id ? updated : f),
                loading: false,
                error: null
            });

        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al actualizar el campo."
            });
        }
    },
    deleteField: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await deleteFieldRequest(id);

            set({
                fields: get().fields.filter((f) => f.id !== id),
                loading: false,
                error: null
            });

        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al eliminar el campo."
            });
        }
    }
}
))