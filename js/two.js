var current = 1;
rend();
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

// 点击按钮
// 模态框显示
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
      
      $('.dropdown-menu').html(template('temp2',res));
    }
  })
})

// 给一级菜单中的每一li添加事件, 点击获取该li的文字赋值给 下拉菜单的文字
$('.dropdown-menu').on('click','li',function(){
alert(1);
$('#one_btn').text($(this).text() +'<span class="caret"></span>')
})

// 添加二级分类模态框的表单校验
$('#myModal2 form').bootstrapValidator({

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
        //长度校验
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