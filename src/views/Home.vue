<template>
  <EmployeesTable
    :employees="employees"
    @removeEmployee="(id: string) => $emit('removeEmployee', id)"
    @updateEmployee="((payload: Employee) => $emit('updateEmployee', payload))"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmployeesTable from "@/components/EmployeesTable.vue";
import { PropType } from "vue";
import { Employee } from "@/types";

export default defineComponent({
  components: { EmployeesTable },
  props: {
    employees: {
      type: Array as PropType<Employee[]>,
      default: [],
    },
  },
});
</script>
