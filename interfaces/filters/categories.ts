export interface ICategoryItem {
  id: number
  label: string
  value: string
}

export type IGetCategoriesResponse = {
  data: ICategoryItem[]
  error: string
}
