const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Account = require('./models/account');
const Transaction = require('./models/transaction');

const app = express();
const port = process.env.PORT || 5000;

const mongoURI = 'mongodb+srv://tharukaha88:Tharuka2025@cluster0.rz9xc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if connection fails
    });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/accounts', async (req, res) => {
    try {
        const { accountNumber } = req.body;
        const account = new Account({ accountNumber });
        const newAccount = await account.save();
        res.status(201).json(newAccount);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

app.get('/accounts/:accountNumber', async (req, res) => {
    try {
        const account = await Account.findOne({ accountNumber: req.params.accountNumber });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json(account);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/transfers', async (req, res) => {
    try {
        const { sourceAccountNumber, destinationAccountNumber, amount } = req.body;

        if (!sourceAccountNumber || !destinationAccountNumber || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be positive' });
        }

        const sourceAccount = await Account.findOne({ accountNumber: sourceAccountNumber });
        const destinationAccount = await Account.findOne({ accountNumber: destinationAccountNumber });

        if (!sourceAccount) {
            return res.status(400).json({ message: 'Source account not found' });
        }

        if (!destinationAccount) {
            return res.status(400).json({ message: 'Destination account not found' });
        }

        if (sourceAccount.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Perform the transfer
        sourceAccount.balance -= amount;
        destinationAccount.balance += amount;

        await sourceAccount.save();
        await destinationAccount.save();

        const transaction = new Transaction({
            sourceAccountNumber,
            destinationAccountNumber,
            amount,
        });

        const newTransaction = await transaction.save();

        res.json({ message: 'Transfer successful', transaction: newTransaction });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = app; // Export the app
