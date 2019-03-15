<template>
  <div id="app" style="height: 100%">
    <!-- <rudy-scrollbar> -->
      <ul class="container">
        <li>
          <h2>滚动条基础用法</h2>
          <rudy-scrollbar width="600px" height="300px" :noresize="true">
            <h3>内容宽度大于父级宽度时就会出现横向滚动条,
              但是在这个例子中却没有出现横向滚动条，
              因为例子中有图片，图片加载完成才会有图片
              的宽度和高度出现，也就是这里图片还未加载
              完成这个插件就已经初始化完成了，在
              设置noresize="true" 之后是不监听内容区域大小
              更新滚动条，所以推荐在img标签上设置宽高，下个例子中有用到。
              原本还是推荐在内容区域不变化时使用noresize=“true”，elementUI推荐
              这样可以优化很大性能。</h3>
            <div>当然你也可以不设置noresize="true"，这样图片加载完成后，<br>
            就会把父级撑开，监听容器大小的事件就会触发，从而更新滚动条插件<br>
            第一第二个例子都设置了noresize属性，为了演示理解。</div>
            <div style="color: red;">使用Vue.use() 的方式注册滚动条，就使用<br>&lt;rudy-scrollbar&gt; 内容区 &lt;rudy-scrollbar&gt; 标签 </div>
            <ul class="description" style="height: 600px">
              <li class="title">属性：</li>
              <li>width <em>滚动条容器宽度</em> <span>String 例:100px/100em/10%</span></li>
              <li>height <em>滚动条容器高度</em> <span>String 例:100px/100em/10%</span></li>
              <img src="./images/oneone.jpg" alt="">
            </ul>
          </rudy-scrollbar>
        </li>
        <li>
          <h2>最大高度，最大宽度</h2>
          <rudy-scrollbar max-width="600px" max-height="300px" :noresize="true">
            <h3>因一些特殊场景需要设置最大宽高</h3>
            <ul class="description" style="height: 600px;">
              <li class="title">属性：</li>
              <li>max-width <em>滚动条容器最大宽度</em> <span>String 例:100px/100em/10%</span></li>
              <li>max-height <em>滚动条容器最大高度</em> <span>String 例:100px/100em</span></li>
              <img src="./images/twotwo.jpg" alt="" style="width: 1000px;height:auto">
            </ul>
          </rudy-scrollbar>
        </li>
        <li>
          <h2>支持过渡滚动效果</h2>
          <rudy-scrollbar width="600px" height="300px" :transition="true">
            <h3>点击滚动条透明区域，查看效果</h3>
            <ul class="description" style="height: 600px">
              <li class="title">属性：</li>
              <li>transition <em>滚动条过渡</em> <span>Boolean 缺省：false</span></li>
              <img src="./images/threethree.jpg">
            </ul>
          </rudy-scrollbar>
        </li>
        <li>
          <h2>支持固定显示滚动条</h2>
          <rudy-scrollbar width="600px" height="300px" :lastingShowBar="true" :transition="true">
            <h3>查看滚动条效果</h3>
            <ul class="description" style="height: 600px; width: 1000px">
              <li class="title">属性：</li>
              <li>lastingShowBar <em>是否持久显示滚动条</em> <span>Boolean 缺省：false</span></li>
              <img src="./images/fourfour.jpg">
            </ul>
          </rudy-scrollbar>
        </li>
        <li>
          <h2>支持滚动条定位</h2>
          <rudy-scrollbar ref="scrollbar" max-width="600px" max-height="200px" :transition="true">
            <h3>输入x与y轴坐标，跳转。非法字符忽略</h3>
            <ul class="description" style="height: 300px; width: 1500px; overflow: hidden">
              <li class="title">方法：</li>
              <li>scrollTop <em>上下滚动</em> <span>Number 例:100</span></li>
              <li>scrollLeft <em>垂直滚动</em> <span>Number 例:100</span></li>
              <li>scrollTo <em>上下垂直滚动</em> <span>Number 例：x:100,y:100</span></li>
              <img src="./images/five1.jpg">
              <img src="./images/five2.jpg">
            </ul>
          </rudy-scrollbar>
          <hr>  
          <div style="text-align: center">
            <button @click="targetPosition">button</button> x:
            <input v-model="xxx" type="text"> y:
            <input v-model="yyy" type="text">
          </div>
        </li>
        <li>
          <h2>支持滚动回调</h2>
          <rudy-scrollbar width="600px" height="300px" :transition="true" @scroll="scrollHandle">
            <h3>滚动查看位置（打开控制台查看返回事件对象，此事件对象为原生滚动事件对象）</h3>
            <span style="backround-color: #ffffff; position: absolute; right: 10px; top: 5px; color: red;">x:{{this.x}} y:{{this.y}}</span>
            <ul class="description" style="height: 600px; width: 1500px;">
              <li class="title">事件：</li>
              <li>scroll <em>滚动事件</em> <span>返回值 event 滚动事件对象</span></li>
              <img src="./images/six1.jpg" alt="">
              <img src="./images/six2.jpg" alt="">
            </ul>
          </rudy-scrollbar>
        </li>
        <li>
          <h2>其他属性</h2>
          <rudy-scrollbar width="600px" height="300px" :transition="true">
            <h3>滚动条所有对外暴露属性</h3>
            <ul class="description" style="height: 600px; width: 1000px;">
              <li class="title">属性</li>
              <li>
                <img src="./images/seven1.jpg" alt="">
                <img src="./images/seven2.jpg" alt="">
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
    <!-- </rudy-scrollbar> -->
  </div>
</template>

<script>

import RudyScrollbar from '../libs/scrollbar/index.js'

// 图片引入

export default {
  name: 'app',
  components: {RudyScrollbar},
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
    width calc(100% / 2)
    float left
    height 400px
    h2
      text-align center
    h3
    h4
      width 550px
      margin 5px
  .rudy-scrollbar
    background-color #ffffff
    border 1px solid #000000
    margin 10px auto 0
  .rudy-scrollbar__view
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
