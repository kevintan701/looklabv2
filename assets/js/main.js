/**
 * LookLab Main Functionality
 * Handles core features like data loading, AI assistant, inventory connection
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initTrendingSection();
  initDesignerCards();
  initInventorySystem();
  initAIAssistant();
  initSearchFunctionality();
  initNotifications();
  
  // Simulated data for demonstration
  const demoData = {
    user: {
      name: 'Alex Morgan',
      role: 'Boutique Manager',
      avatar: 'assets/images/user-avatar.jpg',
      company: 'Urban Style Co.',
      connections: 89,
      lastLogin: '2023-10-15T14:30:00'
    },
    trends: [
      { name: 'Sustainable Denim', growth: '+28%', category: 'Materials' },
      { name: 'Oversized Silhouettes', growth: '+17%', category: 'Styling' },
      { name: 'Digital Prints', growth: '+22%', category: 'Design' },
      { name: 'Pastel Neutrals', growth: '+15%', category: 'Color' }
    ],
    designers: [
      { id: 1, name: 'Sofia Chen', speciality: 'Sustainable Luxury', location: 'New York', rating: 4.8 },
      { id: 2, name: 'Marcus Reid', speciality: 'Avant-Garde Casual', location: 'London', rating: 4.7 },
      { id: 3, name: 'Aria Nakamura', speciality: 'Tech-Integrated Fashion', location: 'Tokyo', rating: 4.9 },
      { id: 4, name: 'Leo Dubois', speciality: 'Upcycled Vintage', location: 'Paris', rating: 4.6 }
    ],
    inventory: {
      total: 428,
      categories: {
        tops: 142,
        bottoms: 98,
        dresses: 64,
        outerwear: 48,
        accessories: 76
      },
      status: {
        inStock: 312,
        lowStock: 76,
        outOfStock: 40
      }
    }
  };
  
  // Populate UI with demo data where appropriate
  populateUserProfile(demoData.user);
  populateTrendingData(demoData.trends);
  populateDesignerCards(demoData.designers);
  populateInventoryData(demoData.inventory);
  
  /**
   * Initialize the trending section with interactive charts
   */
  function initTrendingSection() {
    console.log('Initializing trending section...');
    // Charts would be initialized here with a library like Chart.js
    // For the prototype, we'll just populate with data
  }
  
  /**
   * Initialize designer cards with interaction
   */
  function initDesignerCards() {
    console.log('Initializing designer cards...');
    
    // Add click event to designer cards
    document.querySelectorAll('.designer-card').forEach(card => {
      card.addEventListener('click', function() {
        const designerId = this.dataset.id;
        viewDesignerProfile(designerId);
      });
    });
  }
  
  /**
   * Initialize inventory connection system
   */
  function initInventorySystem() {
    console.log('Initializing inventory system...');
    
    // Connect button events
    const connectButtons = document.querySelectorAll('.connect-inventory-btn');
    if (connectButtons) {
      connectButtons.forEach(button => {
        button.addEventListener('click', function() {
          const platform = this.dataset.platform;
          connectInventoryPlatform(platform);
        });
      });
    }
  }
  
  /**
   * Initialize AI assistant functionality
   */
  function initAIAssistant() {
    console.log('Initializing AI assistant...');
    
    const aiChatForm = document.getElementById('ai-chat-form');
    const aiInput = document.getElementById('ai-input');
    const aiChatHistory = document.getElementById('ai-chat-history');
    
    if (aiChatForm && aiInput && aiChatHistory) {
      aiChatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userMessage = aiInput.value.trim();
        if (userMessage) {
          // Add user message to chat
          addMessageToChat('user', userMessage);
          aiInput.value = '';
          
          // Simulate AI response (would be API call in production)
          setTimeout(() => {
            const aiResponse = getAIResponse(userMessage);
            addMessageToChat('ai', aiResponse);
          }, 1000);
        }
      });
    }
  }
  
  /**
   * Initialize search functionality across the platform
   */
  function initSearchFunctionality() {
    console.log('Initializing search functionality...');
    
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        if (searchTerm.length > 2) {
          // Perform search (would be API call in production)
          performSearch(searchTerm);
        }
      });
    }
  }
  
  /**
   * Initialize notification system
   */
  function initNotifications() {
    console.log('Initializing notifications...');
    
    // Check for notifications every 30 seconds
    setInterval(checkForNotifications, 30000);
    
    const notificationBell = document.getElementById('notification-bell');
    if (notificationBell) {
      notificationBell.addEventListener('click', function() {
        toggleNotificationPanel();
      });
    }
  }
  
  // Helper functions for populating UI with data
  
  function populateUserProfile(userData) {
    const userNameElements = document.querySelectorAll('.user-name');
    const userRoleElements = document.querySelectorAll('.user-role');
    const userAvatarElements = document.querySelectorAll('.user-avatar');
    
    userNameElements.forEach(el => {
      el.textContent = userData.name;
    });
    
    userRoleElements.forEach(el => {
      el.textContent = userData.role;
    });
    
    userAvatarElements.forEach(el => {
      el.src = userData.avatar;
      el.alt = userData.name;
    });
  }
  
  function populateTrendingData(trendsData) {
    const trendingList = document.getElementById('trending-list');
    if (trendingList) {
      trendingList.innerHTML = '';
      
      trendsData.forEach(trend => {
        const trendItem = document.createElement('div');
        trendItem.className = 'trend-item apple-card p-4 mb-3';
        trendItem.innerHTML = `
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold">${trend.name}</h3>
              <span class="text-sm text-gray-600">${trend.category}</span>
            </div>
            <div class="trend-growth text-success-color font-medium">${trend.growth}</div>
          </div>
        `;
        trendingList.appendChild(trendItem);
      });
    }
  }
  
  function populateDesignerCards(designersData) {
    const designerGrid = document.getElementById('designer-grid');
    if (designerGrid) {
      designerGrid.innerHTML = '';
      
      designersData.forEach(designer => {
        const designerCard = document.createElement('div');
        designerCard.className = 'designer-card apple-card p-0 overflow-hidden';
        designerCard.dataset.id = designer.id;
        designerCard.innerHTML = `
          <div class="designer-img-container h-48 bg-gray-100">
            <img src="assets/images/designers/designer-${designer.id}.jpg" alt="${designer.name}" class="w-full h-full object-cover">
          </div>
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-1">${designer.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${designer.speciality}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm">${designer.location}</span>
              <div class="rating">
                <span class="text-amber-500">★</span>
                <span class="font-medium">${designer.rating}</span>
              </div>
            </div>
          </div>
        `;
        designerGrid.appendChild(designerCard);
      });
    }
  }
  
  function populateInventoryData(inventoryData) {
    const inventorySummary = document.getElementById('inventory-summary');
    if (inventorySummary) {
      inventorySummary.innerHTML = `
        <div class="text-center p-4">
          <h2 class="text-3xl font-bold mb-2">${inventoryData.total}</h2>
          <p class="text-gray-600">Total Items in Inventory</p>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <div class="text-center">
            <span class="text-xl font-semibold inventory-status-in-stock">${inventoryData.status.inStock}</span>
            <p class="text-sm">In Stock</p>
          </div>
          <div class="text-center">
            <span class="text-xl font-semibold inventory-status-low">${inventoryData.status.lowStock}</span>
            <p class="text-sm">Low Stock</p>
          </div>
          <div class="text-center">
            <span class="text-xl font-semibold inventory-status-out">${inventoryData.status.outOfStock}</span>
            <p class="text-sm">Out of Stock</p>
          </div>
        </div>
      `;
    }
    
    // For category breakdown
    const categoryBreakdown = document.getElementById('category-breakdown');
    if (categoryBreakdown) {
      categoryBreakdown.innerHTML = '';
      
      for (const [category, count] of Object.entries(inventoryData.categories)) {
        const percentage = Math.round((count / inventoryData.total) * 100);
        
        const categoryItem = document.createElement('div');
        categoryItem.className = 'mb-3';
        categoryItem.innerHTML = `
          <div class="flex justify-between mb-1">
            <span class="capitalize">${category}</span>
            <span>${count} items (${percentage}%)</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-blue-600 h-2 rounded-full" style="width: ${percentage}%"></div>
          </div>
        `;
        
        categoryBreakdown.appendChild(categoryItem);
      }
    }
  }
  
  // Additional helper functions
  
  function viewDesignerProfile(designerId) {
    console.log(`Viewing designer profile: ${designerId}`);
    // Would redirect to designer profile page
    // For prototype, we can show a modal or navigate to the designer page
    window.location.href = `#designer-profile?id=${designerId}`;
  }
  
  function connectInventoryPlatform(platform) {
    console.log(`Connecting to ${platform} inventory...`);
    // Show connection modal or process
    const connectionModal = document.getElementById('inventory-connection-modal');
    if (connectionModal) {
      connectionModal.style.display = 'block';
      
      // Simulate connection process
      setTimeout(() => {
        // Update connection status in modal
        const statusElement = connectionModal.querySelector('.connection-status');
        if (statusElement) {
          statusElement.textContent = 'Connected Successfully!';
          statusElement.className = 'connection-status text-success-color';
        }
        
        // Close modal after delay
        setTimeout(() => {
          connectionModal.style.display = 'none';
        }, 2000);
      }, 3000);
    }
  }
  
  function addMessageToChat(sender, message) {
    const chatHistory = document.getElementById('ai-chat-history');
    if (chatHistory) {
      const messageElement = document.createElement('div');
      messageElement.className = sender === 'user' ? 'user-message' : 'ai-message';
      messageElement.innerHTML = `<p>${message}</p>`;
      chatHistory.appendChild(messageElement);
      
      // Scroll to bottom
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }
  
  function getAIResponse(userMessage) {
    // Simulate AI response - in production this would call an API
    const responses = [
      "Based on current market data, sustainable materials are trending upward by 22% this quarter.",
      "I've analyzed your inventory and noticed you're low on summer dresses. Would you like me to suggest some trending options?",
      "The color palettes trending for next season include earth tones and bright accent colors. Would you like more specific information?",
      "I found 5 designers specializing in sustainable fashion that would align with your store's aesthetic.",
      "Your best-selling items this month are in the 'casual wear' category, with a 15% higher margin than other categories."
    ];
    
    // Simple logic to match user message to a response
    if (userMessage.toLowerCase().includes('trend')) {
      return responses[0];
    } else if (userMessage.toLowerCase().includes('inventory')) {
      return responses[1];
    } else if (userMessage.toLowerCase().includes('color')) {
      return responses[2];
    } else if (userMessage.toLowerCase().includes('designer')) {
      return responses[3];
    } else if (userMessage.toLowerCase().includes('sales')) {
      return responses[4];
    } else {
      return "I'm your fashion trend AI assistant. I can help you analyze trends, manage inventory, connect with designers, and more. What would you like to know?";
    }
  }
  
  function performSearch(searchTerm) {
    console.log(`Searching for: ${searchTerm}`);
    // Would perform API search and display results
    
    // Show search results container
    const searchResultsContainer = document.getElementById('search-results');
    if (searchResultsContainer) {
      searchResultsContainer.style.display = 'block';
      
      // Simulate results loading
      searchResultsContainer.innerHTML = '<p class="text-center py-4">Searching...</p>';
      
      setTimeout(() => {
        // Simple search simulation
        const results = demoData.designers.filter(designer => 
          designer.name.toLowerCase().includes(searchTerm) || 
          designer.speciality.toLowerCase().includes(searchTerm)
        );
        
        if (results.length > 0) {
          searchResultsContainer.innerHTML = `
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-3">Search Results (${results.length})</h3>
              <div class="search-results-list">
                ${results.map(designer => `
                  <div class="result-item p-3 mb-2 border-b">
                    <h4 class="font-medium">${designer.name}</h4>
                    <p class="text-sm text-gray-600">${designer.speciality}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        } else {
          searchResultsContainer.innerHTML = `
            <div class="p-4 text-center">
              <p>No results found for "${searchTerm}"</p>
            </div>
          `;
        }
      }, 1000);
    }
  }
  
  function checkForNotifications() {
    // Would check API for new notifications
    console.log('Checking for notifications...');
    
    // Simulate new notification
    const hasNewNotification = Math.random() > 0.7;
    
    if (hasNewNotification) {
      const notificationBell = document.getElementById('notification-bell');
      const notificationCount = document.getElementById('notification-count');
      
      if (notificationBell && notificationCount) {
        // Update notification count
        let currentCount = parseInt(notificationCount.textContent || '0');
        currentCount += 1;
        notificationCount.textContent = currentCount;
        notificationCount.style.display = 'block';
        
        // Add animation
        notificationBell.classList.add('notification-bell-ring');
        setTimeout(() => {
          notificationBell.classList.remove('notification-bell-ring');
        }, 1000);
      }
    }
  }
  
  function toggleNotificationPanel() {
    const panel = document.getElementById('notification-panel');
    if (panel) {
      panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
      
      // Reset notification count when opened
      if (panel.style.display === 'block') {
        const notificationCount = document.getElementById('notification-count');
        if (notificationCount) {
          notificationCount.textContent = '0';
          notificationCount.style.display = 'none';
        }
      }
    }
  }
});
