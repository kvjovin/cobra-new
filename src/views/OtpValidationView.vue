<template>
  <div>
    <h3 class="heading-title">Enter Verification Code</h3>
    <p class="v-code-text">We have sent a verification code to</p>
    <p class="email-text">
      shasha@dreamorbit.com
      <router-link class="edit-email edit-pencil" to="/edit-email">
        EDIT
      </router-link>
    </p>
    <form>
      <div class="form-group mb-3">
        <label for="name" class="form-label">Code</label>
        <input
          type="text"
          class="form-control type-number"
          id="name"
          v-model="otpcode"
          @input="v$.otpcode.$touch()"
          :class="v$.otpcode.$error ? 'is-invalid' : 'input-text'"
        />
        <div class="input-errors" v-if="v$.otpcode.$error">
          <span
            :class="{ 'is-invalid': v$.otpcode.$error }"
            v-if="v$.otpcode.required"
          >
            Please enter a valid verification code
          </span>
        </div>
      </div>
      <div class="form-group mt-4">
        <button
          type="button"
          :disabled="v$.otpcode.$invalid"
          class="btn w-100"
          :class="[buttonDesign()]"
          @click="submitOtp"
        >
          VERIFY
        </button>
      </div>
    </form>
    <div class="mt-2">
      <div class="float-left resend-code" :class="[resendTextEnable]">
        RESEND CODE
      </div>
      <div class="timing-color float-right">{{ formatedCountdown }}</div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { required, maxLength, minLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import moment from "moment";

export default defineComponent({
  name: "OtpValidationView",
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
      otpcode: "",
      submitted: false,
      countdown: 59,
    };
  },
  validations() {
    return {
      otpcode: {
        required,
        numeric,
        maxLength: maxLength(6),
        minLength: minLength(6),
      },
    };
  },
  mounted() {
    this.timerCountdowm();
  },
  computed: {
    formatedCountdown() {
      return moment(this.countdown, "seconds").format("m:ss");
    },
    resendTextEnable() {
      return this.countdown ? "disabled" : "";
    },
  },
  methods: {
    timerCountdowm() {
      const stopCountdown = setInterval(() => {
        this.countdown -= 1;
        if (!this.countdown) clearInterval(stopCountdown);
      }, 1000);
    },
    buttonDesign() {
      const buttonStatus = this.v$.otpcode.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-primary";
    },
    async submitOtp(): Promise<void> {
      this.submitted = true;
      this.v$.$touch();
      this.$router.push("/agreement");
      // this.$emit("otpValueSubmit", this.formData);
    },
    async editEmailForm(): Promise<void> {
      this.$emit("editEmailId");
    },
  },
});
</script>
