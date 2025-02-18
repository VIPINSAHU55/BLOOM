# Bloom - Personal Finance Management Website

## Overview
Bloom is a personal finance management web application designed to help users track their expenses, set budgets, and achieve financial goals efficiently. With an intuitive dashboard, users can monitor their income, savings, and subscriptions, enabling better financial decisions.

## Features
- **User Authentication**: Secure login and registration system.
- **Dashboard**: Overview of financial health, including balance, budget, and goals.
- **Expense Tracking**: Add, edit, and categorize expenses.
- **Budget Management**: Set monthly budgets and track spending.
- **Goal Setting**: Define financial goals and monitor progress.
- **Subscription Management**: Track recurring expenses and subscription plans.
- **Data Visualization**: Interactive charts and graphs using Recharts.

## Tech Stack
### Frontend
- React.js
- Tailwind CSS
- Recharts (for data visualization)

### Backend
- Node.js
- Express.js
- MongoDB

## Installation
### Prerequisites
- Node.js installed
- MongoDB installed or hosted database

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/bloom.git
   cd bloom
   ```
2. Install dependencies for frontend and backend:
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the backend folder and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     ```
4. Start the backend server:
   ```sh
   cd backend
   npm start
   ```
5. Start the frontend server:
   ```sh
   cd frontend
   npm start
   ```
6. Open `http://localhost:3000` in your browser.

## API Endpoints (Backend)
| Method | Endpoint            | Description                 |
|--------|--------------------|-----------------------------|
| POST   | /api/auth/register | Register a new user        |
| POST   | /api/auth/login    | User login                 |
| GET    | /api/dashboard     | Get user dashboard data    |
| POST   | /api/expenses      | Add a new expense          |
| GET    | /api/goals         | Get user goals             |
| POST   | /api/goals         | Create a financial goal    |

## Future Enhancements
- AI-powered expense insights
- Bank account integration
- Mobile application
- Dark mode UI

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## License
This project is licensed under the ISC License.

## Contact
For any queries, reach out to:
- Email: vipinmunnasahu98@gmail.com
- GitHub: VIPINSAHU55(https://github.com/VIPINSAHU55)

