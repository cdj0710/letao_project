// 发送ajax请求
var current = 1;
function rend(){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:current,
            pageSize:5,
        },
        success:function(res){
          console.log(res);
          var str = template('cate_one',res);
            // console.log(str);
            // 渲染表格
            $('.content-main tbody').html(str);
            // 渲染分页
    
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:current,//当前页
                totalPages:Math.ceil(res.total/res.size),//总页数
                size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(event, originalEvent, type,page){
                  //为按钮绑定点击事件 page:当前点击的按钮值
                //   console.log(page)
                current = page;
                    rend();
                }
              });
        }
    })
}
rend();

// 点击按钮, 添加分类模态框显示
$('.content-main button').on('click',function(){
//   alert(1)
$('#myModal2').modal('show');
})


//表单验证  不为空
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
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
    }
  
  });


//   给验证成功以后注册事件
$("#myModal2 form").on('success.form.bv', function (e) {
    e.preventDefault();
    var text = $('#myModal2 form input').val()
    console.log(text)
    //使用ajax请求添加分类
    $.ajax({
        url:'/category/addTopCategory',
        type:'post',
        data:{
            categoryName:text,
        },
        success:function(res){
        //   console.log(res)
            if(res.success){
                // 删除字段内容及验证信息
                $('#myModal2 form').data('bootstrapValidator').resetField('categoryName',true);//重置表单，并且会隐藏所有的错误提示和图标
                // 关闭模态框
                $('#myModal2').modal('hide');
                // 重新渲染
                rend();
            }
        }
    })
    
});



