const { expect } = require("chai");

describe("walletManager", function () {
  let walletManager;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const WalletManager = await ethers.getContractFactory("walletManager");
    [owner, addr1, addr2] = await ethers.getSigners();
    walletManager = await WalletManager.deploy();
    await walletManager.deployed();
  });

  it("You must add a new address", async function () {
    expect(await walletManager.addAddress(addr1.address, "Juan Perez"))
      .to.emit(walletManager, "AddressAdded")
      .withArgs(addr1.address, "Juan Perez");

    const addresses = await walletManager.getAddress();
    expect(addresses.length).to.equal(1);
    expect(addresses[0]).to.equal(addr1.address);
  });

  it("Do not add an existing address", async function () {
    await walletManager.addAddress(addr1.address, "Juan Perez");
    await expect(walletManager.addAddress(addr1.address, "Juan Perez")).to.be.revertedWith("This address is already registered in the wallet.");
  });

  it("Must return the user name of an address", async function () {
    await walletManager.addAddress(addr1.address, "Juan Perez");

    expect(await walletManager.getsUerName(addr1.address)).to.equal("Juan Perez");
  });

  it("You must return the balance of an address", async function () {
    expect(await walletManager.obtenerSaldo(owner.address)).to.equal(await owner.getBalance());
  });

  it("It should return a list of all wallets", async function () {
    await walletManager.addAddress(addr1.address, "Juan Perez");
    await walletManager.addAddress(addr2.address, "Maria Lopez");

    const [addresses, usersNames, balances] = await walletManager.getAllWallets();
    expect(addresses.length).to.equal(2);
    expect(addresses[0]).to.equal(addr1.address);
    expect(usersNames[0]).to.equal("Juan Perez");
    expect(balances[0]).to.equal(addr1.balance);
    expect(addresses[1]).to.equal(addr2.address);
    expect(usersNames[1]).to.equal("Maria Lopez");
    expect(balances[1]).to.equal(addr2.balance);
  });
});
