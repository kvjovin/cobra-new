<template>
  <div class="about">
    <h1>This is an about page</h1>
    <form>
      <!-- Email -->
      <div class="form-group row mb-3">
        <label for="email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="email"
            placeholder="Enter your username"
            type="email"
            v-model="v$.form.email.$model"
            autocomplete="off"
          />
        </div>

        <!-- error message -->
        <div
          class="input-errors"
          v-for="(error, index) of v$.form.email.$errors"
          :key="index"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <!-- password -->
      <div class="form-group row mb-3">
        <label for="password" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="password"
            placeholder="Enter your password"
            type="password"
            v-model="v$.form.password.$model"
          />
        </div>
        <!-- error message -->
        <div
          class="input-errors"
          v-for="(error, index) of v$.form.password.$errors"
          :key="index"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="buttons-w">
        <button
          :disabled="v$.form.$invalid"
          class="btn"
          :class="[buttonDesign()]"
          @click="submitForm"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
import { required, email, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default defineComponent({
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  validations() {
    return {
      form: {
        email: {
          required,
          email,
        },
        password: {
          required,
          min: minLength(6),
        },
      },
    };
  },
  computed: {},

  methods: {
    submitForm() {
      console.log("submitformdd");
      console.log("formval", this.form);
      if (this.v$.$invalid) {
        this.form;
      } else {
        setTimeout(() => {
          this.form;
          console.log("formvalss", this.form);
        }, 500);
      }
    },
    buttonDesign() {
      const buttonStatus = this.v$.form.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-success";
    },
  },
});
</script>
