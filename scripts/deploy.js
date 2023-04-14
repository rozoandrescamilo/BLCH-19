async function main() {
  const walletManager = await ethers.getContractFactory("walletManager");
  const contract = await walletManager.deploy();

  console.log("walletManager contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
