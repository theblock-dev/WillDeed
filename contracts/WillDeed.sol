// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract WillDeed {
  address public lawyer;
  address payable public recipient;
  uint public amount;
  uint public startDate;

  constructor(address _lawyer, address payable _recipient, uint _amount, uint _fromToday) payable {
    require(_amount == msg.value);
    lawyer = _lawyer;
    recipient = _recipient;
    amount = _amount;
    startDate = block.timestamp + _fromToday;
  }

  function withdraw() external {
    require(msg.sender == lawyer, 'only Lawyer can withdraw');
    require(block.timestamp >= startDate, 'too early to withdraw');
    recipient.transfer(amount);
  }

}
