var current = 1;
rend();
function rend(){
    $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page:current,
            pageSize:5,
        },
        success:function(res){
          console.log(res)
          console.log(template('temp',res))
          $('.content tbody').html(template('temp',res));
        //   分页
        $('#pagintor').bootstrapPaginator({
            bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage:current,//当前页
            totalPages:Math.ceil(res.total/res.size),//总页数
            size:"small",//设置控件的大小，mini, small, normal,large
            onPageClicked:function(event, originalEvent, type,page){
              //为按钮绑定点击事件 page:当前点击的按钮值
              current = page;
              rend();
            }
        })
        }
    
    })
}