const mongoose = require('mongoose');

const thoughtSchema = mongoose.Schema({
    thought: String
});


const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;