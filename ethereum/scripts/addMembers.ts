import { ethers } from "hardhat";

async function main() {

  // const [owner] = await ethers.getSigners();

  const dataUnion = await ethers.getContractAt("DataUnionTemplate", "0xeFE8eeDee301aE5677BD2Ac89d07D79cc0899824");

  const tx = await dataUnion.addMember("0xC68Ee46bC685E2c647Fab8880B1D4c0c10Dec87D");
  await tx.wait();

  const tx2 = await dataUnion.changeMemberShare("0xC68Ee46bC685E2c647Fab8880B1D4c0c10Dec87D", 3);
  await tx2.wait();

  const firstShares = await dataUnion.totalShares();
  console.log(firstShares.toNumber());

}

main().catch((error: any) => {
  console.error(error);
  process.exitCode = 1;
});
