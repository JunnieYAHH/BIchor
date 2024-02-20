const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      defaultValue: 'user',
      enum: ["admin", "organisation", "user", "clinic", "donor"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "user" || this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    organisationName: {
      type: String,
      required: function () {
        if (this.role === "organisation") {
          return true;
        }
        return false;
      },
    },
    clinicName: {
      type: String,
      required: function () {
        if (this.role === "clinic") {
          return true;
        }
        return false;
      },
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is requied"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    description: [
      {
        sex: {
          type: String,
          enum: ["male", "female"],
        },
        birthDate: {
          type: Date,
        },
        bloodType: {
          type: String,
          enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
        },
        year: {
          type: String,
        },
        course: {
          type: String,
        },
        weight: {
          type: Number,
          validate: {
            validator: function (value) {
              return value >= 45;
            },
            message: 'Weight must be 45 kg or more'
          }
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);