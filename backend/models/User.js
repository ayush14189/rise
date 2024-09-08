
// const UserSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     pic: {
//       type: String,
//       default:
//         "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
//     },
//     userType:{type:String, required:false},
//     gstNumber:{type:String, required : false},
//     cinNumber:{type:String, required : false},
//     panNumber:{type:String, required : false}, 
//     incubator_address:{type:String, required:false},
//     startup_domain:{type:String, required:false},
//     startup_owner:{type:String, required:false},
//     investor_amount:{type:Number,required:false},
    
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", UserSchema);
// module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['Startup', 'Mentor', 'IprManager','Researcher','Investor'],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
