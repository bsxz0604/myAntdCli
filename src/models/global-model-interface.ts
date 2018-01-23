export interface StateProps {
  quality: any
  regions: any
}

export type callBack = (musicalId: string, labelId: string, taskId: string ) => void

export interface UpdateMusicalLabelProps {
  musicalId: string
  labelId: string
  taskId: string,
  callBack: callBack
}
