const express = require("express");
const authControlRoom = require("../controllers/authController");

const router = express.Router();

router.post('/register', authControlRoom.register);
router.get('/login', authControlRoom.login);

module.exports =  router; 