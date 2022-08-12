export interface IEmpanadaItem {
  id: number
  name: string
  label: string
  image: string
  types: string[]
  price_in_dollars: number
  number_of_orders: number
}

export interface IEmpanadasResponse {
  data: IEmpanadaItem[]
  error: string
}
