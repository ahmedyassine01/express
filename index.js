const express = require("express");
const path = require("path");
const app = express();

// Middleware to check if the current time is within working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hourOfDay = now.getHours();

  // Check if it's a weekday (Monday to Friday) and if the time is between 9 and 17
  const isWorkingHours = dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17;

  if (isWorkingHours) {
    next(); // Continue with the next middleware or route handler
  } else {
    res.status(503).send('The application is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

// Use the checkWorkingHours middleware for all routes
app.use(checkWorkingHours);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

