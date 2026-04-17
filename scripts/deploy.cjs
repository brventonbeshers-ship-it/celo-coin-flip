const hre = require("hardhat");

async function main() {
  const CeloCoinFlip = await hre.ethers.getContractFactory("CeloCoinFlip");
  console.log("Deploying CeloCoinFlip to Celo mainnet...");
  const contract = await CeloCoinFlip.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`CeloCoinFlip deployed to: ${address}`);

  console.log("Waiting for CeloScan indexing...");
  await new Promise((resolve) => setTimeout(resolve, 30000));

  try {
    await hre.run("verify:verify", { address, constructorArguments: [] });
    console.log("Verified on CeloScan");
  } catch (error) {
    console.log("Verification failed:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
