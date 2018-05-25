<template>
  <div class="diagram-photo">
    <el-row :gutter="10">
      <el-col :span="16">
        <ul class="diagram-photo-list">
          <li class="diagram-photo-item" v-for="(item, index) in list" :key="index" :class="{'diagram-photo-item-active': 6 - currentLine === index}">
            <div class="diagram-photo-line-9" v-if="item === '9'">
              <el-row :gutter="0">
                <el-col :span="24"><span class="one"></span></el-col>
              </el-row>
            </div>
            <div class="diagram-photo-line-6" v-else-if="item === '6'">
              <el-row :gutter="10">
                <el-col :span="12"><span class="one"></span></el-col>
                <el-col :span="12"><span class="two"></span></el-col>
              </el-row>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :span="8">
        <div class="diagram-things">{{ diagramThings }}</div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
export default {
  name: 'DiagramPhoto',
  props: {
    lines: {
      type: String,
      default: '999999'
    },
    currentLine:{
      type: String,
      default: 1
    },
    diagramThings:{
      type: String,
      default: '天天'
    }
  },
  computed:{
    list(){
      return this.lines ? this.lines.split('') : [];
    }
  },
  created(){
    //console.log(this.lines.split(''));
  }
}
</script>

<style>
  .diagram-photo{
    
  }
  .diagram-photo-list,
  .diagram-photo-item{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .diagram-photo-item{
    margin-bottom: 10px;
    font-size: 0;
    line-height: 0;
  }
  .diagram-photo-item span{
    background-color: #000;
    height: 10px;
    display: block;
  }
  .diagram-photo-line-6,
  .diagram-photo-line-9{
    height: 10px;
    overflow: hidden;
  }
  .diagram-photo-item-active span{
    background-color: red;
  }
  .diagram-things{
    line-height: 55px;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-left:auto;
    margin-right: auto;
    width: 36px;
    padding: 0;
    color: #666;
  }
</style>
