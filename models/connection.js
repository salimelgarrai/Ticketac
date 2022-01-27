const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };
  
  // --------------------- BDD -----------------------------------------------------
  mongoose.connect('mongodb+srv://salimelgarrai:sElg0312@cluster0.0jrge.mongodb.net/Ticketac?retryWrites=true',
     options,
     function(err) {
      if (err) {
        console.log(`error, failed to connect to the database because --> ${err}`);
      } else {
        console.info('*** Database Ticketac connection : Success ***');
      }
     }
  );