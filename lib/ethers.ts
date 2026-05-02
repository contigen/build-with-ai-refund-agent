import { ethers, JsonRpcProvider, Wallet, parseUnits } from 'ethers'

// Arc Testnet Network Details
const ARC_TESTNET_CONFIG = {
  rpcUrl: 'https://rpc.testnet.arc.network',
  chainId: 5042002,
  symbol: 'USDC', // Native gas on Arc
}

async function main() {
  // 1. Create a Provider to connect to Arc Testnet
  const provider = new JsonRpcProvider(ARC_TESTNET_CONFIG.rpcUrl)

  // 2. CREATE A NEW WALLET (For a new Agent)
  // In a real agent, you would save the privateKey securely (e.g., Environment Variables)
  const newAgentWallet = Wallet.createRandom()

  console.log('--- New Agent Wallet Created ---')
  console.log(`Address: ${newAgentWallet.address}`)
  console.log(`Private Key: ${newAgentWallet.privateKey}`) // Keep this secret!
  console.log('-------------------------------\n')

  // 3. SEND FUNDS (Logic for the AI Agent)
  // Replace with a private key that has Testnet USDC for gas
  const privateKey = process.env.AGENT_PRIVATE_KEY!
  const agent = new Wallet(privateKey, provider)

  const recipientAddress = '0x...' // Target address
  const amountToSend = '1.0' // Sending 1.0 USDC

  console.log(`Agent ${agent.address} is initiating transfer...`)

  try {
    const tx = await agent.sendTransaction({
      to: recipientAddress,

      value: parseUnits(amountToSend, 18),
    })

    console.log(`Transaction Sent! Hash: ${tx.hash}`)

    // Wait for 1 confirmation
    const receipt = await tx.wait()
    console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`)
  } catch (error) {
    console.error('Transfer failed:', error)
  }
}

main()
