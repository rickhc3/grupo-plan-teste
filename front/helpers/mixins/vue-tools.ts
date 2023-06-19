import Vue from 'vue'
import * as vueTools from "lodash"
import moment from "moment"
import { QueryURI } from '../queryUri'

export default class VueTools extends Vue {
  moment = moment
  $bvToast: any
  $bvModal: any
  $refs: any
  QueryURI = new QueryURI()
  VueTools = vueTools
  Toast = {
    success: (title: string, text: string = "") => {
      this.$bvToast.toast(text, {
        title: title,
        variant: 'success',
        toaster: 'b-toaster-top-center',
        solid: true,
      })
    },
    danger: (title: string, text: string = "") => {
      this.$bvToast.toast(text, {
        title: title,
        variant: 'danger',
        toaster: 'b-toaster-top-center',
        solid: true,
      })
    }
  }

  ModalConfirm(title: string, text: string = "") {
    return new Promise((resolve, reject) => {
      this.$bvModal.msgBoxConfirm(text, {
        title: title,
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'success',
        okTitle: 'Sim',
        cancelTitle: 'Não',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then((value: any) => {
        resolve(value)
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  ModalInfo(title: string, text: string = "") {
    return new Promise((resolve, reject) => {
      this.$bvModal.msgBoxOk(text, {
        title: title,
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'success',
        okTitle: 'Ok',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then((value: any) => {
        resolve(value)
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  public toBrlNumber(value: number) {
    return value.toLocaleString('pt-BR');
  }

}
