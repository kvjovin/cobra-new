<template>
  <div>
    <h3 class="heading-title">Enter Email {{ verificationTxt }}</h3>
    <form>
      <div class="form-group mb-3">
        <label for="email" class="form-label"
          >Email
          <ToolTip
            tooltipText="This is required to proceed with the verification process and to send you a confirmation regarding your elections."
          />
        </label>
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
              >Plase enter a valid email address</span
            >
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
import ToolTip from "@/components/common/ToolTip.vue";

export default defineComponent({
  name: "EditEmailView",
  components: {
    ToolTip,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      verificationTxt: "",
    };
  },
  validations() {
    return {
      email: { required, email },
    };
  },
  mounted() {
    this.verificationTxt =
      this.$route.query.action === "register" ? "For Verification" : "";
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
