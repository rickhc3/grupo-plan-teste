import axios, { AxiosResponse } from 'axios'

console.log('BASE_URL', process.env.BASE_URL)

const AxiosDefault = axios.create({
  headers: {
    Accept: 'application/json'
  }
})

let AxiosAuthenticated = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Accept: 'application/json'
  }
})

AxiosAuthenticated.interceptors.request.use(config => {
  const token = getTokenFromLocalStorage()
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

AxiosAuthenticated.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      console.log('401')
      window.location.href = "/"
    }
    return Promise.reject(error)
  }
)

function getTokenFromLocalStorage() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('auth._token.laravelSanctum')
  }
  return null
}

interface IQueryParams {
  filter: string,
  sorting: string,
  include: string
}

interface IDataResponsePaginated<D> {
  data: D
  current_page: number
  per_page: number
  total: number
}

interface DataResponseSuccess<D> {
  data: D
  message: string
  status: number
}

interface DataResponse<D> {
  data: D
  message: string
  status: number
}

interface DataResponseError<E> {
  response: {
    data: {
      message: string,
      errors: E
    }
  }
}

export {
  AxiosDefault,
  AxiosAuthenticated,
  AxiosResponse,
  IQueryParams,
  IDataResponsePaginated,
  DataResponseSuccess,
  DataResponse,
  DataResponseError
}
