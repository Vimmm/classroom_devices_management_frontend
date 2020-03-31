export const formatterDate = timeStamp => timeStamp
  ? (new Date(timeStamp)).toLocaleDateString()
  : '-'

export default {
  formatterDate: formatterDate
}
