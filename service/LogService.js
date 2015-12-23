var winston = require( 'winston' ),
    fs = require( 'fs' ),
    logDir = './log', // Or read from a configuration
    env = process.env.NODE_ENV || 'dev',
    logger;

winston.setLevels( winston.config.npm.levels );
winston.addColors( winston.config.npm.colors );

if ( !fs.existsSync( logDir ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( logDir );
}

logger = new( winston.Logger )( {
    transports: [
        new (winston.transports.Console)( {
            name: 'warning',
            level: 'warn', // Only write logs of warn level or higher
            colorize: true
        } ),
        new (winston.transports.Console)( {
            name: 'debugging',
            level: 'debug',
            colorize: true
        }),
        // new (winston.transports.Console)( {
        //     name: 'infomation',
        //     level: 'info'
        // })
        new winston.transports.File( {
            level: 'info',
            filename: logDir + '/logs.log',
            json: true,
            maxsize: 1024 * 1024 * 10 // 10MB
        } )
    ],
    exceptionHandlers: [
        new winston.transports.Console( {
            level: 'debug',
            humanReadableUnhandledException: true,
            colorize: true
        }),
        new winston.transports.File( {
            filename: 'log/exceptions.log',
            json: true
        } )
    ]
} );

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message.replace('\n',''))
    }
};