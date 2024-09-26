const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("WordUploader", (m) => {
  const WordUploader = m.contract("WordUploader");

  return { WordUploader };
});
