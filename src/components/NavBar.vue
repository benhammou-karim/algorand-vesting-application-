<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"> TESLA Dapp </a>
            <form class="d-flex">
                <div class="dropdown">
                    <button
                        class="btn btn-secondary dropdown-toggle me-2"
                        type="button"
                        id="networkBtn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {{ this.network }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="networkBtn">
                        <li><button @click="handleSetNetwork('Localhost')" class="dropdown-item" type="button">Localhost</button></li>
                        <li><button @click="handleSetNetwork('Testnet')" class="dropdown-item" type="button">Testnet</button></li>
                    </ul>
                </div>
                <div v-if="this.sender !== ''" class="dropdown">
                    <button
                        class="btn btn-primary dropdown-toggle me-2"
                        type="button"
                        id="connectWalletBtn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {{ truncate(this.sender) }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="connectWalletBtn">
                        <li v-for="item in this.accounts_algosigner" :key="item.address"><button @click="connected_account(item.address)" class="dropdown-item" type="button">{{ truncate(item.address) }}</button></li>
                        <li><button @click="handleDisconnectWallet" class="dropdown-item" type="button">Disconnect</button></li>
                    </ul>
                </div>
                <div v-else class="dropdown">
                    <button
                        class="btn btn-primary dropdown-toggle me-2"
                        type="button"
                        id="connectWalletBtn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Connect Wallet
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="connectWalletBtn">
                        <li><button @click="handleConnectMyAlgo" class="dropdown-item" type="button">MyAlgo</button></li>
                        <li><button @click="handleConnectToAlgoSigner" class="dropdown-item" type="button">AlgoSigner</button></li>
                        <li>
                            <button @click="handleConnectToWalletConnect" class="dropdown-item" type="button">WalletConnect</button>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    </nav>
</template>
<script>
export default {
    props: {
        network: String,
        sender: String,
        accounts_algosigner: Array,
    },
    data() {
        return {
            
        };
    },
    methods: {
        truncate(input) {
            if (input.length > 10) {
                return input.substring(0, 10) + "...";
            }
            return input;
        },
        handleSetNetwork(network) {
            this.$emit("setNetwork", network);
        },
        handleDisconnectWallet() {
            this.$emit("disconnectWallet");
        },
        handleConnectMyAlgo() {
            this.$emit("connectMyAlgo");
        },
        handleConnectToAlgoSigner() {
            this.$emit("connectToAlgoSigner");
        },
        handleConnectToWalletConnect() {
            this.$emit("connectToWalletConnect");
        },
        connected_account(acc){
            this.$emit("connected_account",acc);
        },
    },
};
</script>
