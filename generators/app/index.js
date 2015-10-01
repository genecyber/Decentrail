'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the generator for ' + chalk.red('Decentrail') + ' !\r\n'
	  +'Lets P2P All Of the Things \r\n - Shannon Code' 
	
    ));

    var prompts = [
		{
		  type: 'confirm',
		  name: 'websockets',
		  message: 'Want Websockets? \r\n' + chalk.green('(Real time communication between thirdparties or your user clients.)') ,
		  default: true
		} , {
			type: 'confirm',
			name: 'webrtc',
			message: 'Want Mesh Networking using WebRTC?',
			default: true
		} , {
			type: 'confirm',
			name: 'realtime',
			message: 'Want Centralized Real time API?',
			default: true
		} , {
        type: 'list',
        name: "realtime",
        message: 'Want Centralized Real time API?',
        choices: [
			{
				name: 'PubNub',
				value: ['pubnub', 'pubnub']
			}, {
				name: 'FireBase',
				value: ['firebase','firebase']
			}, {
				name: 'Pusher',
				value: ['pusher','pusher']
			}, {
				name: 'None',
				value: ['none','none']
			}]
		} , {
			type: 'confirm',
			name: 'inbrowserdatabase',
			message: 'Want an in browser database layer?',
			default: true
		} , {
			type: 'confirm',
			name: 'logout',
			message: 'Want the ability to logout?\r\n' + chalk.green('Destroy locally stored data') ,
			default: true
		} , {
        type: 'list',
        name: "vfs",
        message: 'Want a Virtual File System?',
        choices: [
			{
				name: 'via Mesh Network',
				value: 'meshnetwork'
			}, {
				name: 'via single Cloud Service?',
				value: 'singlecloud'
			}, {
				name: 'via multiple Cloud Service? (Kloudless)',
				value: 'multiplecloud'
			}, {
				name: 'None',
				value: 'none'
			}]
		}, {
			when: function( props ){
				return props.vfs[0] === 'meshnetwork'
			},
			type: 'confirm',
			name: "exportmesh",
			message: 'Want the ability to export (Encrypted) user state via the [Mesh Network]?',
			default: true
		}, {
			when: function( props ){
				return props.vfs[0] === 'singlecloud'
			},
			type: 'confirm',
			name: "exportsinglecloud",
			message: 'Want the ability to export (Encrypted) user state via the [Single Cloud]?',
			default: true
		}, {
			when: function( props ){
				return props.vfs[0] === 'multiplecloud'
			},
			type: 'confirm',
			name: "exportkloudless",
			message: 'Want the ability to export (Encrypted) user state via the [Kloudless]?',
			default: true
		} , {
			type: 'list',
			name: 'guids',
			message: 'Want user GUID\'s to use ECDSA? \r\n' + chalk.green('Elliptic Curve Digital Signature Algorithm'),
			choices: [
				{
					name: 'using Custom Addressing',
					value: 'custombits'
				},{
					name: 'using Bitcoin Addressing',
					value: 'bitcoinbits'
				},{
					name: 'using Altcoin Addressing',
					value: 'altcoinbits'
				},{
					name: 'using Ethereum Addressing',
					value: 'ethereumbits'
				},{
					name: 'None',
					value: 'none'
				}]
		} , {
			when: function( props ){
				return props.guids === 'custombits'
			},
			type: 'input',
			name: 'custombits',
			message: 'Which bits {json}?'
		},  {			
			type: 'confirm',
			name: 'p2pchat',
			message: 'Want p2p chat?',
			default: true
		}, {
			when: function( props ){
				return props.p2pchat
			},
			type: 'confirm',
			name: 'p2pprivatechat',
			message: 'include Private Chat (1:1)?',
			default: true
		}, {
			when: function( props ){
				return props.p2pchat
			},
			type: 'confirm',
			name: 'p2pprivatechat',
			message: 'include Video in Chat?',
			default: true
		}, {
			when: function( props ){
				return props.p2pchat
			},
			type: 'confirm',
			name: 'p2pchatencryption',
			message: 'include Chat Encryption?',
			default: true
		}, {
			when: function( props ){
				return props.p2pchat
			},
			type: 'confirm',
			name: 'p2pchatpresence',
			message: 'include Chat Presence?',
			default: true
		}, {
			type: 'confirm',
			name: 'deploy',
			message: 'Would you like deployments other than a single server?',
			default: true
		}, {
			when: function( props ){
				return props.deploy
			},
			type: 'confirm',
			name: 'deploymobile',
			message: 'Deploy to Mobile with PhoneGap?',
			default: true
		}, {
			when: function( props ){
				return props.deploy
			},
			type: 'confirm',
			name: 'deployipfs',
			message: 'Deploy to p2p with IPFS ?',
			default: true
		}, {
			when: function( props ){
				return props.deploy
			},
			type: 'confirm',
			name: 'deployelectron',
			message: 'Deploy desktop client with Electron?',
			default: true
		}
	];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
