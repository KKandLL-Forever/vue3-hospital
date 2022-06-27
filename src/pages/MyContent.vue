<script lang="ts" setup>
import TableArea from './TableArea.vue';
import {onMounted, ref, watch} from 'vue';
import type {Ref} from 'vue';
import type {TreeProps} from 'ant-design-vue';
import type {ITreeResult} from "@/api/types";
import {useRequest} from 'vue-request';
import {getData, getTreeData} from "@/api/Page";
// import request from "axios";

const activeKey: Ref<string> = ref('1');

const gitData: Ref = ref(null)

const treeData = ref<ITreeResult>({})

onMounted(() => {
  getTreeData().then(res => {
    treeData.value = res.result
    console.log(treeData, 'res')
  })
  console.log(genData, 'gg')
  // getCheckData().then(res => {
  //   console.log(res,'res')
  // })
  // getData({per_page: 3, sha: ''}).then(res => {
  //   // console.log(res,'res')
  //   gitData.value = res
  // })
})

// const queryData = () => {
//   return axios.get('https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=');
// };
// const {data} = useRequest(queryData, {});

const x = 3;
const y = 2;
const z = 1;
const genData: TreeProps['treeData'] = [];

const generateData = (_level: number, _preKey?: string, _tns?: TreeProps['treeData']) => {
  const preKey = _preKey || '0';
  const tns = _tns || genData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({title: key, key});
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList: TreeProps['treeData'] = [];
const generateList = (data: TreeProps['treeData']) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({key, title: key});
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(genData);

const getParentKey = (
  key: string | number,
  tree: TreeProps['treeData'],
): string | number | undefined => {
  let parentKey;
  if (!tree) return
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const expandedKeys = ref<(string | number)[]>([]);
const searchValue = ref<string>('');
const autoExpandParent = ref<boolean>(true);
const gData = ref<TreeProps['treeData']>(genData);

const onExpand = (keys: string[]) => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};

watch(searchValue, value => {
  const expanded = dataList
    .map((item: TreeProps['treeData'][number]) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData.value);
      }
      return null;
    })
    .filter((item, i, self) => item && self.indexOf(item) === i);
  expandedKeys.value = expanded;
  searchValue.value = value;
  autoExpandParent.value = true;
});

</script>
<template>
  <a-row class="wrap" gutter="16" justify="start">
    <a-col :span="4">
      <a-input-search v-model:value="searchValue" placeholder="Search" style="margin-bottom: 8px"/>
      <a-tree
        :expanded-keys="expandedKeys"
        :fieldNames="{children:'children', title:'label', key:'id' }"
        :auto-expand-parent="autoExpandParent"
        @expand="onExpand"
        :tree-data="gData"
      >
        <template #title="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
          <span v-else>{{ title }}</span>
        </template>
      </a-tree>
    </a-col>
    <a-col flex="1">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="Tab 1">
          <TableArea></TableArea>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2">
          <TableArea></TableArea>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
  <div>{{ gitData }}</div>
</template>


<style lang="less" scoped>
.wrap {
  width: 100%;
  //display: flex;
  //justify-content: flex-start;
}

.ant-tabs {
  width: 100%;
}

:deep(.ant-tree-list) {
  max-height: 50vh;
  overflow: hidden auto;
}

</style>
