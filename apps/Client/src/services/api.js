const API_URL = "http://localhost:8000/api";

/**
 * Standardized fetch wrapper that always includes credentials
 * to ensure JWT cookies are sent with every request.
 */
export const apiFetch = async (endpoint, options = {}) => {
    const config = {
        ...options,
        // CRITICAL: This allows HTTP-only cookies to be sent cross-origin
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    };

    if (options.body && typeof options.body !== "string") {
        config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || "An error occurred");
    }

    return data;
};

// Auth API Methods
export const authApi = {
    login: (email, password) => apiFetch("/auth/login", { method: "POST", body: { email, password } }),
    register: (user_name, email, password) => apiFetch("/auth/register", { method: "POST", body: { user_name, email, password } }),
    logout: () => apiFetch("/auth/logout", { method: "POST" }),
    check: () => apiFetch("/auth/check", { method: "GET" }),
};

// Workspace API Methods
export const workspaceApi = {
    getAll: () => apiFetch("/workspaces", { method: "GET" }),
    create: (name, icon) => apiFetch("/workspaces", { method: "POST", body: { name, icon } }),
    delete: (id) => apiFetch(`/workspaces/${id}`, { method: "DELETE" }),
};

// Notes API Methods
export const notesApi = {
    getAll: async (workspaceId) => {
        const res = await apiFetch(`/notes${workspaceId ? `?workspace_id=${workspaceId}` : ''}`, { method: "GET" });
        if (res.notes) {
            res.notes = res.notes.map(n => ({ ...n, content: n.description || "" }));
        }
        return res;
    },
    create: async (title, workspace_id, content = "") => {
        const res = await apiFetch("/notes", { method: "POST", body: { title, workspace_id, description: content } });
        if (res.note) {
            res.note.content = res.note.description || "";
        }
        return res;
    },
    update: (id, updates) => {
        const payload = { ...updates };
        if (payload.content !== undefined) {
            payload.description = payload.content;
            delete payload.content;
        }
        return apiFetch(`/notes/${id}`, { method: "PATCH", body: payload });
    },
    bulkDelete: (noteIds) => apiFetch("/notes/bulk-delete", { method: "POST", body: { note_ids: noteIds } }),
    
    // Trash Methods
    getTrashed: async () => {
        const res = await apiFetch("/notes/trash", { method: "GET" });
        if (res.notes) {
            res.notes = res.notes.map(n => ({ ...n, content: n.description || "" }));
        }
        return res;
    },
    restore: (noteIds) => apiFetch("/notes/restore", { method: "POST", body: { note_ids: noteIds } }),
    hardDelete: (noteIds) => apiFetch("/notes/hard-delete", { method: "POST", body: { note_ids: noteIds } }),
};
