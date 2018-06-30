pragma solidity ^0.4.2;

contract Election {
	
	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}
	
	mapping(address => bool) public voters;
	mapping(uint => Candidate) public candidates;
	
	//string  public candidate;
	
	uint public candidatesCount;
	
	event votedEvent(
		uint indexed _candidateId
	);
	
	function Election () public {
		//candidate = "Rudresh";
		addCandidate("Rudresh Trivedi");
		addCandidate("Tathya Thaker");
	}
	
	function addCandidate (string _name) private {
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
	}
	
	function vote (uint _candidateID) public {
		require(!voters[msg.sender]);
		require(_candidateID > 0 && _candidateID <= candidatesCount);
		voters[msg.sender] = true;
		candidates[_candidateID].voteCount++;
		
		votedEvent(_candidateID);
	}
}