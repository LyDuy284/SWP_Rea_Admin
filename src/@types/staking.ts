export interface Staking {
  id: string
  address: string
  name: string
  rewardCoin: string
  rewardCoinName: string
  stakeCoinName: string
  stakeCoin: string
  image: string
  description: string
  externalLink: string
  weeks: number
  totalReward: number
  periodFinish: number
  deposited?: number
  rewardRate?: number
  rewardsDuration?: number
  rewardPerTokenStored?: number
  startTime?: number
  paused?: boolean
  specialFees?: SpecialFee
}

export type SpecialFee = {
  stake: number
  withdraw: number
  claim: number
  addBooster: number
  removeBooster: number
}
