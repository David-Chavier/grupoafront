<template>
  <BoxComponent title="Consulta de Alunos">

        <div style="margin-bottom: 40px;">
          <input type="text" id="name" name="name">
          <button @click="goToStudentRegistration" style="margin-right: 20px;">Pesquisar</button>
          <!-- Navegação para a página de cadastro de alunos -->
          <button @click="goToStudentRegistration">Cadastrar alunos</button>
        </div>


        <div style="border-top: 2px solid #000000;">
          <ul style="display: grid; grid-template-columns: repeat(4, 1fr); margin: 0px; padding: 10px; background-color: #CCCCCC;">
            <li>Registro Acadêmico</li>
            <li>Nome</li>
            <li>CPF</li>
            <li>Ações</li>
          </ul>

          <div v-for="(student, index) in students" :key="index">
            <ul
              :style="{
                display: 'grid',
                'grid-template-columns': 'repeat(4, 1fr)',
                margin: '0px',
                padding: '10px',
                backgroundColor: index % 2 === 0 ? '#ECECEC' : '#FFFFFF'
              }"
            >
              <li>
                {{ student.ra }}
              </li>
              <li>
                {{ student.name }}
              </li>
              <li>
                {{ student.cpf }}
              </li>
              <li>
                <button>Editar</button>
                <button>Excluir</button>
              </li>
            </ul>
          </div>
        </div>
      </BoxComponent>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import BoxComponent from "@/components/BoxComponent.vue"; // Importa o BoxComponent

export default defineComponent({
  components: {
    BoxComponent,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const router = useRouter();

    // Função para navegação ao clicar no botão "Cadastrar alunos"
    const goToStudentRegistration = () => {
      router.push({ name: "studentRegistration" }); // Supondo que o nome da rota de cadastro seja "cadastro"
    };

    return {
      goToStudentRegistration,
    };
  },
  data() {
    return {
      // Simulação de uma lista de alunos cadastrados
      students: [
        { name: "John Doe", ra: "12345", cpf: "john@example.com" },
        { name: "Jane Smith", ra: "67890", cpf: "jane@example.com" },
        { name: "Alice Johnson", ra: "11223", cpf: "alice@example.com" },
      ],
    };
  },
});
</script>

<style scoped>
h3 {
  margin: 40px 0 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
</style>
