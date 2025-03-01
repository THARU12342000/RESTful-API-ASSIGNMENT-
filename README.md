
# 💰 Account Transfer API

A sleek and simple RESTful API to manage secure fund transfers between accounts using a **MERN Stack** (MongoDB, Express, React, Node.js). It handles account creation, balance retrieval, and fund transfers with robust error handling.

## ✨ Key Features:
- **Account Management**: Create accounts, retrieve balance, and manage account details.
- **Transfer Funds**: Seamlessly move funds between accounts.
- **MongoDB Database**: Utilizes MongoDB to store account data.
- **Robust Error Handling**: Deals with invalid accounts and insufficient funds gracefully.
- **Efficient Design**: Lightweight backend focused on essential features.

## 🛠️ Technologies:
- **Backend**: Node.js with Express
- **Database**: MongoDB (via Mongoose)
- **Testing**: Jest and Supertest for API testing

## ⚡ Quick Setup:
1. Clone the repository:  
   `git clone https://github.com/yourusername/account-transfer-api.git`
   
2. Navigate into the project directory:  
   `cd bank-api-mern`
   
3. Install backend dependencies:  
   `npm install`
   
4. Start the server:  
   `node server.js`
   
5. Run tests to ensure everything is working:  
   `npm test`

## 🔑 API Endpoints:
- **POST /accounts**: Create a new account.
  - **Request Body**: JSON with `accountNumber`.
  - **Response**:  
    - ✅ `201 Created`: Account created successfully.
    - ❌ `400 Bad Request`: Invalid account data.

- **GET /accounts/:accountNumber**: Retrieve account details by account number.
  - **Response**:  
    - ✅ `200 OK`: Returns account details.
    - ❌ `404 Not Found`: Account not found.

- **POST /transfers**: Transfer funds between accounts.
  - **Request Body**: JSON with `sourceAccountNumber`, `destinationAccountNumber`, and `amount`.
  - **Response**:  
    - ✅ `200 OK`: Transfer successful!
    - ❌ `400 Bad Request`: Insufficient funds or invalid accounts.

## 👨‍💻 Maintained by:
**Hashini Tharuka**  
Email: tharukah8888@gmail.com
