const request = require('supertest');
const app = require('../app'); // Import the app
const mongoose = require('mongoose');
const Account = require('../models/account');

// Before all tests, connect to the database
beforeAll(async () => {
    await mongoose.connect('mongodb+srv://tharukaha88:Tharuka2025@cluster0.rz9xc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// After each test, clear the database
afterEach(async () => {
    await Account.deleteMany({}); // Clear accounts collection
});

// After all tests, disconnect from the database
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Account Endpoints', () => {
    it('should create a new account', async () => {
        const res = await request(app)
            .post('/accounts')
            .send({
                accountNumber: '12345'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('accountNumber', '12345');
        expect(res.body).toHaveProperty('balance', 0);
    });

    it('should get an account by account number', async () => {
        // First create an account
        const createRes = await request(app)
            .post('/accounts')
            .send({
                accountNumber: '12345'
            });

        const res = await request(app)
            .get('/accounts/12345');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accountNumber', '12345');
        expect(res.body).toHaveProperty('balance', 0);
    });

    it('should return 404 if account is not found', async () => {
        const res = await request(app).get('/accounts/nonexistent');
        expect(res.statusCode).toEqual(404);
    });
});

describe('Transfer Endpoints', () => {
    it('should transfer funds successfully', async () => {
        // Create two accounts
        await request(app).post('/accounts').send({ accountNumber: '12345' });
        await request(app).post('/accounts').send({ accountNumber: '67890' });

        // Deposit funds into the source account (modify balance directly for testing)
        let sourceAccount = await Account.findOne({ accountNumber: '12345' });
        sourceAccount.balance = 100;
        await sourceAccount.save();

        const res = await request(app)
            .post('/transfers')
            .send({
                sourceAccountNumber: '12345',
                destinationAccountNumber: '67890',
                amount: 50
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Transfer successful');

        // Check updated balances
        sourceAccount = await Account.findOne({ accountNumber: '12345' });
        const destAccount = await Account.findOne({ accountNumber: '67890' });
        expect(sourceAccount.balance).toEqual(50);
        expect(destAccount.balance).toEqual(50);
    });

    it('should return 400 for insufficient funds', async () => {
        // Create two accounts
        await request(app).post('/accounts').send({ accountNumber: '12345' });
        await request(app).post('/accounts').send({ accountNumber: '67890' });

        const res = await request(app)
            .post('/transfers')
            .send({
                sourceAccountNumber: '12345',
                destinationAccountNumber: '67890',
                amount: 100
            }); // Attempt to transfer 100 from an account with 0 balance
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient funds');
    });
});
