// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js

import "../css/scroll-bar.styl";

import { addResizeListener, removeResizeListener } from "../utils/resize-event";
import scrollbarWidth from "../utils/scrollbar-width";
import { toObject } from "../utils/util";
import { scrollTo } from "./util";
import Bar from "./bar";

/* istanbul ignore next */
export default {
  name: "RudyScrollbar",

  components: { Bar },

  props: {
    native: Boolean,
    wrapStyle: {}, // 滚动条外框样式
    wrapClass: {}, // 滚动条外框class
    viewClass: {}, // 内容区域class
    viewStyle: {}, // 内容区域样式
    barClass: {}, // 滚动条class
    thumbClass: {}, // 滚动条拖动按钮class
    lastingShowBar: Boolean, // 是否持续显示滚动条
    transition: Boolean, // 滚动是否添加过渡效果
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    width: String, 
    height: String, 
    maxHeight: String,
    maxWidth: String,
    tag: {
      type: String,
      default: "div"
    }
  },

  data() {
    return {
      sizeWidth: "0",
      sizeHeight: "0",
      moveX: 0,
      moveY: 0,
      showBar: false
    };
  },

  computed: {
    wrap() {
      return this.$refs.wrap;
    }
  },

  render(h) {
    let gutter = scrollbarWidth();
    let style = this.wrapStyle;

    if (gutter) {
      const gutterWith = `-${gutter}px`;
      const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle);
        style.marginRight = style.marginBottom = gutterWith;
      } else if (typeof this.wrapStyle === "string") {
        style += gutterStyle;
      } else {
        style = gutterStyle;
      }
      
      style = this.height ? `${style} height:${this.height};` : style;
      style = this.maxHeight ? `${style} max-height:${this.maxHeight};`: style;
    }
    const view = h(
      this.tag,
      {
        class: ["el-scrollbar__view", this.viewClass],
        style: this.viewStyle,
        ref: "resize"
      },
      this.$slots.default
    );
    const wrap = (
      <div
        ref="wrap"
        style={style}
        onScroll={this.handleScroll}
        class={[
          this.wrapClass,
          "el-scrollbar__wrap",
          gutter ? "" : "el-scrollbar__wrap--hidden-default"
        ]}
      >
        {[view]}
      </div>
    );
    let nodes;

    if (!this.native) {
      nodes = [
        wrap,
        <Bar
          move={this.moveX}
          size={this.sizeWidth}
          barData={{
            barClass: this.barClass,
            thumbClass: this.thumbClass,
            lastingShowBar: this.lastingShowBar,
            transition: this.transition
          }}
          showBar={this.showBar}
        />,
        <Bar
          vertical
          move={this.moveY}
          size={this.sizeHeight}
          barData={{
            barClass: this.barClass,
            thumbClass: this.thumbClass,
            lastingShowBar: this.lastingShowBar,
            transition: this.transition
          }}
          showBar={this.showBar}
        />
      ];
    } else {
      nodes = [
        <div
          ref="wrap"
          class={[this.wrapClass, "el-scrollbar__wrap"]}
          style={style}
        >
          {[view]}
        </div>
      ];
    }
    
    let scrollStyle = "";
    this.width && (scrollStyle += ` width: ${this.width};`);
    this.maxWidth && (scrollStyle += ` max-width: ${this.maxWidth};`);

    return h(
      "div",
      {
        class: "el-scrollbar",
        style: scrollStyle
      },
      nodes
    );
  },

  methods: {
    handleScroll(e) {
      const wrap = this.wrap;

      this.moveY = (wrap.scrollTop * 100) / wrap.clientHeight;
      this.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth;

      this.$emit("scroll", e);
    },

    update() {
      let heightPercentage, widthPercentage;
      const wrap = this.wrap;
      if (!wrap) return;

      heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight;
      widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth;

      this.sizeHeight = heightPercentage < 100 ? heightPercentage + "%" : "";
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + "%" : "";
    },
    scrollTo(x, y) {
      this.scrollTop(y);
      this.scrollLeft(x);
    }
  },

  mounted() {
    // 优化处理判断是否添加过渡
    if (this.transition) {
      this.scrollTop = m => {
        this.showBar = true
        scrollTo(m, "scrollTop", this.$refs.wrap, () => {
          setTimeout(() => { this.showBar = false}, 500)
        });
      };
      this.scrollLeft = m => {
        this.showBar = true
        scrollTo(m, "scrollLeft", this.$refs.wrap, () => {
          setTimeout(() => { this.showBar = false}, 500)
        });
      };
    } else {
      this.scrollTop = m => {
        this.showBar = true
        this.$refs.wrap.scrollTop = m;
        setTimeout(() => { this.showBar = false}, 500)
      };
      this.scrollLeft = m => {
        this.showBar = true
        this.$refs.wrap.scrollLeft = m;
        setTimeout(() => { this.showBar = false}, 500)
      };
    }

    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && addResizeListener(this.$refs.resize, this.update);
  },

  beforeDestroy() {
    if (this.native) return;
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  }
};
