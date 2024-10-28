import { Schema, model } from 'mongoose';


const organisationSchema = new Schema({
    org_id: {
        type: Number,
        required: true,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 255,
    },
    type: {
        type: String,
        maxlength: 100,
    },
    address: {
        type: String,
        maxlength: 255,
    },
    contact_info: {
        type: String,
        maxlength: 255,
    }
});

export default model('Organisation', organisationSchema);