import ChartStore from './ChartStore'
import QueryParamsStore from './QueryParamsStore'

export default class RootStore {
  readonly query = new QueryParamsStore()
  readonly chart = new ChartStore()
}
