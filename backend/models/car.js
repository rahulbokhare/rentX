const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    pricePerDay: { type: Number, required: true, min: 0 },
    transmission: { type: String, enum: ['manual', 'automatic'], required: true },
    fuel: { type: String, enum: ['petrol', 'diesel', 'cng', 'electric'], required: true },
    seats: { type: Number, required: true, min: 1 },
    images: [String],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);