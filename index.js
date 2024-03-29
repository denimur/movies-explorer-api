require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const helmet = require("helmet");
const routes = require("./routes");
const errorHandler = require("./utils/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("./middlewares/cors");
const limiter = require("./middlewares/limiter");
const { DB_URL } = require("./utils/constants");

const { MONGO_URL = DB_URL } = process.env;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

app.use(cors);
app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
