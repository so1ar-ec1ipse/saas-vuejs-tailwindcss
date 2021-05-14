<template>
  <div>
    <div>
      <div class="relative cursor-pointer" v-click-outside="closeDropDownFlags">
        <div>
          <div
            v-if="!open"
            v-on:click="dropDownFlags = !dropDownFlags"
            class="-my-3 pt-2"
          >
            <span v-if="!showFlagInsteadOfLocale">
              <span>
                {{ $t("settings.preferences.language") }}
              </span>
            </span>
            <country-flag
              v-else
              :country="getCurrentLocale(true)"
              size="normal"
            />
          </div>
        </div>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-show="dropDownFlags || open"
            :class="
              !open
                ? 'z-40 origin-top-right absolute right-0 mt-2 w-44 rounded-sm '
                : 'z-40 mt-2 w-44 rounded-sm '
            "
          >
            <div
              class="pt-1 rounded-sm bg-secondary border border-primary shadow-xl"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <a
                v-for="(language, index) in supportedLocales"
                v-on:click="changedLocale(language.lang)"
                :key="index"
                class="h-10 space-x-2 cursor-pointer truncate group flex items-center px-2 text-sm text-primary font-medium hover:bg-primary transition ease-in-out duration-150 border-b border-primary"
                role="menuitem"
              >
                <country-flag :country="language.flag" size="normal" />
                <div>
                  {{ $t("shared.locales." + language.lang) }}
                </div>
              </a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CountryFlag from "vue-country-flag";
import supportedLocales from "../../../locale/supportedLocales";
import { Prop } from "vue-property-decorator";
import { faLevelDownAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  components: {
    CountryFlag
  }
})
export default class FlagSelector extends Vue {
  @Prop() open!: boolean;
  @Prop({ default: true }) showFlagInsteadOfLocale;
  dropDownFlags: boolean = false;
  supportedLocales = supportedLocales;
  mounted() {
    this.dropDownFlags = this.open;
  }
  closeDropDownFlags() {
    this.dropDownFlags = false;
  }
  changedLocale(value) {
    this.closeDropDownFlags();
    this.$store.commit("locale/updateLocale", value);
    this.$i18n.locale = value;
  }
  getCurrentLocale(flag: boolean) {
    const current = this.supportedLocales.find(
      f => f.lang === this.$i18n.locale
    );
    if (current) {
      return flag ? current.flag : current.lang_short;
    }
    return flag ? "us" : "en";
  }
}
</script>

<style lang="scss" scoped></style>
