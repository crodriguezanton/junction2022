import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

import { deployToken } from '@streamr/data-v2'
import { DataUnionTemplate, DefaultFeeOracle } from "../typechain-types";
import { parseEther } from "ethers/lib/utils";

async function main() {

  const [owner] = await ethers.getSigners();

  const tokenAddress = "0x3a9A81d576d83FF21f26f325066054540720fC34";
  const feeOracle = "0x369Be397b3Cfe914728Bbd2329c0e5D1FE2E4202";

  const dataUnion = await deployDataUnion(
    owner.address,
    tokenAddress,
    feeOracle
)

  console.log(`Deployed DataUnionFactory to: ${dataUnion.address}`);

  const tx = await dataUnion.addMember(owner.address);
  await tx.wait();

  const firstShares = await dataUnion.totalShares();
  console.log(firstShares.toNumber());

  // const tx2 = await dataUnion.changeMemberShare(owner.address, 5);
  // await tx2.wait();

  // const secondShares = await dataUnion.totalShares();
  // console.log(secondShares.toNumber());

}

async function deployDataUnion(
  deployerAddress: string,
  tokenAddress: string,
  protocolFeeOracleAddress: string,
): Promise<DataUnionTemplate> {
  const factory = await ethers.getContractFactory("DataUnionTemplate")
  const contract = await factory.deploy()
  await contract.deployTransaction.wait()
  const tx = await contract.initialize(
    deployerAddress,
    tokenAddress,
    [deployerAddress],
    parseEther("0.01"),
    protocolFeeOracleAddress,
    "{}"
  )
  await tx.wait()
  return contract
}

main().catch((error: any) => {
  console.error(error);
  process.exitCode = 1;
});
