const API_BASE = 'http://localhost:5000/api';

const api = {
    // Auth
    login: async (studentId, password) => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000); // ← timeout fix
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId, password }),
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) throw new Error('Invalid credentials');
            const data = await res.json();
            localStorage.setItem('studentId', data._id);
            localStorage.setItem('studentData', JSON.stringify(data));
            return data;
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    // Teacher Auth
    teacherLogin: async (teacherId, password) => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teacherId, password }),
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Login failed');
            }
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            if (err.name === 'AbortError') {
                throw new Error('Teacher login request timed out. Please try again.');
            }
            throw err;
        }
    },

    teacherRegister: async (teacherData) => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teacherData),
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Registration failed');
            }
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    // Teacher API calls with auth
    getTeacherProfile: async () => {
        const token = localStorage.getItem('teacherToken');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) throw new Error('Unauthorized');
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    getTeacherDashboard: async () => {
        const token = localStorage.getItem('teacherToken');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) throw new Error('Failed to load dashboard');
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    // Student Management
    getStudents: async () => {
        const token = localStorage.getItem('teacherToken');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/students`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) throw new Error('Failed to load students');
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    addStudent: async (studentData) => {
        const token = localStorage.getItem('teacherToken');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/students`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData),
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to add student');
            }
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    // Attendance Management
    updateAttendance: async (attendanceData) => {
        const token = localStorage.getItem('teacherToken');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/attendance`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(attendanceData),
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to update attendance');
            }
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    bulkUpdateAttendance: async (bulkData) => {
        const token = localStorage.getItem('teacherToken');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/attendance/bulk`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bulkData),
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to update attendance');
            }
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    // Notes Management
    uploadNotes: async (noteData) => {
        const token = localStorage.getItem('teacherToken');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/notes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noteData),
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to upload notes');
            }
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    getNotes: async () => {
        const token = localStorage.getItem('teacherToken');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/notes`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) throw new Error('Failed to load notes');
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    // Resources Management
    addResource: async (resourceData) => {
        const token = localStorage.getItem('teacherToken');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/resources`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resourceData),
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to add resource');
            }
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    getResources: async () => {
        const token = localStorage.getItem('teacherToken');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${API_BASE}/teacher/resources`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timer);
            if (!res.ok) throw new Error('Failed to load resources');
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    },

    logout: () => {
        localStorage.removeItem('studentId');
        localStorage.removeItem('studentData');
        window.location.href = 'login.html'; // ← heads up: your login page is index.html, not login.html
    },

    ensureAuth: () => {
        const id = localStorage.getItem('studentId');
        if (!id && !window.location.href.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return id;
    },

    getDashboard: async () => {
        const id = api.ensureAuth();
        const res = await fetch(`${API_BASE}/dashboard/${id}`);
        return await res.json();
    },

    getTimetable: async (group = 'D3IT_B2') => {
        const res = await fetch(`${API_BASE}/timetable/${group}`);
        return await res.json();
    },

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
