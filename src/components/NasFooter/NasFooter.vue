<template>
  <div class="footer">
  	<div class="wrapper">
		  <img :src="logoImage" width="160">
      <p class="other">星云易经数字占卦</p>
      <p class="copyright">Copyright © 2017-2018 By <a href="mailto:80589090@qq.com">LANTIS</a></p>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'NasFooter',
  data(){
    return {
      logoImage: require('./nebulasx60.png')
    }
  },
  methods: {
    handleSelect(key){
      this.$router.push({"name":key});
    }
  }
}
</script>

<style>
  .footer{
    background-color: #fafafa;
    text-align: center;
  }
  .footer .wrapper{
  	padding: 20px;
  }
  .footer .other{
    font-size: 14px;
    color: #999;
    margin:10px 0;
    padding: 0; 
  }
  .footer .copyright{
    margin:0;
    font-size: 14px;
    color: #999;
  }
  .menu-list,
  .menu-item{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .menu-list{
    margin-top: 15px; 
  }
  .menu-item{
    display: inline-block;
    font-size: 14px;
    color: #666;
    text-decoration: none;
  }
  .menu-item:hover{
    color: #444;
  }
  .menu-list .split{
    color: #ccc;
    margin-left: 12px;
    margin-right: 15px; 
  }
  .footer a{
    text-decoration: none;
    color: #999;
  }
  .footer a:hover{
    text-decoration: underline;
  }
</style>
