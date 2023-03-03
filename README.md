# Vesting Application -algorand-

## Overview

Token vesting refers to a process where tokens are locked and released slowly over a period of time. If the tokens are locked, they cannot be transferred or used until they are released. This is to mitigate attempts to introduce a large supply of tokens to the market at any point in time.

Create an vesting application which involves using smart contracts to lock the tokens for a specified duration. The tokens can be retrieved progressively via your application within the vesting period.

The tokens distribution table are as follows. The vesting period is the duration which the allocated percentage of tokens will be progressively released. Cliff refers to the initial duration within the vesting period which the tokens are locked. Upon the end of the cliff, the stakeholder is able to receive a portion of the allocated stake from the subsequent month onwards.

| Stakeholder           | Percentage    | Vesting Period (months)   | Cliff (months)    | 
| --------------------- | ------------- | ------------------------- | ----------------- |
| Public				| 25		    | NA                        | NA                |
| Advisors				| 10 			| 24                        | 12                |
| Private Investors 	| 20 			| 24                        | 12                |
| Company Reserves	    | 30			| NA                        | NA                |
| Team				    | 15			| 24                        | 12                |

For example, if the advisors are allocated 1200 tokens over a vesting period of 24 months and a cliff of 12 months, the distribution will look like this,

1. Months 1 to 12 --- Advisors get 0 tokens
2. Month 13 --- Advisors get 12 * (1200 / 24) = 600 tokens
3. Month 14 --- Advisors (1200 / 24) = 50 tokens
4. Month 15 --- Advisors (1200 / 24) = 50 tokens
5. Month 16 --- Advisors (1200 / 24) = 50 tokens
6. ... etc etc

## Application Details

### Token Creation
the fungible token details:

1. Token name: VACoin
2. Unit name: VAC
3. Total supply: 100 million
4. Decimals: 0

### include 2 smart contract 
one for mint the token and the second for the vesting concept.

# Setup instructions

## 1. Install packages
```
yarn install
```

## 2. Update environement variables
1. you will need to add 2 more address in your sandbox see .env.example.
2. Copy `.env.example` to `.env`.
3. Update credentials in `.env` file.
4. then do the commande `source .env`

## 3. Algo Builder deployment commands

# Clear cache
yarn run algob clean

# Run one deployment script
yarn run algob deploy scripts/<filename>
OR 
yarn run algob deploy

# Run tests
yarn run algob test


## 4. Copy the deployed checkpoint files to src folder
```
cp artifacts/scripts/<filename>.yaml src/artifacts/
```

## 5. Run the Dapp
```
yarn serve
```

once you will connect to algosigner you will get all 4 address in dapp to navigate between account all along with the disconnect button!!!




