
export interface IResponseApi<T>{
  ok    : boolean
  data? : T
  msg?  : string
  error : string
}