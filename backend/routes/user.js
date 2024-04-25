const express = require('express')
const { userCreate, getAllUser, updateUser, deleteUser, deleteUserById } = require('../controller/user')
const router = express.Router()

router.post('/createUser', userCreate)
router.get('/getallUser', getAllUser)
router.put('/updateUser', updateUser)
router.delete('/deleteUser', deleteUser)
router.delete('/deleteUserById', deleteUserById)

module.exports = router