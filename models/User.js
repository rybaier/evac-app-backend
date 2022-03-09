const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
          delete ret.password;
          return ret;
        },
      },
    }
  );
// use function keyword instead of arrow function to gain access to entire this instance of file
//before saving user to db salt and hash password
UserSchema.pre('save', function(next){
    const user =this
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err, salt) =>{
        if (err) {
            return next(err)
        }
    
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err){
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})
//compare passswords for authentication use
UserSchema.methods.comparePassword = function(candidatePassword) {
    const user = this
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            }
            if(!isMatch){
                return reject(false)
            }
            resolve(true)
        })
    })
}

const User = mongoose.model('User', UserSchema)

module.exports = User