<template>
  <nas-page-content class="nas-page-content-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'List' }">问卦解卦</el-breadcrumb-item>
      <el-breadcrumb-item>{{ item.diagramName }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="diagram-detail">
      <el-card shadow="never" class="diagram-item">
        <time class="time">{{ formatTime(item.createTime) }}前</time>
        <div class="card-content">
          <el-row :gutter="10">
            <el-col :span="10">
              <diagram-photo
                :lines="lines"
                :currentLine="currentLine"
                :diagramThings="diagramThings">
              </diagram-photo>
            </el-col>
            <el-col :span="14">
              <h2 class="diagram-name">{{ item.diagramName }}</h2>
            </el-col>
          </el-row>    
        </div>
        <div class="card-footer">
          <div class="auther">发布者：{{ item.auther }}</div>
          <div class="auther">第一位数字：{{ item.firstNum }}</div>
          <div class="auther">第二位数字：{{ item.secondNum }}</div>
          <div class="auther">第三位数字：{{ item.thirdNum }}</div>
          <div class="auther">卦名：{{ item.diagramName }}</div>
          <div class="auther">动爻：{{ item.lineName }}</div>
          <div class="auther">求卦类型：{{ item.type }}</div>         
          <div class="auther">其它说明：{{ item.content }}</div>
        </div>
      </el-card>

      <div class="comments">
        <h2 class="comment-title">高手解卦：</h2>
        <div class="comment-list" v-if="data.total > 0">
          <el-card shadow="never" v-for="(row, index) in data.rows" :key="index" class="comment-item">
            <h2 class="comment-item-title">作者：{{ row.auther }}，在{{ formatTime(row.createTime) }}前，添加了评论：</h2>
            <p class="comment-item-content">{{ row.content }}</p>
          </el-card>
        </div>
        <div class="comment-list" v-else>
          还没有人评论
        </div>

        <div class="pagebar clearfix">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            @current-change="currentChange"
            :total="data.total">
          </el-pagination>
          <div class="page-info">
            共{{ data.total }}条评论
          </div>
        </div>
      </div>

      <el-card shadow="never" class="diagram-item">
        <el-form ref="form" :model="form" label-width="50px">
          <el-form-item label="解卦">
            <el-input type="textarea" v-model="form.content" rows="10" clearable @keyup.native="textareaChange"></el-input>
            <div class="textarea-status clearfix">
              <div class="pull-left text">
                {{ form.content.length }} / {{count}}
                <span class="tips" v-show="showTips">超出字数限制！</span>
              </div>
              <div class="pull-right"><a class="clear" href="javascript:;" @click="form.content = ''">清空</a></div>
            </div>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="loadingIcon" class="comment-submit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-card>

    </div>
  </nas-page-content>
</template>

<script>
import NasPageContent from '../../components/NasPageContent/NasPageContent.vue'
import DiagramPhoto from '../../components/DiagramPhoto/DiagramPhoto.vue'
export default {
  name: 'Detail',
  components:{
    NasPageContent,
    DiagramPhoto
  },
  data(){
    var params = base64Decode(this.$route.params.args);
  	return {
      params: params,
      id: params.id,
      lines: '',
      currentLine: '',
      diagramThings: '', 
      item: {
        firstNum: '',
        secondNum: '',
        thirdNum: '',
        diagramName: '',
        lineName: '',
        type: '',
        content: '',
        id: '',
        auther: '',
        createTime: ''
      },
      diagram: new Diagram(),
      pageSize: 10,
      data:{
        rows: [],
        total: 0        
      },
      loading: null,
      count: 200,
      showTips: false,
      loadingIcon: false,
      form:{
        content: ''
      }
  	}
  },
  created(){
    this.queryData();
    this.queryComments();
  },
  methods: {
    initData(){
      this.diagram.set(this.item.firstNum, this.item.secondNum, this.item.thirdNum);
      this.lines = this.diagram.getLines();
      this.currentLine = this.diagram.getCurrentLineIndex();
      this.diagramThings = this.diagram.getThings();
    },
  	queryData(){
      var self = this;
      query({
        from: from, 
        value: '0', 
        nonce: '0', 
        gas_price: '1000000', 
        gas_limit: '2000000',
        dappAddress: dappAddress,
        callFunctionName: 'getDiagramById',
        callFunctionArgs: JSON.stringify([self.id]),
        onBeforeSend(){
          self.openLoading();
        },
        onSuccess(res){
          self.closeLoading();
          //console.log(res.data);
          self.item = res.data;
          self.initData();
        },
        onFailed(data){
          self.closeLoading();
        },
        onError(err){
          self.closeLoading();
        }
      });
  	},
    queryComments(pageNumber){
      var self = this;
      query({
        from: from, 
        value: '0', 
        nonce: '0', 
        gas_price: '1000000', 
        gas_limit: '2000000',
        dappAddress: dappAddress,
        callFunctionName: 'getComments',
        callFunctionArgs: JSON.stringify([self.id, pageNumber || 1, this.pageSize]),
        onBeforeSend(){
          self.openLoading();
        },
        onSuccess(res){
          //console.log(res);
          self.closeLoading();
          self.data = res.data;
          self.initData();
        },
        onFailed(data){
          self.closeLoading();
        },
        onError(err){
          self.closeLoading();
        }
      });
    },
    onSubmit() {
      var description = HTMLDecode(this.form.content.trim());

      if (description === "") {
        this.$message({
          message: '解卦内容不能为空',
          type: 'warning'
        });
        return;
      }

      var self = this;
      var value = "0";
      var nonce = "0"
      var gas_price = "1000000";
      var gas_limit = "2000000";

      query({
        dappAddress: dappAddress,
        payCallbackUrl: payCallbackUrl,
        callFunctionName: 'saveComment',
        callFunctionArgs: JSON.stringify([self.id, description]),
        onBeforeSend(){
          self.loadingIcon = true;
        },
        onSuccess(data){
          self.$message({
            message: '提交成功，2秒后刷新',
            type: 'warning'
          });

          self.loadingIcon = false;

          setTimeout(()=>{
            self.queryComments();
            self.form.content = '';
            document.documentElement.scrollTop = 0;
          }, 2000);
        },
        onFailed(data){
          self.$message({
            message: '提交失败，请重试',
            type: 'warning'
          });

          self.loadingIcon = false;
        },
        onError(err){
          self.$message({
            message: '提交失败，请重试',
            type: 'warning'
          });

          self.loadingIcon = false;
        }
      });
    },
    textareaChange(){
      if(this.form.content.length > this.count){
        this.showTips = true;
      }else{
        this.showTips = false;
      }
    },
  	currentChange(pageNumber){
      this.queryComments(pageNumber);
    },
    formatTime(t){
      return transferHappendTime(t);
    },
    openLoading(){
      this.loading = this.$loading({
        lock: false,
        text: '正在加载',
        background: 'rgba(255, 255, 255, 0.5)'
      });
    },
    closeLoading(){
      this.loading.close();
    }
  },
  watch: {

  }
}
</script>

<style>
  .diagram-detail{
    margin-top: 20px;
  }
  .diagram-detail .diagram-item{
    margin-bottom: 15px; 
  }
  .diagram-detail .el-card{
    border-radius: 0;
    margin-top: -1px;
  }
  .comments .pagebar{
    margin:10px 0; 
  }
  .comment-title{
    font-size: 18px;
  }
  .comment-item-title{
    border-bottom: 1px solid #ddd;
    font-weight: normal;
    font-size: 14px;
    line-height: 30px;
    color: #666;
  }
  .comment-item .el-card__body{
    padding:0;
  }
  .comment-item-title,
  .comment-item-content{
    margin: 0;  
  }
  .comment-item-title{
    padding: 5px 20px;
    background-color: #fafafa;
  }
  .comment-item-content{
    padding: 20px;
  }
  .comment-submit{
    width: 150px;
  }
</style>
