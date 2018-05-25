<template>
  <header class="header">
    <div class="wrapper">
      <a href="javascript:;" @click="gotoHome">
        <h1 class="header-title">
          <img :src="logoImage">
          <span class="split"> | </span>
          <span class="title">易经数字占卦</span>
        </h1>
      </a>
      <el-menu :background-color="'#000000'" :active-text-color="'#cccccc'" :text-color="'#999999'" :default-active="$route.name" class="header-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item :index="item.routerName" v-for="(item, index) in menuList" :key="index">{{ item.menuName }}</el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data(){
  	return {
      logoImage: require('./nebulasx60.png'),
      menuList: [
        {"menuName": "首页", "routerName": "Home"},
        {"menuName": "问卦解卦", "routerName": "List"},
        {"menuName": "FAQ", "routerName": "FAQ"}
      ]
  	}
  },
  methods: {
    handleSelect(key, keyPath){
      this.$router.push({"name":key});
    },
    gotoHome(){
      this.$router.push({"name": "Home"});
    }
  }
}
</script>

<style>
  .header{
    background-color: #000;
    border-bottom: 1px solid #eee;
    height: 80px;
    line-height: 80px;
    color: #ccc;
  }
  .header a{
    text-decoration: none;
    color: #ccc;
  }
  .header-title{
    padding: 0;
    margin: 0;
    float: left;
    line-height: 70px;
    font-weight: normal;
  }
  .header-menu{
    float: right;
  }
  .header-title img{
    vertical-align: middle;
    width: 160px;
  }
  .header-title .split{
    font-size: 16px;
    font-weight: normal;
    color: #666;
    margin: 0 10px
  }
  .header-title .title{
    font-size: 14px;
    font-weight: normal;
  }
  .header .el-menu{
    border-bottom: none;
  }
  .header .el-menu .el-menu-item{
    height: 80px;
    line-height: 80px;
  }
</style>
