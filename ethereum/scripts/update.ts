import { ethers } from "hardhat";

async function main() {

  // const [owner] = await ethers.getSigners();

  const dataUnion = await ethers.getContractAt("DataUnionTemplate", "0xeFE8eeDee301aE5677BD2Ac89d07D79cc0899824");

  const tx = await dataUnion.refreshRevenue();
  await tx.wait();

  const revenue = await dataUnion.totalRevenue();
  console.log(revenue.toNumber());

}

main().catch((error: any) => {
  console.error(error);
  process.exitCode = 1;
});
