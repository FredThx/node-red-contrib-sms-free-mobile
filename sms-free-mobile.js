var got = require('got');
module.exports = function(RED) {
	
	// free-mobile-account
    function  free_mobile_account(config){ 
        RED.nodes.createNode(this, config); 
		this.user = config.user;
		this.pass = config.pass;
		this.api_url = config.api_url;
		this.name = config.name;
		var node = this;
    }
    RED.nodes.registerType("free-mobile-account" ,free_mobile_account); 
	
	// sms-free-mobile
    function sms_free_mobile(config) {
        RED.nodes.createNode(this,config);
        this.free_mobile_account = RED.nodes.getNode(config.free_mobile_account);
		//this.to = config.to;
		this.texto = config.texto;
		this.status({});
		var node = this;
        
		this.on('input', function(msg) {
			//node.log("hello");
			var url = this.free_mobile_account.api_url;
			url += '?user=' + this.free_mobile_account.user;
			url += '&pass=' + this.free_mobile_account.pass;
			if (this.to) {
				url += '&to=' + this.to;
			}
			if (this.texto) {
				url += '&msg=' + encodeURIComponent(this.texto);
			} else {
				url += '&msg=' + encodeURIComponent(msg.payload);
			}
			got(url)
				.catch(err => {
					this.status({fill: 'red', shape: 'dot', text: err.message});
					this.error(err, url);
				});
			});
    }
    RED.nodes.registerType("sms-free-mobile",sms_free_mobile);
}

