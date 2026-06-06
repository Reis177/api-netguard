import mongoose from 'mongoose';

const HostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: String, required: true }, // Ex: cluster0.mongodb.net ou 127.0.0.1
  port: { type: Number, required: true }, // Ex: 27017
  lastChecked: { type: Date, default: Date.now },
  status: { type: String, enum: ['ONLINE', 'OFFLINE'], default: 'OFFLINE' },
  latencyMs: { type: Number, default: 0 },
  errorMessage: { type: String, default: null }
});

export default mongoose.model('Host', HostSchema);