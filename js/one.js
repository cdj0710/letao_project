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

