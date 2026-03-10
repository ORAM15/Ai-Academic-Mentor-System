// Make components generic enough for both modes
// Inject navbar, replacing bottom Nav HTML to include 'Subjects' where 'Attendance' was if needed, or keeping it the same.
// The prompt asked for: Login, Dashboard, Subjects, Timetable, Attendance, Performance, LMS.
// Our bottom nav only fits 5 items perfectly. 
// Dashboard, Timetable, Subjects, Performance, LMS 
// We will replace "Notes" with LMS, and maybe move Attendance inside Performance or Dashboard. 

function createBottomNav(activePage = 'home') {
    const navHTML = `
    <nav class="glass-nav fixed bottom-0 left-0 w-full px-4 py-4 rounded-t-3xl z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <ul class="flex justify-between items-center relative">
            <li>
                <a href="dashboard.html" class="nav-item flex flex-col items-center gap-1 ${activePage === 'home' ? 'active' : 'text-gray-500 hover:text-white'}">
                    <i class="fa-solid fa-house nav-icon text-xl transition-all"></i>
                    <span class="text-[10px] font-medium">Home</span>
                    <div class="nav-indicator h-1 w-full bg-neonPurple rounded-t-md absolute bottom-[-16px] transition-all opacity-0 ${activePage === 'home' ? 'opacity-100 scale-x-100' : 'scale-x-0'}"></div>
                </a>
            </li>
            <li>
                <a href="timetable.html" class="nav-item flex flex-col items-center gap-1 ${activePage === 'timetable' ? 'active' : 'text-gray-500 hover:text-white'}">
                    <i class="fa-solid fa-calendar nav-icon text-xl transition-all"></i>
                    <span class="text-[10px] font-medium">Schedule</span>
                    <div class="nav-indicator h-1 w-full bg-neonPurple rounded-t-md absolute bottom-[-16px] transition-all opacity-0 ${activePage === 'timetable' ? 'opacity-100 scale-x-100' : 'scale-x-0'}"></div>
                </a>
            </li>
            <li>
                <!-- FAB center button -->
                <a href="attendance.html" class="relative -top-6 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-neonPurple to-tealHigh shadow-[0_4px_20px_rgba(0,240,255,0.4)] text-white hover:scale-110 transition-transform">
                    <i class="fa-solid fa-chart-pie text-2xl"></i>
                </a>
            </li>
            <li>
                <a href="tasks.html" class="nav-item flex flex-col items-center gap-1 ${activePage === 'tasks' ? 'active' : 'text-gray-500 hover:text-white'}">
                    <i class="fa-solid fa-bullseye nav-icon text-xl transition-all"></i>
                    <span class="text-[10px] font-medium">Goals</span>
                    <div class="nav-indicator h-1 w-full bg-neonPurple rounded-t-md absolute bottom-[-16px] transition-all opacity-0 ${activePage === 'tasks' ? 'opacity-100 scale-x-100' : 'scale-x-0'}"></div>
                </a>
            </li>
            <li>
                <a href="performance.html" class="nav-item flex flex-col items-center gap-1 ${activePage === 'performance' ? 'active' : 'text-gray-500 hover:text-white'}">
                    <i class="fa-solid fa-chart-line nav-icon text-xl transition-all"></i>
                    <span class="text-[10px] font-medium">Analytics</span>
                    <div class="nav-indicator h-1 w-full bg-neonPurple rounded-t-md absolute bottom-[-16px] transition-all opacity-0 ${activePage === 'performance' ? 'opacity-100 scale-x-100' : 'scale-x-0'}"></div>
                </a>
            </li>
        </ul>
    </nav>
    <div class="h-24"></div> 
    `;
    return navHTML;
}

document.addEventListener("DOMContentLoaded", () => {
    if (!window.location.pathname.endsWith('login.html') && !window.location.pathname.endsWith('/')) {
        let currentPage = 'home';
        if(window.location.pathname.includes('timetable')) currentPage = 'timetable';
        if(window.location.pathname.includes('attendance')) currentPage = 'attendance';
        if(window.location.pathname.includes('tasks')) currentPage = 'tasks';
        if(window.location.pathname.includes('performance')) currentPage = 'performance';
        
        const navContainer = document.createElement('div');
        navContainer.innerHTML = createBottomNav(currentPage);
        document.body.appendChild(navContainer);
    }
});
