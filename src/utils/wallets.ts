import { UnifiedWallet } from '@/redux/types/billing'

/** User-owned LiteLLM keys run background jobs on the DARE default until a model is chosen. */
export const needsBackgroundModel = (wallet: UnifiedWallet): boolean =>
  wallet.type === 'LITELLM' &&
  wallet.source === 'USER' &&
  !wallet.backgroundModel

const walletBalanceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 6,
})

/** Keep the API's six-decimal wallet precision visible for small usage charges. */
export const formatWalletBalance = (balance: string): string =>
  walletBalanceFormatter.format(Number(balance))
