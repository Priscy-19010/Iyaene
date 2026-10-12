const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true, 
        select: false 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'admin', 
        required: true 
    },
} , 
{
    timestamps:true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      }
    },
}
)

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;