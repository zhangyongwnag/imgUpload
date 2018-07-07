<template>
  <div>
    <h2 style="text-align: center;">倒计时 <br>
      上传预览删除图片</h2>
    <div class="input">
      <input type="file" @change="chooiseImg" accept="image/*" capture="camera">
    </div>

    <img width="33.3%" height="120px" :src="item" alt="" v-for="(item,index) in images" @click="preview_img(item,index)">

    <div class="ImgPreview" ref="imgPre">
      <p>{{imgIndex}}&nbsp;/&nbsp;{{images.length}}</p>
      <img :src="imgPreview" alt="" @click="hidden_img">
      <img @click="delete_img" class="delete_img" src="http://static-fengchaohuzhu-com.oss-cn-beijing.aliyuncs.com/ct_images/img/icon_delete@2x.png" alt="">
    </div>


    <div v-if="uploadImgStatus" class="button" @click="commit">点击上传图片</div>
    <div v-else class="button" style="background-color: #c3c3c3">再次上传图片({{time}}s)</div>

    <h4 style="width:100%;background-color: black;color: white;padding: 10px;display:flex;justify-content:center;align-items:center;position: fixed;left: 0;bottom: 0;" @click="reloadPage">刷新本页面</h4>
    <h4 style="width:100%;background-color: black;color: white;padding: 10px;display:flex;justify-content:center;align-items:center;position: fixed;left: 0;bottom: 50px;" @click="reloadPage">765298337@qq.com</h4>
    <h4 style="width:100%;background-color: black;color: white;padding: 10px;display:flex;justify-content:center;align-items:center;position: fixed;left: 0;bottom: 100px;" @click="reloadPage">zyw765298337@gmail.com</h4>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        images:[],
        imgPreview:'',
        imgIndex:-1,
        uploadImgStatus:true,
        time:0,
      }
    },
    computed:{
//      delete_img(){
//        return this.images.filter(item => item == this.imgPreview)
//      }
    },
    watch:{
      images(v){
        console.log(v)
      }
    },
    mounted(){

    },
    methods:{
      //选择图片
      chooiseImg(e){
        if (e.target.files.length > 0){
          //显示本地路径
//          let URL = window.URL || window.webkitUrl;
//          let file = URL.createObjectURL(e.target.files[0])
//          this.images.push(file)

        //回调找不到this,改为箭头函数，或者变量接收，这里用箭头函数
        //let self = this
        let reader = new FileReader()
        reader.onload = e =>{
          this.images.push(e.target.result) //得到base64
        }
        reader.readAsDataURL(e.target.files[0])
        }
      },
      //预览图片
      preview_img(item,index){
        this.imgIndex = index + 1
        this.imgPreview = item
        this.$refs.imgPre.style.transform = 'scale(1)'
      },
      //取消预览
      hidden_img(){
        this.$refs.imgPre.style.transform = 'scale(0)'
      },
      //删除图片
      delete_img(){
        for (var i in this.images){
          if (this.images[i] == this.imgPreview){
            this.images.splice(i,1)
            this._toast('删除成功')
          }
        }
        this.$refs.imgPre.style.transform = 'scale(0)'
      },
      //上传图片
      commit(){
        //发请求
        new Promise((resolve,reject) =>{
          if (this.images.length){
            resolve()
          }else {
            reject('请先选择图片')
          }
        })
          .then(()=>{
            for (var i in this.images){
              //得到每张图片的base64，发请求
              setTimeout(()=>{
                this._toast('正在发送请求' + i)
              },1000)
            }
            this.time = 60
            let int = setInterval(()=>{
              this.time --
              this.uploadImgStatus = false
              if (this.time == 0){
                this.uploadImgStatus = true
                clearInterval(int)
              }
            },1000)
          })
          .catch((err)=>{
            this._toast(err)
          })
      },
      //强制刷新本页面
      reloadPage(){
        location.reload()
      },
      //封装toast
      _toast(text){
        let div = document.createElement('div')
        div.style.position = 'fixed'
        div.style.left = '50%'
        div.style.top = '50%'
        div.style.maxWidth = '80%'
        div.style.color = 'white'
        div.style.backgroundColor = 'rgba(0,0,0,0.7)'
        div.style.padding = '10px 30px'
        div.style.borderRadius = '5px'
        div.style.opacity = '0'
        div.style.zIndex = 999999999
        div.innerHTML = text
        document.body.appendChild(div)
        setTimeout(()=>{
          div.style.marginLeft = (-div.offsetWidth/2) + 'px'
          div.style.marginTop = (-div.offsetHeight) + 'px'
          div.style.transition = 'all 0.3s'
          div.style.opacity = '1'
          setTimeout(()=>{
            div.style.marginTop = (-div.offsetHeight/2) + 'px'
            div.style.opacity = '0'
            setTimeout(()=>{
              document.body.removeChild(div)
            },300)
          },2500)
        },0)
      },
    },

  }
</script>
<style scoped>
  .input{
    background-image: url(http://static-fengchaohuzhu-com.oss-cn-beijing.aliyuncs.com/ct_images/img/icon_addtupian@2x.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 60px;
    height:60px;
    margin-top: 50px;
  }
  .input input{
    width: 60px;
    height:60px;
    opacity: 0;
  }
  .ImgPreview{
    z-index: 999999999;
    width: 100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    background-color: black;
    opacity: 1;
    transform: scale(0);
    transition: all 0.4s;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ImgPreview p{
    font-size: 60px;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    height:0;
  }
  .ImgPreview img{
    width: 100%;
    height:60%;
  }
  .ImgPreview .delete_img{
    width: 50px;
    height:50px;
    margin-top: 30px;
  }
  .button{
    width: 70%;
    height:40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fc3;
    border-radius: 15px;
    border: 0px;
    font-size: 16px;
    color:black;
    margin: 0 auto;
    margin-top: 50px;
  }
  .button:active{
    background-color: olive;
  }
</style>
