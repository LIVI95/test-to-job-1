<template>
  <v-dialog width="1024" v-model="isOpen">
    <v-card>
      <v-form v-model="valid" @submit.prevent>
        <v-card-text>
          <v-card-title>
            Изменить сотрудника
            <v-card-subtitle>
              {{ employeeInputData?.last_name }}
              {{ employeeInputData?.first_name }}
              {{ employeeInputData?.middle_name }}
            </v-card-subtitle>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Фамилия"
                  hint="Введите фамилию сотрудника"
                  v-model.trim="employee.last_name"
                  required
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Имя"
                  hint="Введите имя сотрудника"
                  v-model.trim="employee.first_name"
                  required
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Отчество"
                  hint="Введите отчество сотрудника"
                  v-model.trim="employee.middle_name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Менеджер', 'Бухгалтер']"
                  label="Должность"
                  v-model="employee.rank"
                  required
                  :rules="requiredRules"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Полная', 'Половина']"
                  label="Ставка"
                  required
                  v-model="employee.rate"
                  :rules="requiredRules"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Оклад"
                  hint="Введите сумму оклада сотрудника"
                  v-model.trim="employee.salary"
                  required
                  :rules="salaryRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-checkbox
                  v-model="employee.isEmploymentHistory"
                  label="Трудовая книжка"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$emit('close')" color="blue-darken-1" variant="text">
            Отменить
          </v-btn>
          <v-btn
            @click="updateModal(employee)"
            color="blue-darken-1"
            variant="text"
            type="submit"
          >
            Изменить
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Employee } from "@/types";
import { PropType } from "vue";

export default defineComponent({
  data() {
    return {
      valid: false,
      employee: {
        id: this.employeeInputData?.id,
        first_name: this.employeeInputData?.first_name,
        last_name: this.employeeInputData?.last_name,
        middle_name: this.employeeInputData?.middle_name,
        rank: this.employeeInputData?.rank,
        isEmploymentHistory: this.employeeInputData?.isEmploymentHistory,
        salary: this.employeeInputData?.salary,
        rate: this.employeeInputData?.rate,
      } as Employee,
      requiredRules: [
        (value: string | null) => {
          if (value?.length) {
            const regex = /\d/g;
            if (!regex.test(value)) return true;

            return "Недопустимы цифры";
          } else {
            return "Поле обязательное";
          }
        },
      ],
      salaryRules: [
        (value: string | null) => {
          if (value?.length) {
            if (Number(value)) return true;
            return "Введите число";
          } else {
            return "Поле обязательное";
          }
        },
      ],
    };
  },
  computed: {
    isOpen() {
      return this.isUpdateModal;
    },
  },
  props: {
    isUpdateModal: {
      type: Boolean,
      default: false,
    },
    employeeInputData: {
      type: Object as PropType<Employee>,
    },
  },
  methods: {
    updateModal(employee: Employee) {
      this.$emit("updateEmployee", employee);
    },
  },
});
</script>
