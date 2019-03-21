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