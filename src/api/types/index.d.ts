interface IBasicRes {
  code: number,
  message: string,
  result: IBasicResult,
  success: boolean,
  timestamp: number
}

interface IBasicResult {
  current?: number,
  hitCount?: boolean,
  pages?: number | string,
  records?: any[],
  searchCount?: boolean,
  size?: number | string,
  total?: number | string
}

interface ITreeData {
  id: string,
  label: string,
  parentId: string,
  children?: ITreeData[]
}

export interface ITreeResult extends IBasicResult {
  records?: ITreeData[] | []
}


export interface ITest {
  per_page: number,
  sha: any
}
