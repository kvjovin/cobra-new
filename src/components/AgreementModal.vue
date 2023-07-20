<!-- TheModal.vue -->
<template>
  <div
    class="modal fade"
    tabindex="-1"
    :class="{ 'show d-block': visible }"
    @click.self="closeModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <button type="button" class="btn-close" @click="closeModal"></button>
        <div class="agreement-img">
          <img src="../assets/images/agreement.png" class="w-auto" />
        </div>
        <div class="modal-header">
          <div class="modal-title">Accept Terms and Conditions to Continue</div>
        </div>
        <div class="modal-body">
          We noticed that you declined our terms and conditions. If you declined
          by mistake, you can accept them by clicking the button below.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn text-primary me-sm-3"
            @click="closeModal"
          >
            DECLINE
          </button>
          <button type="button" class="btn btn-primary" @click="submitModal">
            AGREE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    submitModal() {
      // You can handle the submit logic here
      this.closeModal();
    },
  },
};
</script>

<style lang="scss">
.modal {
  background-color: rgba(0, 0, 0, 0.7);
  .modal-dialog {
    --bs-modal-width: 457px;

    .modal-content {
      padding: 18px 20px;

      .agreement-img {
        margin: 0 auto;

        img {
          max-width: 175px;
        }
      }

      .btn-close {
        --bs-btn-close-bg: url(../assets/icons/close-modal.svg);
        --bs-btn-close-opacity: 1;
        background-size: 25px;
        background-size: contain;
        margin-right: 0;
        margin-left: auto;
      }

      .modal-header {
        --bs-modal-header-border-width: 0;
        --bs-modal-header-padding: 20px 0px 10px;

        .modal-title {
          color: #024059;
          font-size: 20px;
          font-weight: 600;
          margin: auto;
        }
      }

      .modal-body {
        --bs-modal-padding: 0px 21px;
        font-weight: 500;
        text-align: center;
      }

      .modal-footer {
        --bs-modal-footer-border-width: 0;
        justify-content: center;
        padding: 25px 0px;

        .btn {
          width: 175px;
          border: 1px solid #5d9143;
        }
      }
    }
  }
}

@media (min-width: 576px) {
  .modal .modal-dialog .modal-content .modal-header {
    --bs-modal-header-padding: 20px 10px 10px;
  }
  .modal .modal-dialog .modal-content .modal-footer {
    padding: 25px 10px;
  }
}
</style>
