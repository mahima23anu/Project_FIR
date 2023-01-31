const contracts = artifacts.require("ProjectFIR");

module.exports = function (deployer) {
  deployer.deploy(contracts);
};