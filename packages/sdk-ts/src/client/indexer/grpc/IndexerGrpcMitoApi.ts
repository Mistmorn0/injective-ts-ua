import {
  UnspecifiedErrorCode,
  GrpcUnaryRequestException,
} from '@injectivelabs/exceptions'
import { MitoApi } from '@injectivelabs/mito-proto-ts'
import { InjectiveMetaRpc } from '@injectivelabs/indexer-proto-ts'
import BaseGrpcConsumer from '../../BaseGrpcConsumer'
import { IndexerModule } from '../types'
import { IndexerGrpcMitoTransformer } from '../transformers'

/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcMitoApi extends BaseGrpcConsumer {
  protected module: string = IndexerModule.Mito

  protected client: MitoApi.MitoAPIClientImpl

  constructor(endpoint: string) {
    super(endpoint)

    this.client = new MitoApi.MitoAPIClientImpl(this.getGrpcWebImpl(endpoint))
  }

  async fetchVault({
    contractAddress,
    slug,
  }: {
    contractAddress?: string
    slug?: string
  }) {
    const request = MitoApi.GetVaultRequest.create()

    if (slug) {
      request.slug = slug
    }

    if (contractAddress) {
      request.contractAddress = contractAddress
    }

    try {
      const response = await this.retry<MitoApi.GetVaultResponse>(() =>
        this.client.GetVault(request),
      )

      return IndexerGrpcMitoTransformer.vaultResponseToVault(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'GetVault',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'GetVault',
        contextModule: this.module,
      })
    }
  }

  async fetchVaults({
    limit,
    codeId,
    pageIndex,
  }: {
    limit?: number
    codeId?: string
    pageIndex?: number
  }) {
    const request = MitoApi.GetVaultsRequest.create()

    if (limit) {
      request.limit = limit
    }

    if (pageIndex) {
      request.pageIndex = pageIndex
    }

    if (codeId) {
      request.codeId = codeId
    }

    try {
      const response = await this.retry<MitoApi.GetVaultsResponse>(() =>
        this.client.GetVaults(request),
      )

      return IndexerGrpcMitoTransformer.vaultsResponseToVaults(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'GetVaults',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'GetVaults',
        contextModule: this.module,
      })
    }
  }

  async fetchLpTokenPriceChart({
    to,
    from,
    vaultAddress,
  }: {
    to?: string
    from?: string
    vaultAddress: string
  }) {
    const request = MitoApi.LPTokenPriceChartRequest.create()

    request.vaultAddress = vaultAddress

    if (from) {
      request.fromTime = from
    }

    if (to) {
      request.toTime = to
    }

    try {
      const response = await this.retry<MitoApi.LPTokenPriceChartResponse>(() =>
        this.client.LPTokenPriceChart(request),
      )

      return IndexerGrpcMitoTransformer.lpTokenPriceChartResponseToLPTokenPriceChart(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'LPTokenPriceChart',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'LPTokenPriceChart',
        contextModule: this.module,
      })
    }
  }

  async fetchTVLChartRequest({
    to,
    from,
    vaultAddress,
  }: {
    to?: string
    from?: string
    vaultAddress: string
  }) {
    const request = MitoApi.TVLChartRequest.create()

    request.vaultAddress = vaultAddress

    if (to) {
      request.toTime = to
    }

    if (from) {
      request.fromTime = from
    }

    try {
      const response = await this.retry<MitoApi.TVLChartResponse>(() =>
        this.client.TVLChart(request),
      )

      return IndexerGrpcMitoTransformer.lpTokenPriceChartResponseToLPTokenPriceChart(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'TVLChart',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'TVLChart',
        contextModule: this.module,
      })
    }
  }

  async fetchVaultsByHolderAddress({
    limit,
    pageIndex,
    holderAddress,
    vaultAddress,
  }: {
    limit?: number
    pageIndex?: number
    holderAddress: string
    vaultAddress?: string
  }) {
    const request = MitoApi.VaultsByHolderAddressRequest.create()

    request.holderAddress = holderAddress

    if (vaultAddress) {
      request.vaultAddress = vaultAddress
    }

    if (limit) {
      request.limit = limit
    }

    if (pageIndex) {
      request.pageIndex = pageIndex
    }

    try {
      const response = await this.retry<MitoApi.VaultsByHolderAddressResponse>(
        () => this.client.VaultsByHolderAddress(request),
      )

      return IndexerGrpcMitoTransformer.vaultsByHolderAddressResponseToVaultsByHolderAddress(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'VaultsByHolderAddress',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'VaultsByHolderAddress',
        contextModule: this.module,
      })
    }
  }

  async fetchLPHolders({
    limit,
    pageIndex,
    vaultAddress,
  }: {
    limit?: number
    pageIndex?: number
    vaultAddress: string
  }) {
    const request = MitoApi.LPHoldersRequest.create()

    request.vaultAddress = vaultAddress

    if (limit) {
      request.limit = limit
    }

    if (pageIndex) {
      request.pageIndex = pageIndex
    }

    try {
      const response = await this.retry<MitoApi.LPHoldersResponse>(() =>
        this.client.LPHolders(request),
      )

      return IndexerGrpcMitoTransformer.lpHoldersResponseToLPHolders(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'LPHolders',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'LPHolders',
        contextModule: this.module,
      })
    }
  }

  async fetchHolderPortfolio(holderAddress: string) {
    const request = MitoApi.PortfolioRequest.create()

    request.holderAddress = holderAddress

    try {
      const response = await this.retry<MitoApi.PortfolioResponse>(() =>
        this.client.Portfolio(request),
      )

      return IndexerGrpcMitoTransformer.portfolioResponseToPortfolio(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'Portfolio',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'Portfolio',
        contextModule: this.module,
      })
    }
  }

  async fetchLeaderboard(epochId?: number) {
    const request = MitoApi.LeaderboardRequest.create()

    if (epochId) {
      request.epochId = epochId
    }

    try {
      const response = await this.retry<MitoApi.LeaderboardResponse>(() =>
        this.client.Leaderboard(request),
      )

      return IndexerGrpcMitoTransformer.leaderboardResponseToLeaderboard(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'Leaderboard',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'Leaderboard',
        contextModule: this.module,
      })
    }
  }

  async fetchTransferHistory({
    vault,
    account,
    limit,
    toNumber,
    fromNumber,
  }: {
    vault?: string
    account?: string
    limit?: number
    toNumber?: number
    fromNumber?: number
  }) {
    const request = MitoApi.TransfersHistoryRequest.create()

    if (vault) {
      request.vault = vault
    }

    if (account) {
      request.account = account
    }

    if (limit) {
      request.limit = limit
    }

    if (toNumber) {
      request.toNumber = toNumber
    }

    if (fromNumber) {
      request.fromNumber = fromNumber
    }

    try {
      const response = await this.retry<MitoApi.TransfersHistoryResponse>(() =>
        this.client.TransfersHistory(request),
      )

      return IndexerGrpcMitoTransformer.transferHistoryResponseToTransfer(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'TransfersHistory',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'TransfersHistory',
        contextModule: this.module,
      })
    }
  }

  async fetchLeaderboardEpochs({
    limit,
    toEpochId,
    fromEpochId,
  }: {
    limit?: number
    toEpochId?: number
    fromEpochId?: number
  }) {
    const request = MitoApi.LeaderboardEpochsRequest.create()

    if (limit) {
      request.limit = limit
    }

    if (toEpochId) {
      request.toEpochId = toEpochId
    }

    if (fromEpochId) {
      request.fromEpochId = fromEpochId
    }

    try {
      const response = await this.retry<MitoApi.LeaderboardEpochsResponse>(() =>
        this.client.LeaderboardEpochs(request),
      )

      return IndexerGrpcMitoTransformer.leaderboardEpochsResponseToLeaderboardEpochs(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'LeaderboardEpochs',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'LeaderboardEpochs',
        contextModule: this.module,
      })
    }
  }

  async fetchStakingPools(staker?: string) {
    const request = MitoApi.GetStakingPoolsRequest.create()

    if (staker) {
      request.staker = staker
    }

    try {
      const response = await this.retry<MitoApi.GetStakingPoolsResponse>(() =>
        this.client.GetStakingPools(request),
      )

      return IndexerGrpcMitoTransformer.stakingPoolsResponseToStakingPools(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'GetStakingPools',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'GetStakingPools',
        contextModule: this.module,
      })
    }
  }

  async fetchStakingHistory({
    staker,
    toNumber,
    limit,
    fromNumber,
  }: {
    staker?: string
    limit?: number
    toNumber?: number
    fromNumber?: number
  } = {}) {
    const request = MitoApi.StakingHistoryRequest.create()

    if (limit) {
      request.limit = limit
    }

    if (staker) {
      request.staker = staker
    }

    if (toNumber) {
      request.toNumber = toNumber
    }

    if (fromNumber) {
      request.fromNumber = fromNumber
    }

    try {
      const response = await this.retry<MitoApi.StakingHistoryResponse>(() =>
        this.client.StakingHistory(request),
      )

      return IndexerGrpcMitoTransformer.mitoStakingHistoryResponseTpStakingHistory(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'StakingHistory',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'StakingHistory',
        contextModule: this.module,
      })
    }
  }

  async fetchStakingRewardsByAccount({ staker }: { staker: string }) {
    const request = MitoApi.StakingRewardByAccountRequest.create()

    request.staker = staker

    try {
      const response = await this.retry<MitoApi.StakingRewardByAccountResponse>(
        () => this.client.StakingRewardByAccount(request),
      )

      return IndexerGrpcMitoTransformer.stakingRewardByAccountResponseToStakingRewardByAccount(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveMetaRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          context: 'StakingHistory',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'StakingHistory',
        contextModule: this.module,
      })
    }
  }
}
