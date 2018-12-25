import RudyScrollbar from "./src/main";

/* istanbul ignore next */
RudyScrollbar.install = function(Vue) {
  Vue.component(RudyScrollbar.name, RudyScrollbar);
};

if (typeof window !== 'undefined' && window.Vue) {
  RudyScrollbar.install(window.Vue)
}

export default RudyScrollbar;
