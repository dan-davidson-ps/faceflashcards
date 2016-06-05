import {Room} from '../room'

interface SiteBase {
  downloadLink?: string
}

export class Site implements SiteBase {
  id:string
  name:string
  image:string
  rooms:Room[]
}
