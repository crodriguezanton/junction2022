import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

import { deployToken } from '@streamr/data-v2'
import { DataUnionTemplate, DefaultFeeOracle } from "../typechain-types";
import { parseEther } from "ethers/lib/utils";

async function main() {

  const [owner] = await ethers.getSigners();

  const {
    token,
    feeOracle,
  } = await deployContracts(owner);

  console.log(`Deployed FeeOracle to: ${feeOracle.address} and token to: ${token.address}`);

}


const deployContracts = async (deployer: SignerWithAddress) => {
  const token = await deployToken(deployer)

  const feeOracle = await deployFeeOracle(deployer.address)

  return {
    token,
    feeOracle}
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

main().catch((error: any) => {
  console.error(error);
  process.exitCode = 1;
});
