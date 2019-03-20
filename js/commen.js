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
          
        },500)
    })
    

 
// 公共区域
// 点击top_bar 左边,  左边导航栏, 
// 往左移, 上面导航栏和下面内容的paddingleft 减去180px
$('.top_bar .pull-left ').on('click',function(){
    $('.aside,.main .top_bar,.main .content').toggleClass('menu_hid');
    // $('.main .top_bar').toggleClass('menu_hid');
    // $('.main .content').toggleClass('menu_hid');
    console.dir($('.aside'))
})
// 点击top_bar 右边 模态框
$('.top_bar .pull-right ').on('click',function(){
    $('#myModal').modal()
})

// 点击退出, 发送ajax请求, 回到login页面
$('#logout_btn').on('click',function(){
  $.get('/employee/employeeLogout',function(){
    // alert(1);
    location.href = 'login.html';
  })
})

// 点击分类  slidedown 二级分类显示和隐藏
$('.cate').on('click',function(){
$(this).next().stop().slideToggle()

})