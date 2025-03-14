/**
 * LookLab Navigation System
 * Handles sidebar toggling, mobile navigation, and page navigation for both
 * legacy hash-based navigation and direct page links
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Supporting both old and new navigation structures
  const sidebar = document.getElementById('sidebar') || document.querySelector('.w-56.bg-white');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mainContent = document.getElementById('main-content') || document.querySelector('.flex-1.flex.flex-col');
  const navLinks = document.querySelectorAll('.nav-link, nav a');
  const subMenuToggles = document.querySelectorAll('.submenu-toggle, .w-full.flex.items-center.justify-between');
  
  // Check if mobile toggle exists, if not create it
  let mobileToggle = document.getElementById('mobile-menu-toggle');
  if (!mobileToggle && sidebar) {
    // Create mobile toggle button
    mobileToggle = document.createElement('button');
    mobileToggle.id = 'mobile-menu-toggle';
    mobileToggle.className = 'md:hidden flex items-center text-gray-600 hover:text-gray-900 focus:outline-none';
    mobileToggle.setAttribute('title', 'Toggle menu');
    mobileToggle.innerHTML = '<i class="fas fa-bars text-lg"></i>';
    
    // Find the right place to insert it (in the header, before the search)
    const header = document.querySelector('header .flex.items-center.justify-between');
    if (header) {
      const searchBar = header.querySelector('.relative.w-96');
      if (searchBar) {
        header.insertBefore(mobileToggle, searchBar);
        
        // Adjust search bar width for mobile
        searchBar.classList.remove('w-96');
        searchBar.classList.add('w-auto', 'flex-1', 'mx-4');
      }
    }
  }
  
  // Initialize sidebar state
  initializeSidebar();
  
  // Highlight active page
  highlightActivePage();
  
  // Setup submenu toggles
  setupSubmenuToggles();
  
  // Setup Discover button functionality - special handling for this button
  setupDiscoverButton();
  
  // Setup mobile navigation if needed
  setupMobileToggle();
  
  // Legacy sidebar toggle function
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      toggleSidebar();
    });
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    handleResponsiveLayout();
  });
  
  // Immediately handle responsive layout on load
  handleResponsiveLayout();
  
  // Legacy page navigation for hash-based navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Only handle hash links with this function
      if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const pageId = link.getAttribute('href').substring(1);
        loadPage(pageId);
        
        // Remove active class from all links
        navLinks.forEach(item => {
          item.classList.remove('active');
          item.classList.remove('text-accent');
          item.classList.remove('font-medium');
        });
        
        // Add active class to clicked link
        link.classList.add('active');
        link.classList.add('text-accent');
        link.classList.add('font-medium');
        
        // If on mobile, auto-collapse sidebar after selection
        if (window.innerWidth < 768 && sidebar && !sidebar.classList.contains('hidden')) {
          if (mobileToggle) mobileToggle.click();
        }
      }
    });
  });
  
  // Handle browser back/forward buttons for hash navigation
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    } else if (window.location.hash) {
      // Load page based on hash
      loadPage(window.location.hash.substring(1));
    } else {
      // Default to home page if no state or hash
      loadPage('home');
    }
  });
  
  // Check if we need to load a page based on hash
  if (window.location.hash) {
    const initialPage = window.location.hash.substring(1);
    loadPage(initialPage);
  }
});

/**
 * Setup the sidebar initial state
 */
function initializeSidebar() {
  // Initialize the sidebar state based on user preference or default
  const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  const sidebar = document.getElementById('sidebar') || document.querySelector('.w-56.bg-white');
  
  if (sidebar) {
    if (sidebarCollapsed) {
      collapseSidebar(sidebar);
    } else {
      expandSidebar(sidebar);
    }
    
    // On mobile, always start with sidebar hidden
    if (window.innerWidth < 768) {
      sidebar.classList.add('hidden');
      sidebar.classList.add('md:flex');
    }
  }
}

/**
 * Handle responsive layout changes
 */
function handleResponsiveLayout() {
  const sidebar = document.getElementById('sidebar') || document.querySelector('.w-56.bg-white');
  const mainContent = document.getElementById('main-content') || document.querySelector('.flex-1.flex.flex-col');
  
  if (!sidebar) return;
  
  if (window.innerWidth < 768) {
    // Mobile layout
    sidebar.classList.add('fixed', 'z-20', 'inset-y-0', 'left-0');
    sidebar.classList.remove('relative');
    
    // Hide sidebar on mobile by default
    if (!localStorage.getItem('sidebarMobileVisible') === 'true') {
      sidebar.classList.add('hidden');
    }
    
    // Add overlay for mobile sidebar
    let overlay = document.getElementById('sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'sidebar-overlay';
      overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-10 hidden';
      overlay.addEventListener('click', () => {
        toggleMobileSidebar();
      });
      document.body.appendChild(overlay);
    }
    
    // On collapsing, make it minimal width on mobile instead of full hidden
    if (sidebar.classList.contains('sidebar-collapsed')) {
      sidebar.style.width = '60px';
    } else {
      sidebar.style.width = '240px';
    }
  } else {
    // Desktop layout
    sidebar.classList.remove('fixed', 'z-20', 'inset-y-0', 'left-0', 'hidden', 'md:flex');
    sidebar.classList.add('relative');
    
    // Remove overlay
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) overlay.classList.add('hidden');
    
    // Apply collapsed state if saved
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
      collapseSidebar(sidebar);
    } else {
      expandSidebar(sidebar);
    }
  }
}

/**
 * Toggle the sidebar expanded/collapsed state
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar') || document.querySelector('.w-56.bg-white');
  const mainContent = document.getElementById('main-content') || document.querySelector('.flex-1.flex.flex-col');
  
  if (!sidebar) return;
  
  const isExpanded = sidebar.classList.contains('sidebar-expanded');
  
  if (isExpanded) {
    collapseSidebar(sidebar);
  } else {
    expandSidebar(sidebar);
  }
  
  // Store state in localStorage
  localStorage.setItem('sidebarCollapsed', isExpanded);
}

/**
 * Collapse the sidebar
 */
function collapseSidebar(sidebar) {
  const mainContent = document.getElementById('main-content') || document.querySelector('.flex-1.flex.flex-col');
  
  sidebar.classList.remove('sidebar-expanded', 'w-56');
  sidebar.classList.add('sidebar-collapsed', 'w-16');
  
  if (mainContent) mainContent.classList.add('content-expanded');
  
  // Hide text in sidebar items
  sidebar.querySelectorAll('.ml-3').forEach(item => {
    item.style.display = 'none';
  });
  
  // Hide text in user profile
  const userInfo = sidebar.querySelector('.flex.items-center.px-6.py-3.border-b.border-gray-200 .ml-3');
  if (userInfo) userInfo.style.display = 'none';
  
  // Hide all submenus
  sidebar.querySelectorAll('.pl-14').forEach(submenu => {
    submenu.classList.add('hidden');
  });
  
  // Hide notification badges and chevrons
  sidebar.querySelectorAll('.fa-chevron-down, .bg-red-500.text-white.text-xs.px-1\\.5.py-0\\.5.rounded-full').forEach(item => {
    item.style.display = 'none';
  });
}

/**
 * Expand the sidebar
 */
function expandSidebar(sidebar) {
  const mainContent = document.getElementById('main-content') || document.querySelector('.flex-1.flex.flex-col');
  
  sidebar.classList.remove('sidebar-collapsed', 'w-16');
  sidebar.classList.add('sidebar-expanded', 'w-56');
  
  if (mainContent) mainContent.classList.remove('content-expanded');
  
  // Show text in sidebar items
  sidebar.querySelectorAll('.ml-3').forEach(item => {
    item.style.display = 'block';
  });
  
  // Show text in user profile
  const userInfo = sidebar.querySelector('.flex.items-center.px-6.py-3.border-b.border-gray-200 .ml-3');
  if (userInfo) userInfo.style.display = 'block';
  
  // Show notification badges and chevrons
  sidebar.querySelectorAll('.fa-chevron-down, .bg-red-500.text-white.text-xs.px-1\\.5.py-0\\.5.rounded-full').forEach(item => {
    item.style.display = 'inline-flex';
  });
}

/**
 * Toggle mobile sidebar visibility
 */
function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar') || document.querySelector('.w-56.bg-white');
  const overlay = document.getElementById('sidebar-overlay');
  
  if (!sidebar) return;
  
  sidebar.classList.toggle('hidden');
  
  if (overlay) {
    overlay.classList.toggle('hidden');
  }
  
  // Store state
  localStorage.setItem('sidebarMobileVisible', !sidebar.classList.contains('hidden'));
}

/**
 * Highlight the active page in the navigation
 */
function highlightActivePage() {
  // Get current page path
  const currentPath = window.location.pathname;
  
  // Check if we're using hash navigation
  if (window.location.hash && document.querySelectorAll('.page-content').length > 0) {
    const currentHash = window.location.hash.substring(1);
    
    // Find all navigation links with hash references
    const hashLinks = document.querySelectorAll('[href^="#"]');
    
    hashLinks.forEach(link => {
      const linkHash = link.getAttribute('href').substring(1);
      
      if (linkHash === currentHash) {
        link.classList.add('active', 'text-accent', 'font-medium');
      }
    });
    
    return;
  }
  
  // Find all navigation links for direct page navigation
  const navLinks = document.querySelectorAll('nav a');
  
  // Loop through links and add active class to the current page
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Check if the link matches the current page
    if (linkPath && currentPath.includes(linkPath)) {
      // Add active class styling
      link.classList.add('text-accent', 'font-medium');
      link.classList.remove('text-gray-600');
      
      // If the link is in a submenu, expand the submenu
      const parentSubmenu = link.closest('.pl-14');
      if (parentSubmenu) {
        parentSubmenu.classList.remove('hidden');
        
        // Also highlight the parent button
        const parentButton = parentSubmenu.previousElementSibling;
        if (parentButton && parentButton.tagName === 'BUTTON') {
          parentButton.classList.add('text-accent', 'font-medium');
          parentButton.classList.remove('text-gray-600');
        }
      }
    }
  });
}

/**
 * Setup submenu toggle functionality
 */
function setupSubmenuToggles() {
  // Find all submenu toggle buttons - supporting both old and new navigation styles
  const submenuToggles = document.querySelectorAll('.submenu-toggle, .w-full.flex.items-center.justify-between');
  
  // Add click event to each toggle button
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Prevent default for actual links
      if (this.tagName === 'A') {
        e.preventDefault();
      }
      
      // Find the submenu - support both old and new navigation structures
      let submenu;
      
      if (this.classList.contains('submenu-toggle')) {
        // Old navigation structure
        const parent = this.closest('.nav-item');
        submenu = parent ? parent.querySelector('.submenu') : null;
        
        if (submenu) {
          // Toggle display
          if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
            this.classList.remove('active');
          } else {
            submenu.style.display = 'block';
            this.classList.add('active');
          }
        }
      } else {
        // New navigation structure
        submenu = this.nextElementSibling;
        
        if (submenu) {
          // Toggle hidden class
          submenu.classList.toggle('hidden');
          
          // Rotate the chevron icon
          const chevron = this.querySelector('.fa-chevron-down');
          if (chevron) {
            chevron.classList.toggle('transform');
            chevron.classList.toggle('rotate-180');
          }
        }
      }
    });
  });
}

/**
 * Setup mobile navigation toggle
 */
function setupMobileToggle() {
  // Find the mobile menu toggle button if it exists
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      toggleMobileSidebar();
    });
  }
}

/**
 * Function to load page content for hash-based navigation
 */
function loadPage(pageId) {
  // Check if we're using hash-based navigation
  const pageContents = document.querySelectorAll('.page-content');
  
  if (pageContents.length === 0) {
    // We're using direct page navigation - do nothing
    return;
  }
  
  // Hide all page content
  pageContents.forEach(page => {
    page.style.display = 'none';
  });
  
  // Show selected page
  const selectedPage = document.getElementById(`${pageId}-page`);
  if (selectedPage) {
    selectedPage.style.display = 'block';
    // Update page title
    document.title = `LookLab - ${pageId.charAt(0).toUpperCase() + pageId.slice(1)}`;
    // Add animation
    selectedPage.classList.add('fade-in');
  }
  
  // Update URL without page reload
  window.history.pushState({page: pageId}, '', `#${pageId}`);
}

/**
 * Setup the Discover button to navigate to discover.html and auto-expand submenu
 */
function setupDiscoverButton() {
  // Find all Discover section buttons
  const discoverButtons = document.querySelectorAll('.w-full.flex.items-center.justify-between');
  
  discoverButtons.forEach(button => {
    // Check if this is the Discover section button
    const buttonText = button.querySelector('.ml-3');
    if (buttonText && buttonText.textContent.trim() === 'Discover') {
      // Convert button to a clickable element that both toggles menu and navigates
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the submenu
        const submenu = this.nextElementSibling;
        
        // If submenu exists, show it (remove hidden class)
        if (submenu && submenu.classList.contains('hidden')) {
          submenu.classList.remove('hidden');
          
          // Rotate the chevron icon
          const chevron = this.querySelector('.fa-chevron-down');
          if (chevron) {
            chevron.classList.add('transform', 'rotate-180');
          }
        }
        
        // Get the current location to determine if we need to navigate
        const currentPath = window.location.pathname;
        const isOnDiscoverPage = currentPath.endsWith('discover.html');
        
        // Navigate to discover.html if not already there
        if (!isOnDiscoverPage) {
          // Determine the correct path (could be in pages/ directory or at root)
          let discoverPath = '';
          if (currentPath.includes('/pages/')) {
            discoverPath = 'discover.html';
          } else {
            discoverPath = 'pages/discover.html';
          }
          window.location.href = discoverPath;
        }
      });
    }
  });
}
