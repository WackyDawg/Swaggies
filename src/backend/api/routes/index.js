import express from 'express'
import userRoute from './user.route.js'
import walletRoute from './wallet.route.js'
import transactionRoute from './transaction.route.js'

const router = express.Router()

router.use(userRoute,walletRoute,transactionRoute)

router.get('/', (req, res) => {
   return res.status(200).json({ message: "hello" })
})

module.exports = router;