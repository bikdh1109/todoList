<script setup>
import { computed } from 'vue';

const props = defineProps({
  activeTodoCount: Number,
  completedTodoCount: Number,
});

const emit = defineEmits(['clear-completed']);

const progressPercentage = computed(() => {
  const total = props.activeTodoCount + props.completedTodoCount;
  return total > 0 ? Math.round((props.completedTodoCount / total) * 100) : 0;
});
</script>

<template>
  <div class="todo-summary">
    <p>
      <span>미완료항목</span><span>{{ activeTodoCount }}</span>
    </p>
    <p>
      <span>완료항목</span><span>{{ completedTodoCount }}</span>
    </p>
    <button @click="emit('clear-completed')">완료된 항목 삭제</button>
  </div>
  <hr />
  <div class="progress-contain">
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
    </div>
    <p class="progress-percent">목표 달성률 {{ progressPercentage }} %</p>
  </div>
</template>

<style scoped>
.todo-summary {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-m);
}
.todo-summary p {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: var(--space-s);
}
.todo-summary p:nth-of-type(1) span:nth-of-type(1) {
  color: var(--blue-dark);
}
.todo-summary span:nth-of-type(2) {
  background-color: var(--gray300);
  padding: var(--space-s);
  border-radius: var(--space-s);
  font-weight: 900;
}
.todo-summary button {
  background-color: var(--blue-dark);
}

.progress-contain {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 10px 10px;
  gap: 1rem;
}
.progress-bar {
  width: 100%;
  height: 10px;
  background: lightgray;
  border-radius: 5px;
  overflow: hidden;
}
.progress {
  height: 100%;
  width: 0%;
  background: lightgreen;
}
</style>
