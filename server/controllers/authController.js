const bycrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

exports.login = async (req, res) =>{
    try {
        const admin = await Admin.findOne({ email: req.body.email })

        if(!admin){
            return res.status(404).json({ message: 'Admin not found' })
        }

        const isPasswordValid = await bycrypt.compare(req.body.password, admin.password)

        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid password' })
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        return res.status(200).json({ success: true, message: 'Login successful', token, admin })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}
exports.register = async (req, res) =>{
    try{
        const existingAdmin = await Admin.findOne({ email: req.body.email })

        if(existingAdmin){
            return res.status(400).json({ success: false, message: 'Admin already exists' })
        }
        const hashedPassword = await bycrypt.hash(req.body.password, 10)
        const admin = await Admin.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            role: 'admin',
        })

        return res.status(201).json({ success: true, message: 'Admin created successfully', admin })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}