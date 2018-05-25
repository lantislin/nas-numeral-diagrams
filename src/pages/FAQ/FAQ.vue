<template>
  <nas-page-content class="nas-page-content-faq">
    <div class="faq">
      <div class="faq-question">
        <el-row :gutter="20">
          <el-col :span="2"><el-button type="info" circle>问</el-button></el-col>
          <el-col :span="22" style="line-height: 35px;">
            请问数字占卦如何使用？
          </el-col>
        </el-row>
      </div>
      <div class="faq-answer">
        <el-row :gutter="20">
          <el-col :span="2"><el-button type="default" circle>答</el-button></el-col>
          <el-col :span="22">
            非常简单，只需要在应用首页三个输入框中分别填入三个三位数的数字，比如111, 222, 333，然后点击“起卦”按钮，数秒后会将您的占卦结果显示在下方。
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="faq">
      <div class="faq-question">
        <el-row :gutter="20">
          <el-col :span="2"><el-button type="info" circle>问</el-button></el-col>
          <el-col :span="22" style="line-height: 35px;">
            请问数字占卦需要收费吗？
          </el-col>
        </el-row>
      </div>
      <div class="faq-answer">
        <el-row :gutter="20">
          <el-col :span="2"><el-button type="default" circle>答</el-button></el-col>
          <el-col :span="22">
            占卦完全免费，目前提供了解卦回答，暂时不收费，后续如果提供增值服务会另行通知。
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="faq">
      <div class="faq-question">
        <el-row :gutter="20">
          <el-col :span="2"><el-button type="info" circle>问</el-button></el-col>
          <el-col :span="22" style="line-height: 35px;">
            我发布解卦信息无法提交，为什么？
          </el-col>
        </el-row>
      </div>
      <div class="faq-answer">
        <el-row :gutter="20">
          <el-col :span="2"><el-button type="default" circle>答</el-button></el-col>
          <el-col :span="22">
            那时因为发布时需要解锁你的NAS钱包，所以你需要申请NAS钱包，以及使用<a href="https://www.google.cn/chrome/">Chrome浏览器</a>并安装<a href="https://github.com/ChengOrangeJu/WebExtensionWallet">Nebulas插件</a>。
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="faq">
      <div class="faq-question">
        <el-row :gutter="20">
          <el-col :span="2"><el-button type="info" circle>问</el-button></el-col>
          <el-col :span="22" style="line-height: 35px;">
            请问数字占卦是怎样的一种计算方式？
          </el-col>
        </el-row>
      </div>
      <div class="faq-answer">
        <el-row :gutter="20">
          <el-col :span="2"><el-button type="default" circle>答</el-button></el-col>
          <el-col :span="22">
            我们需要准备三个三位数的数字，第一个数除以8的余数，得出下卦（内卦）；第二个数字除以8的余数，得出上卦（外卦）；第三个数除以6，对应动爻，
            如果余数为0，则除以8的用8代替，除以6的用6代替。数字对应的先天八卦图：乾1、兑2、离3、震4、巽5、坎6、艮7、坤8，一组合就是64卦中的一卦。
          </el-col>
        </el-row>
      </div>
    </div>
  </nas-page-content>
</template>

<script>
import NasPageContent from '../../components/NasPageContent/NasPageContent.vue'
export default {
  name: 'FAQ',
  components:{
    NasPageContent
  },
  data(){
  	return {

  	}
  },
  created(){

  },
  mounted(){

  },
  methods: {

  },
  watch: {

  }
}
</script>

<style>
  .nas-page-content-faq{
    
  }
  .faq {
    border:1px dashed #eee;
    background-color: #fafafa;
    padding: 10px;
    margin-bottom: 20px; 
  }
  .faq-question{

    margin-bottom: 10px;
  }
  .faq .faq-icon{
    font-size: 24px;
    color: green;
  }
</style>
