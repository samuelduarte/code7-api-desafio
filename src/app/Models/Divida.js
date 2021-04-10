const mongoose = require('mongoose');

const Divida = mongoose.Schema(
    {
        user_id: {type: Number, required: true},
        motivo_divida: {type: String, required: true},
        data_divida: {type: Date, required: true},
        valor: {type: Number, required: true}
    },
    {
        timestamps: true,
    }

);

module.exports = mongoose.model('divida', Divida)