//渲染页面数据


// 渲染分页
var current = 1;
rend();

function rend() {
    // 发送请求 后台数据
    $.ajax({
        url: '/user/queryUser',
        type: 'get',
        data: {
            page: current,
            pageSize: 5,
        },
        // res.rows[iddelete] 1  是正常
        success: function (res) {
            console.log(res);
            // 1 渲染表格
            var str = template('temp1', res);
            $('.content_main tbody').html(str);

            // 2 渲染分页
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage: current,//当前页
                totalPages: Math.ceil(res.total / res.size),//总页数
                size: "small",//设置控件的大小，mini, small, normal,large
                onPageClicked: function (event, originalEvent, type, page) {
                    //为按钮绑定点击事件 page:当前点击的按钮值 
                    console.log(page);
                    //点击不同的页数, 渲染的表格就应该是多少页的
                    current = page;
                    // 并且重新发送请求, 渲染表格
                    rend();
                }
            });
        }
    })
}




