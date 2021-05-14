<template>
  <div></div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";

@Component({
  components: {},
})
export default class NewsletterComponent extends BaseComponent {
  private subscribeURL: string = "";
  private email: string = "";
  mounted() {
    this.subscribeURL =
      process.env.VUE_APP_INTEGRATIONS_NEWSLETTER_MAILCHIMP?.toString() ?? "";
  }
  subscribe() {
    if (this.subscribeURL) {
      window.open(this.subscribeURL + "&EMAIL=" + this.email, "_blank");
    }
  }
}
</script>
