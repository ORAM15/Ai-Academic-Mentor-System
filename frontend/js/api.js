// API Wrapper for Frontend

const API_BASE = 'http://localhost:5000/api';

const api = {
    // Auth
    login: async (studentId, password) => {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, password })
        });
        if(!res.ok) throw new Error('Invalid credentials');
        const data = await res.json();
        localStorage.setItem('studentId', data._id);
        localStorage.setItem('studentData', JSON.stringify(data));
        return data;
    },

    logout: () => {
        localStorage.removeItem('studentId');
        localStorage.removeItem('studentData');
        window.location.href = 'login.html';
    },

    ensureAuth: () => {
        const id = localStorage.getItem('studentId');
        if(!id && !window.location.href.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return id;
    },

    // Dashboard & Attendance
    getDashboard: async () => {
        const id = api.ensureAuth();
        const res = await fetch(`${API_BASE}/dashboard/${id}`);
        return await res.json();
    },

    // Timetable
    getTimetable: async (group = 'D3IT_B2') => {
        const res = await fetch(`${API_BASE}/timetable/${group}`);
        return await res.json();
    },

    // Tasks
    getTasks: async () => {
        const id = api.ensureAuth();
        const res = await fetch(`${API_BASE}/tasks/${id}`);
        return await res.json();
    },

    createTask: async (taskData) => {
        const id = api.ensureAuth();
        const res = await fetch(`${API_BASE}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...taskData, studentId: id })
        });
        return await res.json();
    },

    // AI
    generateReport: async (contextData) => {
        const res = await fetch(`${API_BASE}/generate-report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contextData)
        });
        return await res.json();
    }
};

window.api = api;
