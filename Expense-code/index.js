const express = require('express')
const app = express()

const mongoose = require('mongoose')
const Expense = require('./models/expense')

const cors = require("cors")
const static = express.static("static")
app.use("/",static)

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true})) // form data
app.use(cors())

//mongodb connectivity
mongoose.connect('mongodb://127.0.0.1:27017/Expense').
 then(() => console.log("DB Connected"))
  .catch(() => console.log("Db Connection failed"));


// EXPENSE TRACKER

app.post("/expenses", async (req, res) => {
    try {
        const { name, description, date, amount } = req.body;

        const newExpense = new Expense({
            name,
            description,
            date,
            amount
        });

        await newExpense.save();

        res.status(201).json(newExpense); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save Expenses to database' });
    }
});

app.put('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const {name,description,date,amount} = req.body;

    try {
        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }

        expense.name = name ?  name : expense.name;
        expense.description = description ? description : expense.description;
        await expense.save()
        res.json(expense)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update expense' });
    }
});

app.get("/expenses", async(req,res) => {
    const expenses = await Expense.find({})
    res.json(expenses)
} )

app.get("/expenses/:id",async (req,res) => {
    const {id} = req.params;
    const expense = await Expense.findById(id)
    res.json(expense)
})

app.delete("/expenses/:id", async (req, res) => {
    try {
        const expenseId = req.params.id;

        await Expense.deleteOne({ _id: expenseId });

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete expense from the database' });
    }
});





//wildcard endpoint
app.get("*",(req,res) => {
    res.json({});
})


app.listen(8000, () =>{
    console.log("App Running");
});
