const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const staffRoutes = require('./routes/staffRoutes');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app = express();

// Middleware
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Please ensure you have a MongoDB database set up. Follow the instructions at [link to setup guide].');
});

//setup swagger for API documentation
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Staff Management API',
            version: '1.0.0',
            description: 'API documentation for managing staff records',
        },
      servers: [{ url: "http://localhost:5000" }],
    },
    apis: ["./routes/*.js"],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/staff', staffRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
