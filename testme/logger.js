const { createLogger, format, transports, config } = require('winston');

const usersLogger = createLogger({

   levels:config.syslog.levels,
  
   format: format.json() ,

transports: [
      new transports.File({ 
      filename: 'users.log', 
      level: 'error' ,
      format:format.combine(format.timestamp(),format.json())}),
  


   ]}
   
   );
const transactionLogger = createLogger({

   transports: [

      new transports.File({ 
            filename: 'transaction.log', 
            format:format.combine(format.timestamp(),format.json())}),

        
        

        
        
     ]
});

module.exports = {
    usersLogger: usersLogger,
    transactionLogger: transactionLogger
};