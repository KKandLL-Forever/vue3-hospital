<template>
  <a-space class="wrap" direction="vertical" size="middle">
    <a-form
      :model="formState"
      autocomplete="off"
      layout="inline"
      name="horizontal_login"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        :rules="[{ required: true, message: 'Please input your username!' }]"
        label="工号"
        name="jobNo"
      >
        <a-input v-model:value="formState.jobNo">
          <template #prefix>
            <UserOutlined class="site-form-item-icon"/>
          </template>
        </a-input>
      </a-form-item>
      
      <a-form-item
        :rules="[{ required: true, message: 'Please input your password!' }]"
        label="姓名"
        name="name"
      >
        <a-input v-model:value="formState.name">
          <template #prefix>
            <UserOutlined class="site-form-item-icon"/>
          </template>
        </a-input>
      </a-form-item>
      
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="handleSearch">查询</a-button>
          <a-button type="primary" @click="reset">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :pagination="pagination"
      :row-key="record => record.login.uuid"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
        <template v-else-if="column.dataIndex === 'actions'">
          <div>123</div>
        </template>
      </template>
    
    </a-table>
  </a-space>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {UserOutlined} from '@ant-design/icons-vue';
import type {TableProps} from 'ant-design-vue';
import {usePagination} from 'vue-request';
import axios from 'axios';

interface FormState {
  jobNo: string;
  name: string;
}

type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};
type APIResult = {
  results: {
    gender: 'female' | 'male';
    name: string;
    email: string;
  }[];
};

//form
const formState = ref<FormState>({
  jobNo: '',
  name: '',
});

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const handleSearch = () => {
  console.log('search');
};

const reset = () => {
  console.log('reset');
};


//table
const columns = [
  {
    title: '工号',
    sorter: true,
    dataIndex: 'hisEmpCode',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '15%',
  },
  {
    title: '科室',
    dataIndex: 'hisDeptName',
  },
  {
    title: '职位',
    dataIndex: 'position',
  },
  {
    title: '职级',
    dataIndex: 'jobLevel'
  },
  {
    title: '状态',
    dataIndex: 'filterAuth',
  },
  {
    title: '操作',
    dataIndex: 'actions',
  }
];
const queryData = (params: APIParams) => {
  return axios.get<APIResult>('https://randomuser.me/api?noinfo', {params});
};



const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
} = usePagination(queryData, {
  formatResult: res => res.data.results,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
});
// const queryData2 = (params?: APIParams) => {
//   return axios.get<APIResult>('https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=', {params});
// };
// const {
//   data: dataSource,
//   run,
//   loading,
//   current,
//   pageSize,
// } = usePagination(queryData2, {
//   formatResult: res => res.data.results,
//   pagination: {
//     currentKey: 'page',
//     pageSizeKey: 'results',
//   },
// });
const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}));


const handleTableChange: TableProps['onChange'] = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any,
) => {
  run({
    results: pag.pageSize!,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};

</script>

<style lang="less" scoped>
//.form-btn {
//  margin-left: 8px;
//}

.wrap {
  width: 100%;
}
</style>
