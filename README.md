
- **💰 Account Transfer API**: A sleek and simple RESTful API to manage secure fund transfers between accounts using in-memory storage. No external database needed—just pure functionality.
  
- **✨ Key Features**:
  - **Transfer Funds**: Seamlessly move funds between accounts.
  - **In-Memory Storage**: Forget about complex databases; everything runs in-memory.
  - **Robust Error Handling**: Deals with invalid accounts and insufficient funds gracefully.
  - **Minimal & Efficient**: Lightweight design focused on essential features.
  
- **🛠️ Technologies**:
  - Built using **Python (Flask)** or **Node.js (Express)**.
  - Utilizes in-memory storage (think dictionaries/objects).
  
- **⚡ Quick Setup**:
  1. Clone the repository:  
     `git clone https://github.com/yourusername/account-transfer-api.git`
  2. Navigate into the project:  
     `cd account-transfer-api`
  3. Install dependencies:  
     `npm install`
  4. Start the server:  
     `node server.js`
  5. Run tests to ensure everything is working:  
     `npm test`

- **🔑 API Endpoints**:
  - **POST /transfer**: Handle all your transfer needs by posting the source and destination accounts with the amount.
  - **Request Body**: JSON with the `source_account`, `destination_account`, and `amount`.
  - **Response**:  
    - ✅ `200 OK`: Transfer successful!  
    - ❌ `400 Bad Request`: Insufficient funds or invalid accounts.
    
- **👨‍💻 Maintained by**:👨‍💻 Maintained by: Hashini Tharuka)

