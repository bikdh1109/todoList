<script setup>
import { ref } from 'vue';

const filter = ref('all');
const emit = defineEmits(['filter-changed']);

const setFilter = (f) => {
  filter.value = f;
  emit('filter-changed', { filter: f });
};
</script>

<template>
  <div class="filter-container">
    <button @click="setFilter('all')" :class="{ active: filter == 'all' }">
      전체
    </button>
    <button
      @click="setFilter('active')"
      :class="{ active: filter == 'active' }"
    >
      미완료
    </button>
    <button
      @click="setFilter('completed')"
      :class="{ active: filter == 'completed' }"
    >
      완료
    </button>
  </div>
</template>

<style scoped>
/*필터 탭 filter-container */
.filter-container {
  display: flex;
  gap: var(--space-m);
}
</style>
