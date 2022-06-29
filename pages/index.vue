<template>
  <div class="indexPage">
    <ElButton type="danger" @click="handleCount">add count, {{ currentCount }}</ElButton>
    <ElButton type="danger" @click="handleNumber">add number, {{ currentNumber }}</ElButton>
  </div>
</template>

<script setup>
import { ElButton } from 'element-plus';
import useUser from '~/stores/user';

useHead({
  title: 'index page',
  meta: [{
    name: 'description',
    content: 'description content',
  }]
})

const currentCount = useCount();

const store = useUser();
const currentNumber = computed(() => {
  return store.number;
})
// composable
function handleCount() {
  currentCount.value++;
}
// store
function handleNumber() {
  store.addNumber();
}



</script>

<style lang="less" scoped>
.indexPage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
</style>