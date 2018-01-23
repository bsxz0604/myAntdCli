export interface UserProps {
  userId: string,
  insertTime: string,
  icon: string,
  nickName: string,
  handle: string,
  featured: boolean,
  description: string,
  regionTitle: string,
  fansNum: number,
  labels?: string[]
  securityEmail?: string
  phone?: string
  privateAccount?: string
  id?: string
  totalScore?: string
  userLevels: any
  parse: ( arr: any, rowNum: number ) => any
  cancelItem?: (id: string) => void
}
