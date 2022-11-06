import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

import { deployToken } from '@streamr/data-v2'
import { DataUnionTemplate, DefaultFeeOracle } from "../typechain-types";
import { parseEther } from "ethers/lib/utils";

async function main() {

  const [owner, otherAddress] = await ethers.getSigners();

  const {
    token,
    dataUnion,
  } = await deployContracts(owner);

  console.log(`Deployed DataUnionFactory to: ${dataUnion.address}`);

  const tx = await dataUnion.addMember(otherAddress.address);
  await tx.wait();

  const firstShares = await dataUnion.totalShares();
  console.log(firstShares.toNumber());

  const tx2 = await dataUnion.changeMemberShare(otherAddress.address, 5);
  await tx2.wait();

  const secondShares = await dataUnion.totalShares();
  console.log(secondShares.toNumber());

}


const deployContracts = async (deployer: SignerWithAddress) => {
  const token = await deployToken(deployer)

  // const dataUnionTemplate = await deployDataUnionTemplate()
  const feeOracle = await deployFeeOracle(deployer.address) // make deployer (the DAO) also protocol beneficiary
  const dataUnion = await deployDataUnion(
      deployer.address,
      token.address,
      feeOracle.address
  )

  return {
    token,
    dataUnion}
}

async function deployDataUnionTemplate(): Promise<DataUnionTemplate> {
  const factory = await ethers.getContractFactory("DataUnionTemplate")
  const contract = await factory.deploy()
  return contract.deployed()
}

async function deployFeeOracle(protocolBeneficiaryAddress: string): Promise<DefaultFeeOracle> {
  const factory = await ethers.getContractFactory("DefaultFeeOracle")
  const contract = await factory.deploy()
  await contract.deployed()
  const tx = await contract.initialize(
      parseEther("0.01"),
      protocolBeneficiaryAddress,
  )
  await tx.wait()
  return contract
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
