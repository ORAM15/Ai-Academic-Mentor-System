// Bottom Navigation with all new features
function createBottomNav(activePage = 'home') {
    const navHTML = `
    <nav class="glass-nav fixed bottom-0 left-0 w-full px-2 py-3 rounded-t-3xl z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div class="flex justify-center gap-1 overflow-x-auto hide-scrollbar">
            <a href="dashboard.html" class="nav-item flex flex-col items-center gap-1 px-3 py-2 ${activePage === 'home' ? 'text-neonPurple' : 'text-gray-500 hover:text-white'} transition-all">
                <i class="fa-solid fa-house nav-icon text-lg"></i>
                <span class="text-[9px] font-medium whitespace-nowrap">Home</span>
            </a>
            <a href="subjects.html" class="nav-item flex flex-col items-center gap-1 px-3 py-2 ${activePage === 'subjects' ? 'text-neonPurple' : 'text-gray-500 hover:text-white'} transition-all">
                <i class="fa-solid fa-book nav-icon text-lg"></i>
                <span class="text-[9px] font-medium whitespace-nowrap">Subjects</span>
            </a>
            <a href="attendance.html" class="nav-item flex flex-col items-center gap-1 px-3 py-2 ${activePage === 'attendance' ? 'text-neonPurple' : 'text-gray-500 hover:text-white'} transition-all">
                <i class="fa-solid fa-chart-pie nav-icon text-lg"></i>
                <span class="text-[9px] font-medium whitespace-nowrap">Attend</span>
            </a>
            <a href="tasks.html" class="nav-item flex flex-col items-center gap-1 px-3 py-2 ${activePage === 'tasks' ? 'text-neonPurple' : 'text-gray-500 hover:text-white'} transition-all">
                <i class="fa-solid fa-circle-check nav-icon text-lg"></i>
                <span class="text-[9px] font-medium whitespace-nowrap">Goals</span>
            </a>
            <a href="notes.html" class="nav-item flex flex-col items-center gap-1 px-3 py-2 ${activePage === 'notes' ? 'text-neonPurple' : 'text-gray-500 hover:text-white'} transition-all">
                <i class="fa-solid fa-note-sticky nav-icon text-lg"></i>
                <span class="text-[9px] font-medium whitespace-nowrap">Notes</span>
            </a>
            <a href="analytics.html" class="nav-item flex flex-col items-center gap-1 px-3 py-2 ${activePage === 'analytics' ? 'text-neonPurple' : 'text-gray-500 hover:text-white'} transition-all">
                <i class="fa-solid fa-chart-line nav-icon text-lg"></i>
                <span class="text-[9px] font-medium whitespace-nowrap">Analytics</span>
            </a>
            <a href="achievements.html" class="nav-item flex flex-col items-center gap-1 px-3 py-2 ${activePage === 'achievements' ? 'text-neonPurple' : 'text-gray-500 hover:text-white'} transition-all">
                <i class="fa-solid fa-trophy nav-icon text-lg"></i>
                <span class="text-[9px] font-medium whitespace-nowrap">Achieve</span>
            </a>
            <a href="resources.html" class="nav-item flex flex-col items-center gap-1 px-3 py-2 ${activePage === 'resources' ? 'text-neonPurple' : 'text-gray-500 hover:text-white'} transition-all">
                <i class="fa-solid fa-book-open nav-icon text-lg"></i>
                <span class="text-[9px] font-medium whitespace-nowrap">Resources</span>
            </a>
        </div>
    </nav>
    <div class="h-24"></div> 
    `;
    return navHTML;
}
}

document.addEventListener("DOMContentLoaded", () => {
    if (!window.location.pathname.endsWith('login.html') && !window.location.pathname.endsWith('register.html') && !window.location.pathname.endsWith('/')) {
        let currentPage = 'home';
        const path = window.location.pathname.toLowerCase();
        
        if(path.includes('subjects')) currentPage = 'subjects';
        if(path.includes('timetable')) currentPage = 'timetable';
        if(path.includes('attendance')) currentPage = 'attendance';
        if(path.includes('tasks')) currentPage = 'tasks';
        if(path.includes('notes')) currentPage = 'notes';
        if(path.includes('analytics')) currentPage = 'analytics';
        if(path.includes('achievements')) currentPage = 'achievements';
        if(path.includes('resources')) currentPage = 'resources';
        if(path.includes('performance')) currentPage = 'performance';
        if(path.includes('dashboard')) currentPage = 'home';
        
        const navContainer = document.createElement('div');
        navContainer.innerHTML = createBottomNav(currentPage);
        document.body.appendChild(navContainer);
    }
});
