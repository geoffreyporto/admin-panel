import { unCamelCase } from '../../../utils/un-camel-case'
import moment from 'moment'
import { KYC_REQUEST_STATES } from '@/constants'

export function filterAccountType (accountType) {
  const newStr = unCamelCase(accountType)
  return newStr.replace(/Account Type /g, '')
}

export function filterDateWithTime (date, format = 'DD MMM YYYY [at] hh:mm:ss') {
  try {
    return moment(date).format(format)
  } catch (error) {
    return date
  }
}

export function localizeIssuanceRequestState (type) {
  return KYC_REQUEST_STATES[type].label
}

export function cropAddress (value) {
  return `${value.slice(0, 4)}…${value.slice(-4)}`
}
