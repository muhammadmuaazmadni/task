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
var { userModel, productModel, checkoutFormModel } = require("./dbrepo/models");
var authRoutes = require("./routes/auth");

//==========================================================================================
const multer = require("multer");
const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
});
var upload = multer({ storage: storage });

//==========================================================================================

const admin = require("firebase-admin");
// https://firebase.google.com/docs/storage/admin/start
var serviceAccount = {
    "type": "service_account",
    "project_id": "food-shop-3ed1d",
    "private_key_id": "a249b1ba48955239023ae3fbaa3dc3f9b687a49e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC3Rs7QvVUv5NT2\n5Xf62fcaooN3xLNdHT8LVRngEXy4j0nj2lKSw5kSLZaBimi4lybNfNsF5+Q21uKp\ndBRTX1KfKFy75CdfgRZ76g4C8oxgRd6flwus2wDHgXeWTdz/5sH0PUnTHl6Evi0G\nixDfD6q0Vs4Z11xD+zPdbbuP330Bl38tRtEJJJ2wu570z/dbXcr5fOaPC4bspjaI\nfauMwZq/V0xohazzk8CNh6cYIZ9ntVELENovtiCz/5J2nEVocyqzPpn2R+bYUF13\nAqKsClu0Tj3yqWvJigLCrYO+bYhqwHDBBTc/oTm00dUQTm4o8vfU9dau5wBTMF1k\nQ01ciRMnAgMBAAECggEAKgPhhZjh3ojnCXKxfqBZNZHr8Zj2RXJe8Yog1G0t2mF+\n3u094MdWYARzbF7+gtKj4pes3j2645d/frlNr486saHfIHO9UveU3/NYIvTXmXpq\n/srxsj7Cfvn/IEXZVBDihctHEU70/Blc2RMoWvqMd6sutF3amPsNeMWfKexiC+r7\nD6ZMcWgGpB5Dlmds1zxaboHQS1cKBP9utEI2EB9nqjppt0c7OdkW2GubclWZKV4U\nElHyFkPXO2NMUElrbcQ2QeFkaHMwwj+jWZJCSy1pufCy1sJu2JePliJ89RviF+ND\nx+oOXQnTKyCwMwlko05gJZj/abTgUpcsHbrEKj9sAQKBgQDzX5SScXyNKc70TkFc\nnNTQgUrgCEwJR0IK3FHVr/bMWaiTsmbZb+Ap5LnxBWKmqEPvWflI4DyNWZMCNox5\nYaQJe1i+ZjwJZSs2uOBIiSoxfo9ivQf1KP2V/10KgQNVlB9UPMmgQIulVtq2bheX\n/F9GlKqNUW/urORREQHIBtPrYQKBgQDAyQnTUT3fyrnTdzRO+c/VeraLWIxq5u8m\nKDPWo/3tlecWvXcdpswdCl0MiDteLxkXzVfVVAI0w3rhtKZcq8GzyiuLPdroQyfI\nQXJNo4/tj4kz9b7P3LDRZyFBfmxBxNErDE/uHgZPCNbBmmrHPFaQd8FADLGDe13K\niaotvCfThwKBgANrj3HzaFWvhboHM4Hyrkbz2jKFy1PCDZqLeBbxrx02EVlqA2oA\n2XydO0O42KcQ7Et7zzYH+LHf1WINlDHMfnqnohqi4ysaod3WAUjjrJUfezJfB7KZ\nTd8CxLL2Fy7nsv0DEa5P2eaL7uzrZSd8o3Yhdrgfsdv/0AGXpJfECMxhAoGARQc2\n9209hGYoR2mFV0nnev7nYdmg3Z42vyjh9tbdUza7ec75WaqhpzxQuO4Go+ClUXp7\nGq1r5MyhsTNn5gKx5tha4w6Q1V1GX1Pfw6DvJhag//PcEL1qqnAM3lCQHrSEWK+d\n5xrlE2OM0eGinhgivrPChFaHMRb5LE5CmwGmGP0CgYBqxxTnMJGKyDQu0AfbQMKe\nL7lQZ8DeNMADQBBWHpAuDu7KDYG+6xuPBHxi1gWqGK4eD7fs2FfuREhyfHJU1oxX\n1v1pSMXMW05L9gDZiq/FXxV41YuBR7ViAMtxp3TyGM/jB1CC9Gf0hVMaLR2HPpZN\nZLlllzgj+2sn2AJCNEcZPg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-pz002@food-shop-3ed1d.iam.gserviceaccount.com",
    "client_id": "102034392184914014625",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pz002%40food-shop-3ed1d.iam.gserviceaccount.com"
  };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://food-shop-3ed1d-default-rtdb.firebaseio.com",
});
const bucket = admin.storage().bucket("gs://food-shop-3ed1d.appspot.com"); // Firebase bucket Link
//==========================================================================================

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

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
                    role: decodeData.role
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

    userModel.findById(req.body.jToken.id, 'name email phone createdOn role', function (err, doc) {
        if (!err) {
            res.send({
                profile: doc,
                status: 200
            })

        } else {
            res.send({
                message: "Server Error",
                status: 500
            });
        }
    });
});

app.post("/updateproducts", (req, res, next) => {
    if (!req.body.productName || !req.body.productPrice || !req.body.productImage || !req.body.productDescription || !req.body.productQuantity || !req.body.activeStatus) {
        res.status(403).send(`
            please send name, email, passwod and phone in json body.
            e.g:
            {
                "productName": "ABC",
                "productPrice": "100@gmail.com",
                "productImage": "Image URL",
                "productDescription": "This is amaizing",
                "productQuantity": "100",
                "activeStatus": "true or false",
            }`);
        return;
    }
    userModel.findById(req.body.jToken.id, 'email role', function (err, user) {
        if (!err) {
            if (user.role === "admin") {
                var newProduct = new productModel({
                    "productName": req.body.productName,
                    "productPrice": req.body.productPrice,
                    "productImage": req.body.productImage,
                    "productDescription": req.body.productDescription,
                    "productQuantity": req.body.productQuantity,
                    "activeStatus": req.body.activeStatus,
                });
                newProduct.save((err, data) => {
                    // console.log(data);
                    if (!err) {
                        res.send({
                            message: "Product Added",
                            status: 200,
                            data: data
                        });
                    }
                    else {
                        console.log(err);
                        res.send({
                            message: "Product creation error, " + err,
                            status: 500
                        });
                    }
                });
            }
            else {
                res.send({
                    message: "Only Admin Add Products",
                    status: 409
                });
            }
        }
        else {
            res.send({
                message: "Product already exist!",
                status: 409
            });
        }
    })
});

app.post("/upload", upload.any(), (req, res, next) => {  // never use upload.single. see https://github.com/expressjs/multer/issues/799#issuecomment-586526877

    console.log("req.body: ", req.body);
    console.log("req.body: ", JSON.parse(req.body.myDetails));
    console.log("req.files: ", req.files);

    console.log("uploaded file name: ", req.files[0].originalname);
    console.log("file type: ", req.files[0].mimetype);
    console.log("file name in server folders: ", req.files[0].filename);
    console.log("file path in server folders: ", req.files[0].path);

    bucket.upload(
        req.files[0].path,
        function (err, file, apiResponse) {
            if (!err) {
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 
                        // res.send(urlData[0]);
                        res.send({
                            message: "Upload Successfully",
                            status: 200,
                            url: urlData[0]
                        });

                        //------------------------------------
                        // userModel.findOne({ email: req.body.email }, (err, user) => {
                        //     if (!err) {
                        //             res.send({
                        //                 message: "Upload Successfully",
                        //                 status: 200,
                        //                 url: user.profilePic
                        //             });
                        //     }
                        //     else {
                        //         res.send({
                        //             message: "Uploading Error"
                        //         });
                        //     }
                        // })
                        //------------------------------------

                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                            return;
                        } catch (err) {
                            console.error(err)
                        }
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });
});

app.get('/getProducts', (req, res, next) => {
    productModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                data: data
            })
        }
        else {
            res.send(err)
        }
    })
})

app.post("/checkout", (req, res, next) => {
    if (!req.body.name || !req.body.address || !req.body.phoneNumber) {
        res.status(403).send(`
            please send name, adress and phone in json body.
            e.g:
            {
                "name": "ABC",
                "address": "House# xx, Stree# xx, <Location> Near <Area>",
                "phoneNumber": "03xxxxxxxxx",
            }`);
        return;
    }
    userModel.findOne({ email: req.body.jToken.email }, (err, user) => {
        console.log("Checkout Email Get ===> : ", req.body.jToken.email);
        if (!err) {
            checkoutFormModel.create({
                "name": req.body.name,
                "email": user.email,
                "phoneNumber": req.body.phoneNumber,
                "address": req.body.address,
                "status": "Is Review",
                "orders": req.body.orders,
                "totalPrice": req.body.totalPrice
            }).then((data) => {
                res.send({
                    status: 200,
                    message: "Order Done",
                    data: data
                })
            }).catch((err) => {
                res.send({
                    status: 500,
                    message: "Order Err" + err
                })
            })
        }
    })
});

app.get('/myOrder', (req, res, next) => {
    checkoutFormModel.find({ email: req.body.jToken.email }, (err, data) => {
        if (!err) {
            res.send({
                status: 200,
                data: data
            })
        }
        else {
            res.send(err)
        }
    })
});

app.get('/getOrders', (req, res, next) => {
    checkoutFormModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                data: data
            })
        }
        else {
            res.send(err)
        }
    })
});

app.post('/updateStatus', (req, res, next) => {
    checkoutFormModel.findById({ _id: req.body.id }, (err, data) => {
        if (data) {
            data.updateOne({ status: req.body.status }, (err, update) => {
                if (update) {
                    res.send("Order Confirmed")
                }
                else {
                    res.send(err)
                }
            })
        }
        else {
            res.send(err)
        }
    })
})

app.post('/deleteStatus', (req, res, next) => {
    checkoutFormModel.findById({ _id: req.body.id }, (err, data) => {
        if (data) {
            data.updateOne({ status: req.body.status }, (err, update) => {
                if (update) {
                    res.send("Order Cancelled")
                }
                else {
                    res.send(err)
                }
            })
        }
        else {
            res.send(err)
        }
    })
});

app.get('/orderHistory', (req, res, next) => {
    checkoutFormModel.find({ status: {$in: ["Order Cancelled", "Order Confirmed"]} }, (err, data) => {
        if (data) {
            res.send({
                data: data
            })
        }
        else {
            res.send({
                message: "Error : ", err
            })
        }
    })
});

server.listen(PORT, () => {
    console.log("server is running on: ", PORT);
});