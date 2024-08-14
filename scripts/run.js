async function main() {
    const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
    const gameContract = await gameContractFactory.deploy(
        ["MasterCoco", "Espada Chen", "Mago Sven"],
        [
            "https://i.imgur.com/gC5qXsl.png",
            "https://i.imgur.com/0PvxtwP.png",
            "https://i.imgur.com/Pj8lHpM.png",
        ],
        [80, 180, 300], // Pontos de vida
        [150, 70, 50] // Dando de ataque
    );
    let txn;
    // Só temos três personagens.
    // Uma NFT com personagem no index 2 da nossa array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    // Pega o valor da URI da NFT
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
    console.log("Contrato implantado no endereço:", gameContract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});