<template>
  <div class="page-box">
    动态参数: {{ $route.params.id }}
    <ElButton type="primary" @click="handleLang">i am {{ $t('ssr.title') }}</ElButton>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ElButton } from 'element-plus';

const { t, locale } = useI18n();

function handleLang() {
  locale.value = locale.value === 'id' ? 'en' : 'id';
}
</script>

<style lang="less" scoped>
.page-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
}
</style>