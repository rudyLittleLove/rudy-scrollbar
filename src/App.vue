<template>
  <div id="app">
    <ul class="container">
      <li>
        <h2>滚动条基础用法</h2>
        <rudy-scrollbar width="400px" height="300px" :noresize="true">
          <h3>内容不会变化的 建议设置noresize提高效率</h3>
          <h4>因为自定义滚动条会监听内容区域大小，实时更新滚动条区域</h4>
          <div style="color: red;">使用Vue.use() 的方式注册滚动条，就使用<br>&lt;rudy-scrollbar&gt; 内容区 &lt;rudy-scrollbar&gt; 标签 </div>
          <ul class="description" style="height: 600px">
            <li class="title">属性：</li>
            <li>width <em>滚动条容器宽度</em> <span>String 例:100px/100em/10%</span></li>
            <li>height <em>滚动条容器高度</em> <span>String 例:100px/100em/10%</span></li>
            <li>max-width <em>滚动条容器最大宽度</em> <span>同上</span></li>
            <li>max-height <em>滚动条容器最大高度</em> <span>同上</span></li>
          </ul>
        </rudy-scrollbar>
      </li>
      <li>
        <h2>横向与纵向滚动条</h2>
        <rudy-scrollbar width="400px" height="300px">
          <h3>内容宽度大于父级宽度时就会出现横向滚动条</h3>
          <ul class="description" style="height: 600px; width: 1000px">
            <li class="title">属性：</li>
            <li>width <em>滚动条容器宽度</em> <span>String 例:100px/100em/10%</span></li>
            <li>height <em>滚动条容器高度</em> <span>String 例:100px/100em/10%</span></li>
            <li>max-width <em>滚动条容器最大宽度</em> <span>同上</span></li>
            <li>max-height <em>滚动条容器最大高度</em> <span>同上</span></li>
          </ul>
        </rudy-scrollbar>
      </li>
      <li>
        <h2>支持过渡滚动效果</h2>
        <rudy-scrollbar width="400px" height="300px" :transition="true">
          <h3>点击滚动条透明区域，查看效果</h3>
          <ul class="description" style="height: 600px; width: 1000px">
            <li class="title">属性：</li>
            <li>transition <em>滚动条过渡</em> <span>Boolean 缺省：false</span></li>
          </ul>
        </rudy-scrollbar>
      </li>
      <li>
        <h2>支持固定显示滚动条</h2>
        <rudy-scrollbar width="400px" height="300px" :lastingShowBar="true" :transition="true">
          <h3>查看滚动条效果</h3>
          <ul class="description" style="height: 600px; width: 1000px">
            <li class="title">属性：</li>
            <li>lastingShowBar <em>是否持久显示滚动条</em> <span>Boolean 缺省：false</span></li>
          </ul>
        </rudy-scrollbar>
      </li>
      <li>
        <h2>支持滚动条定位</h2>
        <scrollbar ref="scrollbar" width="400px" height="300px" :transition="true">
          <h3>输入x与y轴坐标，跳转。非法字符忽略</h3>
          <ul class="description" style="height: 600px; width: 1000px">
            <li class="title">方法：</li>
            <li>scrollTop <em>上下滚动</em> <span>Number 例:100</span></li>
            <li>scrollLeft <em>垂直滚动</em> <span>Number 例:100</span></li>
            <li>scrollTo <em>上下垂直滚动</em> <span>Number 例：x:100,y:100</span></li>
          </ul>
        </scrollbar>
        <hr>  
        <div style="text-align: center">
          <button @click="targetPosition">button</button> x:
          <input v-model="xxx" type="text"> y:
          <input v-model="yyy" type="text">
        </div>
      </li>
      <li>
        <h2>支持滚动回调</h2>
        <rudy-scrollbar width="400px" height="300px" :transition="true" @scroll="scrollHandle">
          <h3>滚动查看位置（打开控制台查看返回事件对象，此事件对象为原生滚动事件对象）</h3>
          <span style="backround-color: #ffffff; position: absolute; right: 10px; top: 5px; color: red;">x:{{this.x}} y:{{this.y}}</span>
          <ul class="description" style="height: 600px; width: 1000px;">
            <li class="title">方法：</li>
            <li>scroll <em>滚动事件</em> <span>返回值 event 滚动事件对象</span></li>
          </ul>
        </rudy-scrollbar>
      </li>
      <li>
        <h2>其他属性</h2>
        <rudy-scrollbar width="400px" height="300px" :transition="true" @scroll="scrollHandle">
          <h3>滚动条所有对外暴露属性</h3>
          <ul class="description" style="height: 600px; width: 1000px;">
            <li class="title">方法：</li>
            <li>
<pre>
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
  }
  内部属性wrap 可访问
  直接获取滚动DOM
  可通过滚动的Dom 获取 scrollTop、scrollLeft 等等信息
</pre>
            </li>
          </ul>
        </rudy-scrollbar>
      </li>
      <li>
        <h2>修复目前elmentUI滚动条已存在的bug</h2>
        <div>
          <ul>
            <li>1.阻止拖动滚动条时的拖动事件 ondragstart ，因为滚动条较小，时常发生拖动时没点击到中间滚动的thumb，从而选中了一些元素，此时点击鼠标拖动时会造成拖拽事件，放开鼠标不会触发mouseup事件，滚动条会一直跟随鼠标。</li>
            <li>2.destroyed hook 时， 执行重置方法（内部重置），如果处于拖动中时，滚动条组件销毁，内部重置方法无法调用，会出现控制台报大量错误（鼠标移动控制滚动条需要处理的方法造成的），虽然页面中看不到，但影响性能与调试。</li>
            <br>
            <li style="font-weight: bold; color: red;">为什么没有滚动条样式？？？，小伙子，有了DOM，难道样式都不会加吗？想要什么样子的滚动条，自己找UI设计去。改炸了不负责啊！！</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import scrollbar from '../libs/scrollbar/index.js'

export default {
  name: 'app',
  components: {scrollbar},
  data () {
    return {
      msgs: "Irish News. Gardaí and family 'very concerned' for man missing since early hours of today. Gardaí are appealing for help in tracing a missing man in Co Wexford",
      xxx: 0,
      yyy: 0,
      x: 0,
      y: 0
    }
  },
  methods: {
    targetPosition() {
      this.$refs.scrollbar.scrollTo(this.xxx, this.yyy)
    },
    scrollHandle(e) {
      this.x = e.target.scrollLeft
      this.y = e.target.scrollTop
      console.log(e)
    }
  }
}
</script>

<style lang="stylus">
.container
  height 100%
  min-width 1200px
  > li
    width calc(100% / 3)
    float left
    height 400px
    h2
      text-align center
    h3
    h4
      width 280px
      margin 5px
  .el-scrollbar
    background-color #ffffff
    border 1px solid #000000
    margin 10px auto 0
  .el-scrollbar__view
    padding 10px
    box-sizing border-box
  .description
    padding-left 10px
    background-image linear-gradient(45deg, pink, rgba(0, 0, 0, .1))
    background-size 20px 20px
    li.title
      font-weight bold
    li:not(.title)
      padding-left 10px
    li
      color #000000
      em
        color #666666
      span 
        color blue
</style>
