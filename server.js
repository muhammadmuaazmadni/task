const PORT = process.env.PORT || 5000;

var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var path = require('path');
var http = require('http');

var { SERVER_SECRET } = require("./core/app");
var { userModel } = require("./dbrepo/models");
var authRoutes = require("./routes/auth");

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(morgan('dev'));

app.use("/", express.static(path.resolve(path.join(__dirname, "frontend/build"))));
app.use("/auth", authRoutes);

app.use(function (req, res, next) {
    console.log("req.cookies: ", req.cookies);
    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodeData) {
        if (!err) {

            const issueDate = decodeData.iat * 1000;
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate; //86400,000

            if (diff > 300000) {//// expire after 5 min (in milis)
                res.send({
                    message: "Token Expired",
                    status: 401
                })
            }
            else { //issue new token
                var token = jwt.sign({
                    id: decodeData.id,
                    name: decodeData.name,
                    email: decodeData.email,
                    phone: decodeData.phone,
                }, SERVER_SECRET)
                res.cookie('jToken', token, {
                    maxAge: 86_400_000,
                    httpOnly: true
                });
                req.body.jToken = decodeData
                next();
            }
        }
        else {
            res.send({
                message: "Invalid token",
                status: 401
            })
        }
    });
});

app.get("/profile", (req, res, next) => {
    console.log(req.body);

    userModel.findById(req.body.jToken.id, 'name email phone createdOn',
        function (err, doc) {
            if (!err) {
                res.send({
                    profile: doc
                });
            }
            else {
                res.send({
                    message: "Server error",
                    status: 500
                });
            }
        });
});

server.listen(PORT, () => {
    console.log("server is running on: ", PORT);
});