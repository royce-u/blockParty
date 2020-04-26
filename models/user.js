'use strict';
let bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'First Name is a required field'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,255],
          msg: 'Last Name is a required field'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,32],
          msg: 'Password length must be 8-32 characters long'
        }
      }
    },
    bio: DataTypes.TEXT,
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    admin: DataTypes.BOOLEAN,
    pic: DataTypes.STRING,
    zipcode: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: pendingUser => {
        //hash the password
        let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)
        //reassign the hashed password (overwrite the plain text password)
        pendingUser.password = hashedPassword
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };

  user.prototype.validPassword = function(typedInPassword) {
    //determine if gthe password typed in hashes to the same thing as the existing has (returns boolean)
    let correctPassword = bcrypt.compareSync(typedInPassword, this.password)
    //return the (boolean) result of the comparison
    return correctPassword
  }
  
  return user;
};