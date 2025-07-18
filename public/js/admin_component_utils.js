// Admin Component Utils
// Functions to render admin panel components

/**
 * Render the admin sidebar
 * @returns {string} HTML string for the sidebar
 */
function renderAdminSidebar() {
    return `
    <!-- Sidebar -->
    <div id="sidebar"
        class="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out">
        <!-- Logo -->
        <div class="p-4 border-b border-gray-700">
            <div class="flex items-center gap-3 cursor-pointer" onclick="window.location.href = '/admin'">
                <img src="/images/4WORK%20LOGO%20-%20%20SVG-05.svg" alt="logo" width="100" height="50" />
                <p class="text-base font-bold uppercase text-white">
                    Template Manager
                </p>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="mt-4">
            <div class="px-4 mb-4">
                <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</h3>
            </div>

            <ul class="space-y-1">
                <li>
                    <div class="menu-item">
                        <button class="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors w-full" onclick="toggleSubmenu('categories')">
                            <i class="fas fa-tags w-5 h-5 mr-3"></i>
                            <span>Categories</span>
                            <i class="fas fa-chevron-right ml-auto text-xs transition-transform duration-200" id="categories-chevron"></i>
                        </button>
                        <ul class="ml-8 mt-1 space-y-1 hidden" id="categories-submenu">
                            <li>
                                <a href="/admin/categories" class="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">List</a>
                            </li>
                            <li>
                                <a href="/admin/categories/add" class="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">Add</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div class="menu-item">
                        <button class="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors w-full" onclick="toggleSubmenu('templates')">
                            <i class="fas fa-layer-group w-5 h-5 mr-3"></i>
                            <span>Templates</span>
                            <i class="fas fa-chevron-right ml-auto text-xs transition-transform duration-200" id="templates-chevron"></i>
                        </button>
                        <ul class="ml-8 mt-1 space-y-1 hidden" id="templates-submenu">
                            <li>
                                <a href="/admin/templates" class="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">List</a>
                            </li>
                            <li>
                                <a href="/admin/templates/add" class="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">Add</a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
    `;
}

/**
 * Render the sidebar overlay for mobile
 * @returns {string} HTML string for the sidebar overlay
 */
function renderSidebarOverlay() {
    return `
    <!-- Overlay for mobile -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:hidden"></div>
    `;
}

/**
 * Render the admin header
 * @returns {string} HTML string for the header
 */
function renderAdminHeader() {
    return `
    <!-- Top Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-6 py-4">
            <div class="flex flex-row items-center space-x-4">
                <!-- Mobile menu button -->
                <button id="menu-toggle" class="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
                    <i class="fas fa-bars text-xl"></i>
                </button>
                <div
                    className="relative flex flex-wrap items-stretch w-[50%] md:w-full transition-all rounded-lg ease-soft">
                    <input type="text"
                        class="pl-4 text-sm focus:shadow-soft-primary-outline ease-soft leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                        placeholder="Type here..." />
                </div>
            </div>

            <div class="flex items-center space-x-4">
                <div class="relative">
                    <button class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                        <img src="https://cdn.4wk.vn/mainfiles/avatar-default.png" alt="Avatar"
                            class="w-8 h-8 rounded-full">
                        <span>Admin</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
    `;
}

/**
 * Render the main content wrapper
 * @returns {string} HTML string for the main content wrapper
 */
function renderMainContentWrapper() {
    return `
    <!-- Main Content -->
    <div id="main-content" class="md:ml-64 min-h-screen">
    `;
}

/**
 * Close main content wrapper
 * @returns {string} HTML string to close main content wrapper
 */
function closeMainContentWrapper() {
    return `
    </div>
    `;
}

/**
 * Initialize admin panel functionality
 * This function should be called after the DOM is loaded
 */
function initAdminPanel() {
    // Mobile menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mainContent = document.getElementById('main-content');

    // Toggle sidebar
    function toggleSidebar() {
        const isOpen = !sidebar.classList.contains('-translate-x-full');

        if (isOpen) {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        } else {
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('hidden');
        }
    }

    // Toggle submenu functionality
    window.toggleSubmenu = function(menuId) {
        const submenu = document.getElementById(menuId + '-submenu');
        const chevron = document.getElementById(menuId + '-chevron');
        
        if (submenu.classList.contains('hidden')) {
            submenu.classList.remove('hidden');
            chevron.style.transform = 'rotate(90deg)';
        } else {
            submenu.classList.add('hidden');
            chevron.style.transform = 'rotate(0deg)';
        }
    }

    // Event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    // Close sidebar on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        }
    });
}
