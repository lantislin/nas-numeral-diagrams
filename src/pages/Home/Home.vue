<template>
  <nas-page-content class="nas-page-content-home">
    <div class="diagram-image">
      <img :src="imgSrc">
      <p class="tips">不诚不占、不义不占、不疑不占</p>
    </div>
    <div class="form-diagram">
      <el-row :gutter="10">
        <el-col :span="24">
          <ul class="form-list">
            <li class="form-item">
              <el-input
                @keyup.native.enter="onSubmit"
                @change="onChange"
                placeholder="输入一个3位数数字"
                v-model="firstNum"
                autofocus
                clearable>
              </el-input>
            </li>
            <li class="form-item">
              <el-input
                @keyup.native.enter="onSubmit"
                @change="onChange"
                placeholder="输入一个3位数数字"
                v-model="secondNum"
                clearable>
              </el-input>
            </li>
            <li class="form-item">
              <el-input
                @keyup.native.enter="onSubmit"
                @change="onChange"
                placeholder="输入一个3位数数字"
                v-model="thirdNum"
                clearable>
              </el-input>
            </li>
            <li class="form-item">
              <el-button type="primary" class="diagram-submit" @click="onSubmit" :loading="loading">起卦</el-button>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>

    <div class="diagram-content" v-if="diagramName">
      <div class="diagram">
        <el-row :gutter="20">
          <el-col :span="8">
            <diagram-photo
              :lines="lines"
              :currentLine="currentLine"
              :diagramThings="diagramThings">
            </diagram-photo>
          </el-col>
          <el-col :span="16">
            <h2 class="diagram-name">{{ diagramName }}</h2>
            <span class="diagram-portrait">{{ diagramPortrait }}</span>
          </el-col>
        </el-row>
      </div>
      <div class="diagram-description">
        <h3>卦辞：{{ diagramIntroduce }}</h3>
        <p>{{ diagramDescription }}</p>
      </div>
      <div class="diagram-line-description">
        <h3>动爻：{{ currentLineName }}</h3>
        <p>{{ lineDescription }}</p>
      </div>
      <el-alert
        title="晦涩难懂？您可以发布一则信息，让解卦高手来帮你。"
        type="warning"
        show-icon
        :closable="false">
        <el-button type="text" @click="create">立即前往</el-button>
      </el-alert>
    </div>
    <div class="diagram-message" v-else>起卦之前请心中默念你要问的事情，然后在上面的三个输入框中，分别填写三个三位数的数字，然后点“起卦”。</div>

  </nas-page-content>
</template>

<script>
import NasPageContent from '../../components/NasPageContent/NasPageContent.vue'
import DiagramPhoto from '../../components/DiagramPhoto/DiagramPhoto.vue'
export default {
  name: 'Home',
  components:{
    NasPageContent,
    DiagramPhoto
  },
  data(){
    var params = this.$route.params.args ? base64Decode(this.$route.params.args) : null;
  	return {
      imgSrc: require('./img.jpg'),
      loading: false,
      firstNum: '',
      secondNum: '',
      thirdNum: '',
      diagram: new Diagram(),
      lines: '',
      currentLine: 0,
      currentLineName: '',
      diagramName: '',
      diagramThings: '',
      diagramPortrait: '',
      diagramIntroduce: '',
      diagramDescription: '',
      lineDescription: ''
  	}
  },
  methods: {
    onChange(val){
      console.log(this.$event);
      if(Number(val) === NaN){
        return;
      }
    },
    create(){
      this.$router.push({
        name:'Create', 
        params: { 
          args: base64Encode({
            diagramName: this.diagramName,
            currentLineName: this.currentLineName,
            firstNum: this.firstNum,
            secondNum: this.secondNum,
            thirdNum: this.thirdNum
          })
        }
      });
    },
    onSubmit(){
      if(this.firstNum === ''){
        this.message('第一组数字不能为空哦！');
        return;
      }
      if(this.secondNum === ''){
        this.message('第二组数字不能为空哦！');
        return;
      }
      if(this.secondNum === ''){
        this.message('第三组数字不能为空哦！');
        return;
      }
      
      if(Number(this.firstNum) === NaN || Number(this.secondNum) === NaN || Number(this.thirdNum) === NaN){
        this.message('请填写数字！');
        return;
      }

      if(this.firstNum.length !== 3 || this.secondNum.length !== 3 || this.thirdNum.length !== 3){
        this.message('请填写三位数的数字！');
        return;
      }

      this.loading = true;

      setTimeout(()=>{
        this.loading = false;
        this.diagram.set(this.firstNum, this.secondNum, this.thirdNum);

        this.lines = this.diagram.getLines();
        this.currentLine = this.diagram.getCurrentLineIndex();
        this.currentLineName = this.diagram.getLineName();
        this.diagramName = this.diagram.getDiagram();
        this.diagramThings = this.diagram.getThings();
        this.diagramPortrait = this.diagram.getPortrait();
        this.diagramIntroduce =  this.diagram.getIntroduces();
        this.diagramDescription = this.diagram.getDescription();
        this.lineDescription = this.diagram.getLineDescription();

        this.diagram.getDiagramLine();
      }, 2000);    
    },
    message(msg){
      this.$message({
        message: msg,
        type: 'warning'
      });
    }
  },
  watch: {

  }
}
</script>

<style>
  .nas-page-content-home{
    max-width: 600px!important;
  }
  .diagram-image{
    text-align: center;
    margin-bottom: 20px;
  }
  .diagram-image img{
    width: 300px;
  }
  .diagram-image .tips{
    font-size: 16px;
    color: #999;
  }

  .form-diagram{
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
  .form-list,
  .form-item{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .form-list{
    padding-left: 1px; 
  }
  .form-item{
    height: 40px;
    margin-bottom: 5px;
    text-align: center;
    float: left;
    width: 25%;
    margin-left: -1px;
  }
  .form-item:last-child{
    margin-bottom: 0;
  }
  .form-diagram .el-button{
    width: 40px;
    height: 40px;
    border-radius: 0;
  }
  .form-diagram .btn-number{
    background-color: #222;
    color: #eee;
  }
  .form-diagram .el-input__inner{
    text-align: center;
    border-radius: 0;
    padding-left:10px;
    padding-right: 10px;
  }
  .form-diagram .diagram-submit{
    width: 100%;
    height: 40px;
    font-size: 16px;
  }
  .diagram{
    margin-bottom: 20px;
  }
  .diagram-name{
    font-size: 60px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0;
    display: inline-block;
    padding-left: 20px;
    padding-right: 20px;
  }
  .diagram-portrait{
    margin-left: 20px;
    display: inline-block;
    line-height: 40px;
  }
  
  .diagram-message{
    color: #999;
    font-size: 14px;
  }

</style>
