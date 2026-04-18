// Toast Notification System
const toastSystem = {
    show: function(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        const icon = type === 'success' ? 'fa-check' : type === 'error' ? 'fa-xmark' : 'fa-info-circle';
        
        toast.className = `fixed bottom-32 left-4 right-4 max-w-md ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg toast-notification flex items-center gap-3 z-40`;
        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    success: function(msg, duration = 3000) {
        this.show(msg, 'success', duration);
    },
    
    error: function(msg, duration = 3000) {
        this.show(msg, 'error', duration);
    },
    
    info: function(msg, duration = 3000) {
        this.show(msg, 'info', duration);
    }
};

// Make it global
window.toast = toastSystem;
