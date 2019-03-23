var current = 1;
rend();
// 渲染页面 分页
function rend(){
//  发送ajax获得数据,
$.ajax({
    url:'/category/querySecondCategoryPaging',
    type:'get',
    data:{
        page:current,
        pageSize:5,
    },
    success:function(res){
      console.log(res);
      // 调用模板引擎, 渲染表格
      $('.content tbody').html(template('temp',res));
      // 引用分页, 渲染分页, 回调重新渲染
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:current,//当前页
        totalPages:Math.ceil(res.total/res.size),//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          current = page;
          rend();
        }
      });
    }
})

}


// 模态框显示 一级分类
$('.content button').on('click',function(){
  // alert(1)
  $('#myModal2').modal('show');
  // 发送一级分类的请求,进行模板引擎的渲染
  $.ajax({
    url:'/category/queryTopCategoryPaging',
    type:'get',
    data:{
      page:1,
      pageSize:100,
    },
    success:function(res){
      console.log(res);
      // 请求成功, 渲染下拉菜单列表
      $('.dropdown-menu').html(template('temp2',res));
    }
  })
})

// 给一级菜单中的每一li添加事件, 点击获取该li的文字赋值给隐藏input的value
$('.dropdown-menu').on('click','li',function(){
    $('.one_cate').html($(this).text());
    // 一级分类的id 赋值给 categoryId的value
    $('[name="categoryId"]').val($(this).data('id'));
    // js给添加一级分类, 验证只识别手动添加
    // 添加一级分类后, 手动改变验证状态  bootstrapvalidator的改变状态方法
    $('#add_sec').data('bootstrapValidator').updateStatus('categoryId','VALID')
})


// 表单校验
$('#myModal2 form').bootstrapValidator({
    // 指定不校验的类型 默认隐藏项都不校验
    // excluded: [':disabled', ':hidden', ':not(:visible)']
  excluded:[],
  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    categoryId: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入一级分类'
        },
      }
    },
    brandName:{
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入二级分类'
        },
      }
    },
    brandLogo:{
      validators: {
        //不能为空
        notEmpty: {
        message: '请上传图片'
        },
      }
    }
  }

});

//! 使用fileupload插件可以在文件上传的时候自动拿到路径
$('#fileupload').fileupload({
  // 文件上传的自调用函数
  done:function(e,data){
    // data.result.picAddr 上传后的图片地址
    var url = data.result.picAddr;
    $('#logo_img').attr('src',url) // 图片回显
    
    $('[name="brandLogo"]').val(url)// 给图片隐藏域的input赋值
    // 添加图片后, 手动修改校验状态
    $('#add_sec').data('bootstrapValidator').updateStatus('brandLogo','VALID')

  }
})

// 表单验证成功
$("#add_sec").on('success.form.bv', function (e) {
  // 阻止默认提交行为
  e.preventDefault();
  console.log($('#add_sec').serialize())
  //使用ajax提交数据
  $.ajax({
    url:'/category/addSecondCategory',
    type:'post',
    data:$('#add_sec').serialize(),
    success:function(res){
      console.log(res)
      if(res.success){
      // 清除表单
      $('#myModal2 #add_sec').data('bootstrapValidator').resetForm(true);
      // 请求成功, 关闭模态框,
      $('#myModal2').modal('hide')
      }
      // 渲染页面
      rend();
    }
  })
});
