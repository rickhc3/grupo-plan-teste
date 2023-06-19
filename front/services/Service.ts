import {AxiosAuthenticated, AxiosResponse, DataResponse, IDataResponsePaginated} from '@/config/axios'
import VueTools from "~/helpers/mixins/vue-tools"

class Service<M> extends VueTools {

  public path: string = ""

  get(id: string, params: string = ""): Promise<DataResponse<M>> {
    return new Promise((resolve, reject) => {
      AxiosAuthenticated.get<DataResponse<M>>(`/${this.path}/${id}?${params}`)
        .then((res: AxiosResponse<DataResponse<M>>) => {
          resolve(res.data)
        })
    })
  }

  list(params: string = ""): Promise<IDataResponsePaginated<Array<M>>> {
    return new Promise((resolve, reject) => {
      AxiosAuthenticated.get<IDataResponsePaginated<Array<M>>>(`/${this.path}?${params}`)
        .then((res: AxiosResponse<IDataResponsePaginated<Array<M>>>) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  create(M: M): Promise<DataResponse<M>> {
    return new Promise((resolve, reject) => {
      AxiosAuthenticated.post<DataResponse<M>>(`/${this.path}`, M)
        .then((res: AxiosResponse<DataResponse<M>>) => {
          resolve(res.data)
        }).catch((error => {
        if (error.response.status === 422) {
          const Errors = error.response.data.errors
          Object.keys(Errors).forEach(item => {
            this.Toast.danger('Erro ao salvar', Errors[item])
          })
        }
        reject(error.data)
      }))
    })
  }

  update(id: string, params: string, M: Partial<M>): Promise<DataResponse<M>> {
    return new Promise((resolve, reject) => {
      AxiosAuthenticated.post<DataResponse<M>>(`/${this.path}/${id}?${params}`, M)
        .then((res: AxiosResponse<DataResponse<M>>) => {
          resolve(res.data)
        }).catch((error => {
        if (error.response.status === 422) {
          const Errors = error.response.data.errors
          Object.keys(Errors).forEach(item => {
            this.Toast.danger('Erro ao salvar', Errors[item])
          })
        }
        reject(error.data)
      }))
    })
  }

  remove(id: string): Promise<DataResponse<M>> {
    return new Promise((resolve, reject) => {
      AxiosAuthenticated.delete<DataResponse<M>>(`/${this.path}/${id}`)
        .then((res: AxiosResponse<DataResponse<M>>) => {
          resolve(res.data)
        })
    })
  }
}

export {Service}
