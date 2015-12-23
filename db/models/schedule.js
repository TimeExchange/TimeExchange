var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var scheduleSchema = new Schema({

    timestamps : {
      createAt  : {type: Date, default: Date.now},
      updateAt  : {type: Date, default: Date.now}
    }
});

module.exports = mongoose.model('schedule',scheduleSchema);
