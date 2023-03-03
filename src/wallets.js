import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import MyAlgoConnect from "@randlabs/myalgo-connect";

// Contains a list of methods to send transactions via different wallet connectors

const sendAlgoSignerTransaction = async (txns, algodClient) => {
    const AlgoSigner = window.AlgoSigner;

    if (typeof AlgoSigner !== "undefined") {
        try {
            const binaryTxs = txns.map(txn => {return txn.toByte()});
            let base64Txs = binaryTxs.map((binary) => AlgoSigner.encoding.msgpackToBase64(binary));

            const tabTxns = base64Txs.map(txn => {return {txn: txn}});
            let signedTxs = await AlgoSigner.signTxn(tabTxns);
            
            let binarySignedTxs = signedTxs.map((tx) => AlgoSigner.encoding.base64ToMsgpack(
                tx.blob
            ));

            let txnsId = txns.map(txn => {return txn.txID().toString()});

            const response = await algodClient
                .sendRawTransaction(binarySignedTxs)
                .do();

            const confirmedTxn = await algosdk.waitForConfirmation(algodClient,txnsId,4);
            console.log(response);
            console.log(confirmedTxn);

            return response;
        } catch (err) {
            alert(err);
            console.error(err);
        }
    }
};


const sendWalletConnectTransaction = async (connector, txn, algodClient) => {
    try {
        // Sign transaction
        // txns is an array of algosdk.Transaction like below
        // i.e txns = [txn, ...someotherTxns], but we've only built one transaction in our case
        const txns = [txn];
        const txnsToSign = txns.map((txn) => {
            const encodedTxn = Buffer.from(
                algosdk.encodeUnsignedTransaction(txn)
            ).toString("base64");

            return {
                txn: encodedTxn,
                message: "Description of transaction being signed",
                // Note: if the transaction does not need to be signed (because it's part of an atomic group
                // that will be signed by another party), specify an empty singers array like so:
                // signers: [],
            };
        });

        const requestParams = [txnsToSign];

        const request = formatJsonRpcRequest("algo_signTxn", requestParams);
        const result = await connector.sendCustomRequest(request);
        const decodedResult = result.map((element) => {
            return element
                ? new Uint8Array(Buffer.from(element, "base64"))
                : null;
        });

        let txnsId = txns.map(txn => {return txn.txID().toString()});

        const response = await algodClient
            .sendRawTransaction(decodedResult)
            .do();

        const confirmedTxn = await algosdk.waitForConfirmation(algodClient,txnsId,4);
        console.log(response);
        console.log(confirmedTxn);

        return response;
    } catch (err) {
        alert(err);
        console.error(err);
    }
};

const sendMyAlgoTransaction = async (txn, algodClient) => {
    try {
        const myAlgoWallet = new MyAlgoConnect();

        const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());

        let txnsId = txn.txID().toString();

        const response = await algodClient
            .sendRawTransaction(signedTxn.blob)
            .do();
            const confirmedTxn = await algosdk.waitForConfirmation(algodClient,txnsId,4);
            console.log(response);
            console.log(confirmedTxn);

        return response;
    } catch (err) {
        alert(err);
        console.error(err);
    }
};

export default {
    sendWalletConnectTransaction,
    sendMyAlgoTransaction,
    sendAlgoSignerTransaction,
};
