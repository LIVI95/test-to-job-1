<template>
  <v-app>
    <v-main>
      <v-container>
        <RouterView
          :employees="employees"
          @removeEmployee="(id: string) =>removeEmployee(id)"
          @updateEmployee="((payload: Employee) => updateEmployee(payload))"
        />
      </v-container>
      <v-btn
        @click="isOpenDialog = true"
        icon="$plus"
        class="bg-blue plus"
      ></v-btn>
      <CreateEmployeeModal
        :isOpenDialog="isOpenDialog"
        @close="isOpenDialog = false"
        @addEmployee="addEmployee"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Employee } from "@/types";
import CreateEmployeeModal from "@/components/CreateEmployeeModal.vue";

export default defineComponent({
  components: { CreateEmployeeModal },
  data() {
    return {
      isOpenDialog: false,
      employees: [] as Employee[],
    };
  },
  methods: {
    addEmployee(payload: Employee) {
      console.log(payload);

      this.employees.push(payload);
      localStorage.setItem("Employees", JSON.stringify(this.employees));
      this.isOpenDialog = false;
    },
    removeEmployee(id: string) {
      this.employees = this.employees.filter((item) => item.id !== id);
      localStorage.setItem("Employees", JSON.stringify(this.employees));
    },
    updateEmployee(payload: Employee) {
      const idx = this.employees.findIndex((item) => item.id === payload.id);
      this.employees[idx] = payload;
      console.log(this.employees);
      localStorage.setItem("Employees", JSON.stringify(this.employees));
    },
  },
  mounted() {
    const data = localStorage.getItem("Employees");
    if (data?.length) {
      this.employees = JSON.parse(data);
    }
  },
});
</script>

<style scoped>
body {
  position: relative;
}
.plus {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
