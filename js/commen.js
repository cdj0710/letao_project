//发送ajax之前, 进度条开始
// 发送ajax结束, 进度条结束
// 任何ajax请求 都有进度条,所以需要注册ajax的全局事件
$(document).ajaxStart(function(){
    //   alert(1111)
    NProgress.start()
    })
    $(document).ajaxStop(function(){
        //   alert(1111)
        setTimeout(function(){
        NProgress.done()
          
        },1000)
    })
    