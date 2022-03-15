const { expectRevert } = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");

const Deed = artifacts.require('WillDeed.sol');

contract('WillDeed', (accounts)=>{
    let deed = undefined;

    beforeEach(async () => {
        deed = await Deed.deployed();
    })

    it('should withdraw ether', async() =>{
        const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[2]));
        //wait for 5 seconds before you cann withdraw
        await new Promise(resolve=>{
            setTimeout(resolve, 5000)
        });
        
        await deed.withdraw({from:accounts[1]});

        const afterBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[2]));
        console.log(afterBalance.toString());        
        assert(afterBalance.toString() === '100000000000000000100');
    })

    it('should not allow withdraw if too early', async()=>{
        const newInstance = await Deed.new(accounts[1],accounts[2],100,5,{value:100})
        await expectRevert(
            newInstance.withdraw({from:accounts[1]}),
            'too early to withdraw'
        )
    });

    it('should give error if anyone else is withdrawing', async() => {
        await expectRevert(
            deed.withdraw({from:accounts[5]}),
            'only Lawyer can withdraw'
        );
    })



})