<template>
  <div class="about">
    <h1 class="heading-title">Get Started</h1>
    <form>
      <div class="form-group mb-3">
        <label for="registrationCode" class="form-label"
          >Registratin Code
          <ToolTip
            tooltipText="This field is required if you are registered in COBRA health insurance."
        /></label>
        <input
          type="text"
          v-model="user.registrationCode"
          @input="v$.user.registrationCode.$touch()"
          id="registrationCode"
          class="form-control type-number"
          :class="v$.user.registrationCode.$error ? 'is-invalid' : 'input-text'"
        />
        <div class="input-errors" v-if="v$.user.registrationCode.$error">
          <span
            :class="{ 'is-invalid': v$.user.registrationCode.$error }"
            v-if="v$.user.registrationCode.required"
          >
            Please enter a valid registration code
            <span class="error-icon"></span
          ></span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="ssn" class="form-label">SSN</label>
        <input
          type="text"
          v-model="user.ssn"
          @input="v$.user.ssn.$touch()"
          v-maska
          data-maska="###-##-####"
          id="ssn"
          class="form-control type-number"
          :class="v$.user.ssn.$error ? 'is-invalid' : 'input-text'"
        />
        <div class="input-errors" v-if="v$.user.ssn.$error">
          <span
            :class="{ 'is-invalid': v$.user.ssn.$error }"
            v-if="v$.user.ssn.required"
          >
            Please enter a valid SSN <span class="error-icon"></span
          ></span>
        </div>
      </div>
      <div class="google-recaptcha">
        <vue-recaptcha
          class="w-100"
          size="normal"
          v-show="showRecaptcha"
          sitekey="6LeNMh4nAAAAAJ0pj8ld0HhkxZCLrTvdn9951Ie8"
          theme="light"
          :loading-timeout="loadingTimeout"
          @verify="recaptchaVerified"
          @expire="recaptchaExpired"
          @fail="recaptchaFailed"
          @error="recaptchaError"
          ref="vueRecaptcha"
        >
        </vue-recaptcha>
      </div>
      <div class="form-group mt-4">
        <button
          :disabled="v$.user.$invalid"
          class="btn w-100"
          type="button"
          :class="[buttonDesign()]"
          @click="userDataSubmit"
        >
          CONTINUE
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import { defineComponent, ref } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import ToolTip from "./common/ToolTip.vue";
import vueRecaptcha from "vue3-recaptcha2";
import validateSsn from "@/utils/validations/validateSsn";
import { vMaska } from "maska";

export default defineComponent({
  components: {
    ToolTip,
    vueRecaptcha,
  },
  directives: { maska: vMaska },
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {
        registrationCode: "",
        ssn: "",
        gRecaptcha: "",
      },
      submitted: false,
      showRecaptcha: true,
      loadingTimeout: 30000,
    };
  },

  validations() {
    return {
      user: {
        registrationCode: { required },
        ssn: { required, validateSsn },
        gRecaptcha: { required },
      },
    };
  },
  methods: {
    buttonDesign() {
      const buttonStatus = this.v$.user.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-primary";
    },
    async userDataSubmit(): Promise<void> {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.$emit("userDataValidate", this.user);
      }
    },
    recaptchaVerified(response: any) {
      if (response) {
        this.user.gRecaptcha = response;
        console.log(response);
      }
    },
    recaptchaExpired() {
      if (vueRecaptcha.value) {
        vueRecaptcha.value.reset();
        console.log("reset done");
      } else {
        console.log("reset failed");
      }
      this.user.gRecaptcha = "";
    },
    recaptchaFailed() {
      this.user.gRecaptcha = "";

      console.log("Failed");
    },
    recaptchaError(reason: any) {
      this.user.gRecaptcha = "";
      console.log("error", reason);
    },
  },
});
</script>
