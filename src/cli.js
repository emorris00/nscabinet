#!/usr/bin/env node

/* eslint-env node */
/* eslint-env es6 */

var yarr = require('yargs')
    .usage('Usage: nscabinet <command> <file> [options]')
    .command('u','Upload.')
    .command('d','Download.')
    .demand(1)
    .demand(2)
    //.describe('config','Point to a nsconfig.json file.')
    .describe('rootpath','Netsuite origin path.')
    .alias('rootpath','p')
    .describe('email','Account email.')
    .describe('password','Account password.')
    .describe('account','Account id.')
    .describe('realm','*.netsuite.com')
    .describe('role')
    .describe('script','Script id.')
    .describe('deployment','Deployment id.')
    .describe('flatten')
    .argv;

var cabinet = require('./nscabinet.js'),
    vinylfs = require('vinyl-fs');

var action = yarr._[0],
    globs = yarr._.slice(1);

var opts = {
    isCLI : true
};

for (var it in yarr) {
    if (yarr[it] !== undefined) opts[it] = yarr[it];
}
if (opts.rootpath) opts.rootPath = opts.rootpath;

if ( action == 'u' ) {

    vinylfs.src(globs).pipe(cabinet(opts));

} else if ( action == 'd' ) {

    cabinet.download(globs[0],opts).pipe(vinylfs.dest('.'));

}

process.on('exit' , () => { console.log('\n'); });