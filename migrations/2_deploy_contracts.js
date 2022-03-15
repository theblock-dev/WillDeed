const WillDeed = artifacts.require('WillDeed.sol');

module.exports = function(deployer, network, accounts){
    deployer.deploy(WillDeed,accounts[1],accounts[2],100,5,{value:100});
}