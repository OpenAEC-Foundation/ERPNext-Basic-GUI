// =============================================================================
// ERPNext Basic GUI - Sidebar Customizations
// =============================================================================
// A simplified, customizable sidebar with workspace redirects
// https://github.com/OpenAEC-Foundation/ERPNext-Basic-GUI
// =============================================================================

(function() {
    'use strict';
    
    // =========================================================================
    // CONFIGURATION - CUSTOMIZE THIS SECTION
    // =========================================================================
    
    /**
     * Navigation links for the custom sidebar.
     * 
     * Each item can have:
     * - label: Display text
     * - icon: Frappe icon name (home, list, gantt, share-people, stock, file, 
     *         income, calendar, hr, setting, accounting, etc.)
     * - route: URL path to navigate to
     * - workspace: (optional) Workspace name that should redirect to this route
     * - divider: Set to true to add a visual separator
     */
    const WORKSPACE_LINKS = [
        { label: "Home", icon: "home", route: "/app/home" },
        { label: "Quotations", icon: "list", route: "/app/quotation", workspace: "Quotations" },
        { label: "Projects", icon: "gantt", route: "/app/project", workspace: "Projects" },
        { label: "Customers", icon: "share-people", route: "/app/customer", workspace: "Customers" },
        { label: "Suppliers", icon: "stock", route: "/app/supplier", workspace: "Suppliers" },
        { label: "Purchase Invoices", icon: "file", route: "/app/purchase-invoice", workspace: "Purchase Invoices" },
        { label: "Sales Invoices", icon: "income", route: "/app/sales-invoice", workspace: "Sales Invoices" },
        { label: "Timesheets", icon: "calendar", route: "/app/timesheet", workspace: "Timesheets" },
        { label: "Employees", icon: "hr", route: "/app/employee", workspace: "Employees" },
        { label: "Users", icon: "setting", route: "/app/user", workspace: "Users" },
        { label: "ToDo", icon: "check", route: "/app/todo", workspace: "ToDo" },
        { divider: true },
        { label: "Bank Transactions", icon: "accounting", route: "/app/bank-transaction", workspace: "Bank Transactions" },
        { label: "GL Entry", icon: "file", route: "/app/gl-entry", workspace: "GL Entry" }
    ];
    
    // =========================================================================
    // WORKSPACE REDIRECT - Redirects workspace pages to doctype lists
    // =========================================================================
    
    // Build redirect map from WORKSPACE_LINKS
    const WORKSPACE_REDIRECTS = {};
    WORKSPACE_LINKS.forEach(function(item) {
        if (item.workspace) {
            WORKSPACE_REDIRECTS[item.workspace] = item.route;
        }
    });
    
    function checkAndRedirect() {
        const route = frappe.get_route();
        if (route && route[0] === "Workspaces" && route[1]) {
            const workspaceName = decodeURIComponent(route[1]);
            if (WORKSPACE_REDIRECTS[workspaceName]) {
                window.location.href = WORKSPACE_REDIRECTS[workspaceName];
            }
        }
    }
    
    // =========================================================================
    // CUSTOM SIDEBAR - Shows navigation links on all pages
    // =========================================================================
    
    function createCustomSidebar() {
        // Don't create if already exists
        if ($('.basic-gui-sidebar').length) {
            return;
        }
        
        const $layoutSide = $('.layout-side-section');
        if (!$layoutSide.length) {
            return;
        }
        
        // Hide default sidebar content
        $layoutSide.find('.list-sidebar, .sidebar-menu, .list-filters').hide();
        
        // Build sidebar HTML
        let sidebarHtml = '<div class="basic-gui-sidebar">';
        sidebarHtml += '<div class="basic-gui-sidebar-header">Navigation</div>';
        sidebarHtml += '<ul class="basic-gui-sidebar-list">';
        
        WORKSPACE_LINKS.forEach(function(item) {
            if (item.divider) {
                sidebarHtml += '<li class="basic-gui-sidebar-divider"></li>';
            } else {
                const currentPath = window.location.pathname;
                const isActive = currentPath === item.route || 
                                 currentPath.startsWith(item.route + '/');
                sidebarHtml += `
                    <li class="basic-gui-sidebar-item ${isActive ? 'active' : ''}">
                        <a href="${item.route}">
                            <svg class="icon icon-sm"><use href="#icon-${item.icon}"></use></svg>
                            <span>${item.label}</span>
                        </a>
                    </li>
                `;
            }
        });
        
        sidebarHtml += '</ul></div>';
        $layoutSide.prepend(sidebarHtml);
    }
    
    function updateSidebarVisibility() {
        const route = frappe.get_route();
        if (!route) return;
        
        const isListView = route[0] === 'List';
        const isFormView = route[0] === 'Form';
        
        if (isListView || isFormView) {
            $('.list-sidebar').hide();
            $('.sidebar-menu').hide();
            setTimeout(createCustomSidebar, 100);
        }
    }
    
    // =========================================================================
    // INITIALIZATION
    // =========================================================================
    
    $(document).ready(function() {
        // Initial checks
        setTimeout(checkAndRedirect, 100);
        setTimeout(updateSidebarVisibility, 300);
        
        // Listen for route changes
        if (frappe.router && frappe.router.on) {
            frappe.router.on("change", function() {
                setTimeout(checkAndRedirect, 50);
                setTimeout(updateSidebarVisibility, 200);
            });
        }
        
        // Watch for dynamic content changes
        const observer = new MutationObserver(function() {
            updateSidebarVisibility();
        });
        
        const pageContainer = document.querySelector('.page-container');
        if (pageContainer) {
            observer.observe(pageContainer, { childList: true, subtree: true });
        }
    });
})();
