import {
  dataToExecData,
  ExecArgBase,
  ExecDataRepresentation,
} from '../ExecArgBase'

export declare namespace ExecArgUpdateAMMVaultConfig {
  export interface Params {
    owner: string
    marketId: string
    masterAddress: string
    orderDensity: number
    priceTickSize: string
    maxInvariantSensitivity: string
    baseDecimals: number
    quoteDecimals: number
    notionalValueCap: string
  }

  export interface Data {
    owner: string
    market_id: string
    master_address: string
    order_density: number
    price_tick_size: string
    max_invariant_sensitivity: string
    base_decimals: number
    quote_decimals: number
    notional_value_cap: string
  }
}

/**
 * @category Contract Exec Arguments
 */
export default class ExecArgUpdateAMMVaultConfig extends ExecArgBase<
  ExecArgUpdateAMMVaultConfig.Params,
  ExecArgUpdateAMMVaultConfig.Data
> {
  static fromJSON(
    params: ExecArgUpdateAMMVaultConfig.Params,
  ): ExecArgUpdateAMMVaultConfig {
    return new ExecArgUpdateAMMVaultConfig(params)
  }

  toData(): ExecArgUpdateAMMVaultConfig.Data {
    const { params } = this

    return {
      owner: params.owner,
      market_id: params.marketId,
      master_address: params.masterAddress,
      order_density: params.orderDensity,
      price_tick_size: params.priceTickSize,
      max_invariant_sensitivity: params.maxInvariantSensitivity,
      base_decimals: params.baseDecimals,
      quote_decimals: params.quoteDecimals,
      notional_value_cap: params.notionalValueCap,
    }
  }

  toExecData(): ExecDataRepresentation<ExecArgUpdateAMMVaultConfig.Data> {
    return dataToExecData('update_vault_config', this.toData())
  }
}
