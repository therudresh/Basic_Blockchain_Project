var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
	it ("Started with two candidates", function(){
		return Election.deployed().then(function(instance) {return instance.candidatesCount(); }).then(function(count){ assert.equal(count, 2);
		});
	});
	
	it("Correct initialization of candidates", function(){
		return Election.deployed().then(function(instance){ 
			e = instance; 
			return e.candidates(1); }).then (function (candidate){ 
				assert.equal(candidate[0], 1, "Correct ID");
				assert.equal(candidate[1], "Rudresh Trivedi", "Correct Name");
				assert.equal(candidate[2], 0, "Correct Vote");
				return e.candidates(2);
			}).then(function(candidate){
				assert.equal(candidate[0], 2, "Correct ID");
				assert.equal(candidate[1], "Tathya Thaker", "Correct Name");
				assert.equal(candidate[2], 0, "Correct Vote");
			});
	});

	it("He/She is allowed to vote", function() {	
		return Election.deployed().then(function(instance) {
			electionInstance = instance;
			candidateId = 1;
			return electionInstance.vote(candidateId, {from: accounts[0] });
		}).then(function(receipt) {
			return electionInstance.voters(accounts[0]);
		}).then(function(voted) {
			assert(voted, "The voter is marked");
			return electionInstance.candidates(candidateId);
		}).then(function(candidate){
			var voteCount = candidate[2];
			assert.equal(voteCount, 1, "incremented vote count");
		})
	});
});