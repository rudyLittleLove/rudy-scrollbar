import { on, off } from "../utils/dom";
import { renderThumbStyle, BAR_MAP, scrollTo } from "./util";

/* istanbul ignore next */
export default {
  name: "Bar",
  data() {
    return {
      cursorDown: false
    };
  },

  props: {
    vertical: Boolean,
    size: String,
    move: Number,
    barData: {}
  },

  computed: {
    bar() {
      return BAR_MAP[this.vertical ? "vertical" : "horizontal"];
    },

    wrap() {
      return this.$parent.wrap;
    },

    barOpacity() {
      // return this.cursorDown || this.barData.lastingShowBar;
    }
  },

  render() {
    const { size, move, bar } = this;

    return (
      <div
        class={[
          "el-scrollbar__bar",
          "is-" + bar.key,
          this.barData.barClass,
          { opacity1: this.barData.lastingShowBar }
        ]}
        onMousedown={this.clickTrackHandler}
        // style={{
        //   opacity: this.barOpacity
        // }}
      >
        {/* <span
          class="el-scrollbar__corner el-scrollbar__first"
          onMousedown={this.startMove}
        /> */}
        <div
          ref="thumb"
          class={["el-scrollbar__thumb", this.barData.thumbClass]}
          onMousedown={this.clickThumbHandler}
          style={renderThumbStyle({ size, move, bar })}
        />
        {/* <span
          class="el-scrollbar__corner el-scrollbar__last"
          onMousedown={this.startMove}
        /> */}
      </div>
    );
  },
  mounted() {
    // 优化处理是否过渡
    if (this.barData.transition) {
      this.scrollTop = size => {
        scrollTo(size, "scrollTop", this.wrap);
      };
      this.scrollLeft = size => {
        scrollTo(size, "scrollLeft", this.wrap);
      };
    } else {
      this.scrollTop = size => {
        this.wrap.scrollTop = size;
      };
      this.scrollLeft = size => {
        this.wrap.scrollLeft = size;
      };
    }
  },
  methods: {
    clickThumbHandler(e) {
      this.startDrag(e);
      this[this.bar.axis] =
        e.currentTarget[this.bar.offset] -
        (e[this.bar.client] -
          e.currentTarget.getBoundingClientRect()[this.bar.direction]);
    },

    clickTrackHandler(e) {
      const offset = Math.abs(
        e.target.getBoundingClientRect()[this.bar.direction] -
          e[this.bar.client]
      );
      const thumbHalf = this.$refs.thumb[this.bar.offset] / 2;
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100) / this.$el[this.bar.offset];

      this[this.bar.scroll](
        (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100
      );

      // this.wrap[this.bar.scroll] =
      //   (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100;
    },

    startDrag(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;

      on(document, "mousemove", this.mouseMoveDocumentHandler);
      on(document, "mouseup", this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
      document.ondragstart = () => false;
    },

    // startMove(e) {
    //   console.log(this.bar.scroll);
    // },

    mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      const prevPage = this[this.bar.axis];

      if (!prevPage) return;

      const offset =
        (this.$el.getBoundingClientRect()[this.bar.direction] -
          e[this.bar.client]) *
        -1;
      const thumbClickPosition = this.$refs.thumb[this.bar.offset] - prevPage;
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100) / this.$el[this.bar.offset];

      this.wrap[this.bar.scroll] =
        (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100;
    },

    mouseUpDocumentHandler() {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      off(document, "mousemove", this.mouseMoveDocumentHandler);
      document.onselectstart = null;
      document.ondragstart = null;
    }
  },

  destroyed() {
    this.mouseUpDocumentHandler();
    off(document, "mouseup", this.mouseUpDocumentHandler);
  }
};
