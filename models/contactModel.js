const mongoose = require("mongoose");

const contactSchema = mongoose.Schema (
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
    },  
    name: {
    type: String,
    required: [true, "Plese add the Contact name"],
    },
    email: {
        type: String,
        required:[true,"Plesae add the Contact Email Id"],
    },
    phone: {
        type: String,
        required:[true, "Please add the Phoen Number"],
    },

}, {
    timestamps: true,
}
);

module.exports = mongoose.model("Contact", contactSchema);