const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 6969

app.use(bodyParser.json())

app.get('/user', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send({ namaLengkap: 'Winggar', alamat: 'Jl. Candi 7' })
})

app.post('/user', function (req, res) {
    let userId = '456'
    let userFullName = req.body.namaLengkap
    let userAddress = req.body.alamat
    res.set('Content-Type', 'application/json')
    res.send({ userId: userId, namaLengkap: userFullName, alamat: userAddress })
})

app.get('/product', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send(
        [
            { productId: 'P-0001', productName: 'Sabun Mandi' },
            { productId: 'P-0002', productName: 'Gula ' },
            { productId: 'P-0003', productName: 'Garam' },
            { productId: 'P-0004', productName: 'Minyak Goreng' },
            { productId: 'P-0005', productName: 'Sepeda gunung' },
            { productId: 'P-0006', productName: 'Lampu LED' },
            { productId: 'P-0007', productName: 'Lemari' },
            { productId: 'P-0008', productName: 'Wajan' }
        ]
    )
})

app.get('/category', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send(
        [
            { categoryId: 'C-0001', categoryName: 'alat mandi' },
            { categoryId: 'C-0002', categoryName: 'kendaraan' },
            { categoryId: 'C-0003', categoryName: 'peralatan dapur' },
            { categoryId: 'C-0004', categoryName: 'Perabotan' }
        ]
    )
})

app.post('/auth/:key', function (req, res) {
    let email = ''
    let password = ''
    let userFullName = ''
    res.set('Content-Type', 'application/json')
    if (req.params.key === 'email') {
        email = req.body.email
        if (email === 'iratwinggar@gmail.com') {
            res.send({ status: 'ok',id:'123' })
        } else {
            res.sendStatus(401)
        }
    } else {
        password = req.body.password;
        if (password === '123' ) {
            res.send({ status: 'ok', email: email, userFullName: "Iratdya Winggari" })
        } else {
            res.sendStatus(401)
        }
    }
})

app.listen(port, () => console.log(`example app listen on port ${port}`))
