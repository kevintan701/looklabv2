# LookLab - Fashion Industry Connection Platform

LookLab is a web platform designed to connect small and medium-sized fashion industry distributors and designers in the clothing trend sector.

## Project Overview

LookLab facilitates seamless connections between retailers and designers in the fashion industry by providing:

- Real-time inventory management through Shopify/Square integration
- Designer discovery and collection browsing
- Industry trend analysis and insights
- Direct messaging and collaboration tools
- AI-powered recommendations and trend forecasting

## Features

### For Retailers
- Connect Shopify or Square platforms to view real-time in-store inventory
- Browse designer collections and products
- Discover new designers and trends
- Manage contacts and negotiations with designers

### For Designers
- Showcase collections and products
- Build a professional profile
- Connect with retailers
- Analyze market trends and preferences

### Shared Features
- Direct messaging system
- AI assistant for trend analysis
- User account management
- Dashboard with personalized insights

## Technology Stack

- Frontend: HTML5, CSS3 (Tailwind CSS), JavaScript
- UI Components: FontAwesome icons
- Design Principles: Apple Design Guidelines
- Future Backend: Node.js with Express (planned)
- Database: MongoDB (planned)

## Project Structure

```
LookLab/
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
├── components/
├── pages/
│   ├── discover.html
│   ├── designers.html
│   ├── products.html
│   ├── trending.html
│   ├── inventory.html
│   ├── profile.html
│   ├── messages.html
│   ├── aiassistant.html
│   ├── settings.html
│   └── details/
├── backend/
└── index.html (main dashboard)
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic knowledge of HTML, CSS, and JavaScript (if you want to modify the code)

### Running the Application

1. Clone the repository or download the source code:
```bash
git clone https://github.com/kevintan701/looklabv2.git
cd looklabv2
```

2. Open `index.html` in your web browser to access the main dashboard.

3. To view specific pages directly, navigate to the `/pages` directory and open the corresponding HTML file.

### Testing the Features

#### Dashboard
- The main `index.html` file serves as the dashboard.
- Test the navigation by clicking on different sidebar menu items.
- Try collapsing and expanding the sidebar using the toggle button.

#### Designer Discovery
- Navigate to the "Designers" page to browse and filter designers.
- Click on a designer card to view their detailed profile.
- Test the search and filter functionality.
- Try the "Connect" buttons to simulate connecting with designers.

#### Product Browsing
- Visit the "Products" page to browse available fashion items.
- Use filters to narrow down products by category, style, or season.
- Click on product cards to view detailed information.

#### Trending Analysis
- Explore the "Trending" page to see current fashion trends.
- View popularity charts and trending categories.
- Get insights into upcoming seasonal trends.

#### Inventory Management
- Navigate to the "Inventory" page to see the inventory management interface.
- Test the "Connect Shopify" or "Connect Square" buttons to simulate integration.
- Explore the inventory table, filtering, and sorting options.

#### AI Assistant
- Navigate to the "AI Assistant" page to test the AI chat interface.
- Type a message in the chat input and press enter to simulate getting AI responses.
- Try asking about trends, inventory, or designers to see the simulated responses.

## UI/UX Design

The design follows Apple's design guidelines with a focus on clarity, deference, and depth:

- Clean, minimalist interface with a focus on content
- Consistent use of white space and typography
- Card-based UI elements with subtle shadows and rounded corners
- Responsive design that works on various screen sizes
- Clear visual hierarchy and navigation

## Future Enhancements

1. **Backend Implementation**
   - Develop a Node.js backend with Express
   - Implement a MongoDB database for storing user, designer, and product data

2. **Authentication System**
   - User registration and login functionality
   - Role-based access control for retailers and designers

3. **Real API Integrations**
   - Live integration with Shopify and Square APIs
   - Real data fetching and synchronization

4. **AI Features Enhancement**
   - Implement actual AI/ML models for trend analysis
   - Develop personalized recommendation algorithms

## Development Status

This project is currently in the prototype phase (Version 2). The current version focuses on the frontend UI/UX to demonstrate the concept and user flow. We're continuously improving the design and functionality based on user feedback.

## License

[MIT License](LICENSE)

## Contact

For questions or inquiries about LookLab, please reach out to the project maintainers. 