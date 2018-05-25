<template>
  <nas-page-content class="nas-page-content-create">
    <el-alert
      title="请尽量详细准确填写您的占卦信息，方便别人为你解卦。"
      type="warning"
      show-icon
      :closable="false" style="margin-bottom: 20px;">
    </el-alert>

    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="第一个数字">
        <el-input placeholder="请输入第一个数字" v-model="form.firstNum" :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="第二个数字">
        <el-input placeholder="请输入第二个数字" v-model="form.secondNum" :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="第三个数字">
        <el-input placeholder="请输入第三个数字" v-model="form.thirdNum" :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="卦名/动爻">
        <el-cascader
          placeholder="请选择您所占到卦名以及动爻"
          :options="diagrams"
          v-model="form.diagram"
          @change="handleChange" style="width: 100%;" :disabled="true">
        </el-cascader>
      </el-form-item>
      <el-form-item label="求卦类型">
        <el-radio-group v-model="form.diagramType">
          <el-radio
            v-for="item in diagramTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="其它说明">
        <el-input type="textarea" v-model="form.description" rows="10" clearable @keyup.native="textareaChange"></el-input>
        <div class="textarea-status clearfix">
          <div class="pull-left text">
            {{ form.description.length }}/{{count}}
            <span class="tips" v-show="showTips">超出字数限制！</span>
          </div>
          <div class="pull-right"><a class="clear" href="javascript:;" @click="form.description=''">清空</a></div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">立即创建</el-button>
        <el-button type="default" @click="onBack">返回首页</el-button>
      </el-form-item>
    </el-form>
  </nas-page-content>
</template>

<script>
import NasPageContent from '../../components/NasPageContent/NasPageContent.vue'
import data from './data.js'
export default {
  name: 'Create',
  components:{
    NasPageContent
  },
  data(){
    var params = this.$route.params.args ? base64Decode(this.$route.params.args) : null;
  	return {
      count: 200,
      showTips: false,
      loading: false,
      diagrams: data.diagrams,
      diagramTypes: data.types,
      form: {
        firstNum: params ? (params.firstNum || '') : '',
        secondNum: params ? (params.secondNum || '') : '',
        thirdNum: params ? (params.thirdNum || '') : '',
        diagramName: params ? (params.diagramName || '') : '',
        diagramLine: params ? (params.currentLineName || '') : '',
        diagram: params ? [params.diagramName || '', params.currentLineName || '']: [],
        diagramType: '',
        description: ''
      }
  	}
  },
  mounted(){
    document.documentElement.scrollTop = 0;
  },
  methods: {    
    handleChange(val){
      this.form.diagramName = val[0];
      this.form.diagramLine = val[1];
    },
    textareaChange(){
      if(this.form.description.length > this.count){
        this.showTips = true;
      }else{
        this.showTips = false;
      }
    },
    onSubmit() {
      var description = HTMLDecode(this.form.description.trim());

      if (!Number(this.form.firstNum)) {
        this.$message({
          message: '第一个数字不能为空',
          type: 'warning'
        });
        return;
      }

      if (!Number(this.form.secondNum)) {
        this.$message({
          message: '第二个数字不能为空',
          type: 'warning'
        });
        return;
      }

      if (!Number(this.form.thirdNum)) {
        this.$message({
          message: '第三个数字不能为空',
          type: 'warning'
        });
        return;
      }

      if (this.form.diagram.length === 0) {
        this.$message({
          message: '卦名以及动爻不能为空',
          type: 'warning'
        });
        return;
      }

      if (this.form.diagramType === "") {
        this.$message({
          message: '求卦类型不能为空',
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
        callFunctionName: 'saveDiagram',
        callFunctionArgs: JSON.stringify([this.form.firstNum, this.form.secondNum, this.form.thirdNum, this.form.diagramName, this.form.diagramLine, this.form.diagramType, this.form.description]),
        onBeforeSend(){
          self.loading = true;
        },
        onSuccess(data){
          self.$message({
            message: '发布成功，2秒后跳转...',
            type: 'warning'
          });

          self.loading = false;
          
          setTimeout(()=>{
            self.$router.replace({name: 'List'});
          }, 2000);
        },
        onFailed(data){
          self.$message({
            message: '提交失败，请重试',
            type: 'warning'
          });
          
          self.loading = false;
        },
        onError(err){
          self.$message({
            message: '发布失败，请重试',
            type: 'warning'
          });
          self.loading = false;
        }
      });
    },
    onBack(){
      this.$router.go(-1);
    },
    view(){
      this.$router.replace({
        name:'List'
      });
    }
  },
  watch: {

  }
}
</script>

<style>
  
</style>
