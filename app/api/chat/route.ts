import { google } from '@ai-sdk/google'
import { streamText, convertToModelMessages } from 'ai'
import { z } from 'zod'

import { ethers, JsonRpcProvider, Wallet, parseUnits } from 'ethers'

// Arc Testnet Network Details
const ARC_TESTNET_CONFIG = {
  rpcUrl: 'https://rpc.testnet.arc.network',
  chainId: 5042002,
  symbol: 'USDC', 
}

const provider = new JsonRpcProvider(ARC_TESTNET_CONFIG.rpcUrl)

export async function POST(req: Request) {
  const { messages } = await req.json()

  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: google('gemini-3-flash-preview'),
    messages: modelMessages,
    system: `You are a helpful, professional customer support agent for an e-commerce store. 
You specialize in handling refunds and returns. 
Be concise and polite. 
If a user asks for a refund, use the 'selectProductToRefund' tool to show them their recent eligible products. 
Once they select a product, use the 'processRefund' tool to process the refund and show the confirmation.
Never output plain text formatting when a tool call is more appropriate. Keep conversation minimal and to the point.`,
    tools: {
      selectProductToRefund: {
        description:
          'Show a list of recent products eligible for refund for the user to select from.',
        inputSchema: z.object({
          userId: z.string().optional().describe('The user ID'),
        }),
        execute: async () => {
          return {
            products: [
              { id: 'p1', name: 'Echo Dot (5th Gen)', price: 0.5 },
              { id: 'p2', name: 'Sony WH-1000XM5 Headphones', price: 1.0 },
              { id: 'p3', name: 'MacBook Pro 14" (Silver)', price: 5.0 },
            ],
          }
        },
      },
      processRefund: {
        description:
          'Process a refund for a selected product and show confirmation.',
        inputSchema: z.object({
          productId: z.string().describe('The ID of the product to refund'),
          productName: z.string().describe('The name of the product to refund'),
          amount: z.number().describe('The total refund amount'),
          walletAddress: z
            .string()
            .describe(
              'The wallet address of the user, we are using arc testnet to do payment'
            ),
        }),
        execute: async ({ productId, productName, amount, walletAddress }) => {
          const privateKey = process.env.AGENT_PRIVATE_KEY
          const agent = new Wallet(privateKey!, provider)

          const recipientAddress = walletAddress
          const amountToSend = amount.toString()
          const parsedAmount = parseUnits(amountToSend, 18)

          console.log(`Agent ${agent.address} is initiating transfer...`)
          
          let txHash
          try {
            const balance = await provider.getBalance(agent.address)
            if (balance < parsedAmount) {
              console.error('Insufficient funds for refund')
              return {
                amount,
                method: 'Arc Testnet',
                items: [productName],
                date: new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                }),
                status: 'INSUFFICIENT_FUNDS',
                txHash: '',
              }
            }

            const tx = await agent.sendTransaction({
              to: recipientAddress,

              value: parseUnits(amountToSend, 18),
            })

            console.log(`Transaction Sent! Hash: ${tx.hash}`)
            txHash = tx.hash
            // Wait for 1 confirmation
            const receipt = await tx.wait()
            console.log(
              `Transaction confirmed in block: ${receipt?.blockNumber}`
            )
          } catch (error) {
            console.error('Transfer failed:', error)
          }

          return {
            amount,
            method: 'Arc Testnet',
            items: [productName],
            date: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            }),
            status: txHash ? 'SUCCESSFUL' : 'FAILED',
            txHash: txHash || '',
          }
        },
      },
    },
  })

  return result.toUIMessageStreamResponse()
}
