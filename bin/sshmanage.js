var program = require('commander');
var pkg = require('../package.json');
program.version(pkg.version);
var actions = require('../lib/actions');
program.command('show').description('show all users for group proxys').action(actions.show);
program.command('adduser').description('add user in group proxys').action(actions.adduser);
program.command('removeuser').description('remove user in group proxys').action(actions.removeuser);
program.command('password').description('change user\' password in group proxys').action(actions.password);
program.command('renewals').description('renewals user\' in group proxys').action(actions.renewals);
program.command('disable').description('disable user\' in group proxys').action(actions.disable);
program.parse(process.argv);

if (!program.args.length) program.help();
