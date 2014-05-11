var sh = require('execSync');
var groupName = 'proxys';

module.exports = {
	show: function() {
        var groups = sh.exec('cut -d: -f1 /etc/group | grep '+groupName);
        if(groups.code){
            //创建proxys组
            sh.exec('groupadd '+groupName);
        }
        var users = sh.exec('cat /etc/group | grep --regex "^'+groupName+':.*" | awk -F: \'{print $4}\'');
        if(users.stdout == '\n'){
            //没有用户组     
            console.log('no users in group '+groupName);
        }else{
            //有用户输出     
            var userlist = users.stdout.replace(/\n/g,'').split(',');
            console.log(userlist);
        }
	},
	adduser: function(username) {
        sh.run('useradd -M -s /sbin/nologin -n '+username);
        sh.run('usermod -G '+groupName+' '+username);
	},
	removeuser: function() {

	},
	password: function() {

	},
	renewals: function() {

	},
	disable: function() {
	
	}
};

