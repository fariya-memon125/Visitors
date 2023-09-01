const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const signIn = require('./modal/signinSchema')
const dataposting = require('./modal/datapostingschema')
const bycrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const QRCode = require('qrcode')
const { ensureToken, adminAuth, captcha } = require('./permissionMiddleWare/permission')
require('dotenv').config()
app.use(cors())
app.use(bodyParser.json())
const sendgridTransporter = require('nodemailer-sendgrid-transport')
const nodemailer = require('nodemailer')
const signinSchema = require('./modal/signinSchema')
const multer = require('multer')
const { default: Axios } = require('axios')
const transporter = nodemailer.createTransport(sendgridTransporter({
    auth: {
        api_key: process.env.API_KEY
    }
}))

app.use(express.static(__dirname + '/images'))

app.post('/projects-image', (req, res, next) => {
    upload(req, res, async function (err) {
        if (req.files[0] === undefined) {
            return (
                res.send(false)
            )
        }
        res.send({ imgSrc: req.files[0].filename })
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(300).json(err)
        }
        return res.status(200).send(req.file)
    })
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    }, filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
let upload = multer({ storage: storage }).array('file')

app.post('/save-project', (req, res, data) => {

    signinSchema.findOneAndUpdate({ email: req.body.email }, { imgSrc: req.body.imgSrc }, function (err, result) {
        res.send("done")
    })

})
app.get('/tellToken', ensureToken, (req, res, next) => {
    res.send(res.locals.user.user)
})

app.post('/signin', async (req, res, next) => {
    const { name, email, company, password } = req.body
    const hashedPassword = await bycrypt.hash(password, 10)
    crypto.randomBytes(32, (err, buffer) => {
        const token = buffer.toString('hex')
        const SchemaCheck = signIn({
            name, email, company, password: hashedPassword, role: null, roleStatus: false,
            resetTokenAccount: token, expireTokenAccount: (Date.now() + 3600000), active: false
        })
        if (err) return res.send({ success: false, msg: "error in generating your id." })
        console.log(email)
        signIn.findOne({ email }, function (err, result) {
            if (!result || (result.active == false && result.email == email)) {
                SchemaCheck.save().then(() => {
                    transporter.sendMail({
                        to: email,
                        from: "aijazsameer5@gmail.com",
                        subject: "Activate Your Account",
                        html: `
                            <p>Your request to SignIn</p>
                            <h5>CLick on this
                            <a href="http://localhost:3000/account-activation/${token}">Link</a> to Activate Your Account.</h5>
                            <p>Above link is valid for one hour only as per the security policy.</p>`
                    })
                })
                return res.send({ success: true, msg: "Confimation Link has been sent to Your Email. new" })
            }
            if (result.email === email && result.active == true) return res.send({ success: false, msg: "email is taken" })
        })
    })


})
app.post('/login', async (req, res, next) => {
    const { email, password, check } = req.body
    signIn.findOne({ email }, async function (err, result) {
        if (err) return res.send({ success: false, msg: "Connection Error" })
        if (!result || err) return res.send({ success: false, msg: "invalid login credentials!" })
        const user = {
            email,
            check,
            role: result.role
        }
        if (!result.active) return res.send({ sucess: false, msg: "Kindly Verify your email" })
        if (!result.roleStatus) return res.send({ sucess: false, msg: "Wait until Admin Gives You Permission To Enter" })
        const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" })




        if (bycrypt.compare(password, result.password)) return res.send({ success: true, msg: "login succeed", token })
        res.send({ success: false, msg: "password invalid" })
    })
})
app.post('/checkTokenAccount', (req, res, next) => {
    const token = req.body.token
    signIn.findOne({ resetTokenAccount: token }, function (err, result) {
        result.active = true
        result.resetTokenAccount = undefined
        result.expireTokenAccount = undefined
        result.save()
        if (result.expireTokenAccount > Date.now()) {
            return res.send({ success: true, msg: "token is valid" })
        }
        res.send({ success: false, msg: "token is expired" })
    })

})

app.post('/Sender', (req, res, next) => {
    dataposting.findById({ _id: req.body.id }, function (err, result) {
        res.send(result)
    })
})

app.post('/Finderr', async (req, res, next) => {
    const name = req.body.name
    const adminmaail = req.body.adminmail
    dataposting.find({
        $and: [
            {
                adminmail: adminmaail
            },
            {
                $or: [
                    { name: name },
                    { number: name },
                ]
            }
        ]
    }, function (err, result) {
        res.send(result)
    })
})

app.post('/primary', async (req, res, next) => {
    const id = req.body.data
    const adminmaail = req.body.adminmail

    dataposting.find({ _id: id }, (err, result) => {
        res.send(result)

    })
})
app.post('/visitorform', async (req, res, next) => {
    const {
        name, address, number, towhom, email, entrytime, exittime, comments, adminmail, reason
    } = {
        name: req.body.name, address: req.body.address, number: req.body.number, towhom: req.body.towhom, email: req.body.email, entrytime: req.body.entrytime, exittime: req.body.exittime, comments: req.body.comments, adminmail: req.body.adminmail, reason: req.body.reason
    }
    const Scheeme = dataposting({
        name, address, number, towhom, email, entrytime, exittime, comments, adminmail, reason
    })
    const resullt = await Scheeme.save()
    res.send(resullt)
})


app.patch('/selll', async (req, res, next) => {
    const dataupdate = await dataposting.findByIdAndUpdate({ _id: req.body.ide }, req.body)
    res.send()
})


app.get('/approve', (req, res, next) => {
    signinSchema.find({ roleStatus: false }, { password: 0 }, function (err, result) {
        res.send(result)
    })
})


app.post('/sendqr', (req, res, next) => {

    const coconut = req.body.alpha
    dataposting.findById({ _id: req.body.alpha },
        (err, result) => {
            const email = result.email
            const name = result.name
            QRCode.toDataURL(coconut, function (err, url) {
                res.send("ok")
                transporter.sendMail({
                    to: email,
                    from: "aijazsameer5@gmail.com",
                    subject: "QRCODE",
                    html: `
                        <p>Your QRCODE for Assistance</p>
                        <h2>QRCODE image </h2>
                        
                        <p>hello ${name} We Are Looking Forward for You.</p>`,
                    attachments: [
                        {
                            filename: 'QRCODE.jpg',
                            path: url
                        }
                    ]
                })
            })
        }
    )

})



app.patch('/cancelation', (req, res, next) => {
    dataposting.findByIdAndUpdate({ _id: req.body.fully.alpha }, {
        entrytime: req.body.fully.beta,
        exittime: req.body.fully.beta,
    }, function (err, result) {
        res.send("Done")
    })
})



app.patch('/updatedids', (req, res, next) => {
    dataposting.findByIdAndUpdate({ _id: req.body.id }, {
        exittime: req.body.extt,
        comments: req.body.comm,
    }, function (err, result) {
        res.send(result)
    })
})

app.post('/AdminDelete', (req, res, next) => {

    dataposting.findByIdAndDelete({ _id: req.body.id }, function (err, result) {
        res.send(result)
    })
})

app.post('/table', (req, res, next) => {
    const emaily = req.body.emaail
    dataposting.find({ adminmail: emaily }, function (err, result) {
        res.send(result)
    })
})


app.patch('/Update', async (req, res, next) => {
    const dataupdate = await dataposting.findByIdAndUpdate({ _id: req.body._id }, req.body)
})

app.post('/dataed', (req, res, next) => {
    const eamilyy = req.body.emaily
    signinSchema.findOne({ email: eamilyy }, function (err, result) {
        res.send(result)
    })
})

app.put('/changePass', async (req, res, next) => {
    const hashedPassword = await bycrypt.hash(req.body.NPassword, 10)
    signIn.findOne({ email: req.body.adminmail }, async function (err, result) {
        const oldPass = result.password
        const see = await bycrypt.compare(req.body.CPassword, oldPass)
        if (see === false) return res.send(false)
        result.password = hashedPassword
        res.send(true)
        result.save()


    })

})

app.post('/checkToken', (req, res, next) => {
    const token = req.body.token
    signIn.findOne({ resetToken: token }).then((valid) => {
        if (!valid) return res.send({ success: false, token: "token not found" })
        if (valid.expireToken > Date.now()) {
            return res.send({ success: true, msg: "token is valid" })
        } res.send({ success: false, msg: "token is expired" })

    })
})
app.post('/forgotPassword', (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) return res.send({ success: false, msg: "error in generating your id." })
        const token = buffer.toString('hex')
        signIn.findOne({ email: req.body.email, active: true }, function (err, result) {
            if (!result) return res.send({ success: false, msg: "email invalid" })
            result.resetToken = token
            result.expireToken = Date.now() + 3600000
            result.save().then((result) => {
                transporter.sendMail({
                    to: result.email,
                    from: "aijazsameer5@gmail.com",
                    subject: "password reset",
                    html: `
                        <p>Your request for passoword reset</p> 
                        <h5>CLick on this
                         <a href="http://localhost:3000/resetPassword/${token}">Link</a> to reset your password.</h5>
                         <p>Above link is valid for one hour only as per the security policy.</p>`
                })
                res.send({ success: true, msg: "check your email." })
            })
        })
    })
})
app.post('/newPassword', async (req, res, next) => {
    const sentToken = req.body.token
    const hashedPassword = await bycrypt.hash(req.body.password, 10)
    signIn.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then((user) => {
            if (!user) return res.send({ success: false, msg: "your token is expired" })
            user.password = hashedPassword,
                user.resetToken = undefined,
                user.expireToken = undefined
            user.save().then(() => {
                res.send({ success: true, msg: "password has been reset" })
            })
        }).catch((err) => {
            res.send({ success: false, msg: "Connection Failed" })
        })
})



app.post('/acceptEntry', async (req, res, next) => {
    signinSchema.findByIdAndUpdate({ _id: req.body.e.id }, { roleStatus: true }, function (err, result) {
        res.send("done")
    })
})



app.patch('/deleteEntryRequest', async (req, res, next) => {
    signinSchema.findByIdAndDelete({ _id: req.body.e.id }, function (err, result) {
        res.send("done")
    })
})





app.post('/goo', (req, res, next) => {
    signinSchema.find({}, function (err, result) {
        res.send(result)
    })



})



app.patch('/blockeed', (req, res, next) => {
    signinSchema.findByIdAndUpdate({ _id: req.body.fully.alpha }, {
        roleStatus: req.body.fully.beta,
    }, function (err, result) {
        res.send("Done")
    })
})


app.post('/userdlllt', (req, res, next) => {

    signinSchema.findByIdAndDelete({ _id: req.body.id }, function (err, result) {
        res.send(result)
    })
})



app.patch('/Updateuser', async (req, res, next) => {
    const dataupdate = await signinSchema.findByIdAndUpdate({ _id: req.body._id }, req.body)
})




app.post('/newuser', async (req, res, next) => {
    const { adminmail, company, name, email, password, manager } = req.body
    var alphaa = []
    const hashedPassword = await bycrypt.hash(password, 10)
    signinSchema.find({ email }, function (err, result) {
        alphaa = result

    }).then(() => {
        if (alphaa.length === 0) {
            const SchemaCheck = signinSchema({
                adminmail, company, branchlocation: name, name: manager, email, password: hashedPassword, active: true, role: "user", roleStatus: true,
            })
            SchemaCheck.save().then(() => {
                res.send("ok")
            })
        } else if (alphaa.length !== 0) {
            res.send("Email alredy Exist")
        }
    })
})




app.post('/creatytable', async (req, res, next) => {
    const emaily = req.body.emaail
    signIn.find({ adminmail: emaily }, function (err, result) {
        res.send(result)
    })
})





app.patch('/Branchcanel', (req, res, next) => {
    signIn.findByIdAndUpdate({ _id: req.body.fully.alpha }, {
        roleStatus: req.body.fully.beta
    }, function (err, result) {
        res.send("Done")
    })
})


















const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
    app.listen(PORT, () => {
        console.log('server is running on localhost 5000')
    })
    console.log('database is connected')
})
