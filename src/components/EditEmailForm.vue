<template>
  <div>
    <h3 class="heading-title">Enter Email</h3>
    <form>
      <div class="form-group mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          v-model="email"
          @input="v$.email.$touch()"
          id="email"
          class="form-control"
          :class="v$.email.$error ? 'is-invalid' : 'input-text'"
        />
        <div v-if="v$.email.$error">
          <div
            class="input-errors"
            v-for="(error, index) of v$.email.$errors"
            :key="index"
          >
            <span
              :class="{ 'is-invalid': v$.email.$error }"
              v-if="
                error.$validator == 'required' || error.$validator == 'email'
              "
              >Plase enter a valid email address<span class="error-icon"></span
            ></span>
          </div>
        </div>
      </div>
      <div class="form-group mt-4">
        <button
          type="button"
          :disabled="v$.email.$invalid"
          class="btn w-100"
          :class="[buttonDesign()]"
          @click="submitEmail"
        >
          SEND CODE
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
    };
  },
  validations() {
    return {
      email: { required, email },
    };
  },
  methods: {
    buttonDesign() {
      const buttonStatus = this.v$.email.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-primary";
    },
    async submitEmail(): Promise<void> {
      this.v$.$touch();
      this.$emit("otpValidateForm", this.email);
    },
  },
});
</script>
