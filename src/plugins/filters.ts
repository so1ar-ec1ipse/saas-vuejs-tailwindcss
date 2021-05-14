import Vue from "vue";
import moment from "moment";
import store from "@/store";
const numeral = require('numeral');

const numberFormat = Vue.filter("numberFormat", (value, format) => {
    moment.locale(store.state.locale.locale);
    return numeral(value).format(format);
});
const decimalFormat = Vue.filter("decimalFormat", (value) => {
    moment.locale(store.state.locale.locale);
    return numeral(value).format('0,0.00');
});
const intFormat = Vue.filter("intFormat", (value) => {
    moment.locale(store.state.locale.locale);
    return numeral(value).format( '0,0');
});
const dateAgo = Vue.filter("dateAgo", (value, unitOfTime) => {
    moment.locale(store.state.locale.locale);
    const today = moment(new Date());
    const at = moment(value);
    const days = Math.abs(today.diff(at, "days"));
    if (unitOfTime) {
      return moment(at).startOf(unitOfTime).fromNow();
    }
    if (days <= 1) {
      return moment(at).startOf("minute").fromNow();
    } else if (days <= 7) {
      return moment(at).startOf("day").fromNow();
    } else if (days <= 30) {
      return moment(at).startOf("week").fromNow();
    } else if (days <= 30 * 12) {
      return moment(at).startOf("month").fromNow();
    } else if (days <= 30 * 12 * 2) {
      return moment(at).startOf("year").fromNow();
    } else {
      return moment(at).format("YYYY-MM-DD");
    }
});
const dateYMD = Vue.filter("dateYMD", (value) => {
  moment.locale(store.state.locale.locale);
  return moment(value).format("YYYY-MM-DD");
});
const dateLL = Vue.filter("dateLL", (value) => {
  moment.locale(store.state.locale.locale);
  return moment(value).format("YYYY-MM-DD");
});
const dateFormat = Vue.filter("dateFormat", (value, format) => {
  moment.locale(store.state.locale.locale);
  return moment(value).format(format);
});
const dateYMDHMS = Vue.filter("dateYMDHMS", (value) => {
  moment.locale(store.state.locale.locale);
  return moment(value).format("YYYY-MM-DDTHH-mm-ss");
});

export const filters = {
  numberFormat,
  decimalFormat,
  intFormat,
  dateAgo,
  dateYMD,
  dateLL,
  dateFormat,
  dateYMDHMS
}
