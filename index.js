const express = require('express');
const exphbs = require('express-handlebars');
const firebase = require('./firebase');
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");

const app = express();
const PORT = 80 || process.env.PORT;

const mainRouter = require("./routes/main");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");

const csrfMiddleware = csrf({ cookie: true });

// Body-Parser Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(express.static('src'));

app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

// Template Engine Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'mainLayout' }));
app.set('view engine', 'handlebars');

// Routers
app.use("/", mainRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
    res.render("pages/404", { title: '404 Not Found', layout: '404Layout' });
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});