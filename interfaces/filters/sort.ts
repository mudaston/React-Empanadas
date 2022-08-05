export interface IFilterItem {
  id: number
  label: string
  value: string
}

export interface IGetFiltersResponse {
  data: IFilterItem[]
  error: string
}
