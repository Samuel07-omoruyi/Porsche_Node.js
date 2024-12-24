const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

const filePath = path.join(__dirname, 'data', 'submit.txt');

app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    const content = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

    fs.appendFileSync(filePath, content);
    console.log("Form data saved to:", filePath);

    res.send("Thank you! Your message has been received.");
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>Error 404: Resource not found</h1>');
});

app.listen(5000, () => {
    console.log("App listening on port 5000");
});
