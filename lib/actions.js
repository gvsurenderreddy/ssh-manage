var sh = require('execSync');
var fs = require('fs');
var path = require('path');
var groupName = 'proxys';
var groupPath = path.join('/home/',groupName);

if(!fs.existsSync(groupPath)){
    fs.mkdirSync(groupPath);    
}


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
        sh.run('useradd -d /home/'+groupName+'/'+username+' -m -G '+groupName+' -s /bin/false '+username);
	},
	removeuser: function(username) {
        sh.run('userdel -rf '+username);
	},
	password: function(username,password) {

	},
	renewals: function() {

	},
	disable: function() {
	
	}
};

