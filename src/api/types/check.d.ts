import {IBasicRes} from "@/api/types/index";

interface IGetCheckRecords {
  hisEmpCode: string,
  hisEmpName: string,
  hisDeptName: string,
  hisDeptCode: string,
  position: string,
  jobLevel: string,
  filterAuth: number | string,
  filterAttendance: number | string
}


export interface IGetCheckParams {
  order?: string,
  pageNumber?: string | number,
  sort?: string,
  deptCode?: string
  jobNo?: string,
  name?: string
}


