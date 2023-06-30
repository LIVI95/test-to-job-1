<template>
  <v-table>
    <thead class="bg-blue-accent-1">
      <tr>
        <th></th>
        <th
          v-for="(header, idx) in tableHeaders"
          :key="idx"
          class="text-left text-white w-25"
        >
          {{ header }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody v-if="employees?.length">
      <tr v-for="(item, idx) in employees" :key="item.id">
        <td>{{ idx + 1 }}.</td>
        <td>{{ item.last_name }}</td>
        <td>{{ item.first_name }}</td>
        <td>{{ item.middle_name }}</td>
        <td>
          <span>{{ item.rank }}</span>
        </td>
        <td class="d-flex align-center">
          <v-icon
            @click="selectEmployee(item.id)"
            style="cursor: pointer"
            icon="$close"
          ></v-icon>
          <v-icon
            @click="updateEmployeeStart(item)"
            style="cursor: pointer"
            icon="$edit"
          ></v-icon>
          <v-icon
            style="cursor: pointer"
            @click="
              $router.push({ name: 'employee_detail', params: { id: item.id } })
            "
            icon="$info"
          ></v-icon>
        </td>
      </tr>
      <v-dialog v-model="isWarning" width="300">
        <v-card>
          <v-card-text class="text-center"> Удалить запись?</v-card-text>
          <v-btn @click="removeEmployee(selectedEmployee)">Да</v-btn>
          <v-btn @click="isWarning = false">Нет</v-btn>
        </v-card>
      </v-dialog>
    </tbody>
    <tbody v-else>
      <tr>
        <p class="mt-5">Данных нет</p>
      </tr>
    </tbody>
  </v-table>
  <UpdateEmployeeModal
    v-if="isUpdateModal"
    :isUpdateModal="isUpdateModal"
    :employeeInputData="employeeForUpdate"
    @close="isUpdateModal = false"
    @updateEmployee="((payload: Employee) => updateEmployeeEnd(payload))"
  />
</template>

<script lang="ts">
import { Employee } from "@/types";
import UpdateEmployeeModal from "@/components/UpdateEmployeeModal.vue";
import { PropType, defineComponent } from "vue";

export default defineComponent({
  components: { UpdateEmployeeModal },
  props: {
    employees: {
      type: Array as PropType<Employee[]>,
      default: [],
    },
  },
  data() {
    return {
      tableHeaders: ["Фамилия", "Имя", "Отчество", "Должность"],
      isWarning: false,
      selectedEmployee: "" as string,
      employeeForUpdate: {} as Employee,
      isUpdateModal: false,
    };
  },
  methods: {
    removeEmployee(id: string) {
      this.$emit("removeEmployee", id);
      this.isWarning = false;
    },
    selectEmployee(id: string) {
      this.selectedEmployee = id;
      this.isWarning = true;
    },
    updateEmployeeStart(item: Employee) {
      this.employeeForUpdate = { ...this.employeeForUpdate, ...item };

      this.isUpdateModal = true;
    },

    updateEmployeeEnd(item: Employee) {
      this.$emit("updateEmployee", item);
      this.isUpdateModal = false;
    },
  },
});
</script>
