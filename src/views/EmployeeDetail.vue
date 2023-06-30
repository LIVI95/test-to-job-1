<template>
  <v-btn class="bg-blue" @click="$router.push({ name: 'home' })">Назад</v-btn>

  <div class="d-flex justify-center pt-10">
    <v-card width="800" elevation="12">
      <v-card-title>Карточка сотрудника</v-card-title>
      <v-row class="align-center">
        <v-col><v-card-subtitle> Фамилия </v-card-subtitle></v-col>
        <v-col>
          <v-card-text>{{ employee?.last_name }}</v-card-text></v-col
        >
      </v-row>
      <v-divider></v-divider>

      <v-row class="align-center">
        <v-col><v-card-subtitle> Имя </v-card-subtitle></v-col>
        <v-col>
          <v-card-text>{{ employee?.first_name }}</v-card-text></v-col
        >
      </v-row>
      <v-divider></v-divider>

      <v-row class="align-center">
        <v-col><v-card-subtitle>Отчество</v-card-subtitle></v-col>
        <v-col>
          <v-card-text>{{ employee?.middle_name }}</v-card-text></v-col
        >
      </v-row>
      <v-divider></v-divider>

      <v-row class="align-center">
        <v-col>
          <v-card-subtitle> Должность </v-card-subtitle>
        </v-col>
        <v-col>
          <v-card-text>{{ employee?.rank }}</v-card-text>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-row class="align-center">
        <v-col><v-card-subtitle> Ставка </v-card-subtitle></v-col>
        <v-col>
          <v-card-text>{{ employee?.rate }}</v-card-text></v-col
        >
      </v-row>
      <v-divider></v-divider>

      <v-row class="align-center">
        <v-col><v-card-subtitle> Оклад </v-card-subtitle></v-col>
        <v-col>
          <v-card-text>{{ employee?.salary }} руб.</v-card-text></v-col
        >
      </v-row>
      <v-divider></v-divider>

      <v-row class="align-center">
        <v-col><v-card-subtitle> Трудовая книжка </v-card-subtitle></v-col>
        <v-col
          ><v-card-text>{{
            employee?.isEmploymentHistory ? "Есть" : "Нет"
          }}</v-card-text></v-col
        >
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Employee } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      employee: null as Employee | null,
    };
  },
  mounted() {
    const store: null | string = localStorage.getItem("Employees");
    if (store) {
      const data = JSON.parse(store);
      this.employee = data.find(
        (item: Employee) => item.id === this.$route.params.id
      );
    }
  },
});
</script>
