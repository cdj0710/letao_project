var current = 1;
rend();
function rend() {
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetailList',
        data: {
            page: current,
            pageSize: 5,
        },
        success: function (res) {
            //   console.log(res)
            //   console.log(template('temp',res))
            $('.content tbody').html(template('temp', res));
            //   分页
            $('#pagintor').bootstrapPaginator({
                bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage: current,//当前页
                totalPages: Math.ceil(res.total / res.size),//总页数
                size: "small",//设置控件的大小，mini, small, normal,large
                onPageClicked: function (event, originalEvent, type, page) {
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    current = page;
                    rend();
                }
            })
        }

    })
}

// 模态框展示
$('.content-main .btn').click(function () {
    $('#add_produc').modal('show');

    //  发送请求, 获取二级分类, 渲染下拉列表
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100,
        },
        success: function (res) {
            //   console.log(res);
            //   console.log(template('temp2',res))
            $('.dropdown-menu').html(template('temp2', res))
        }
    })
})

// 点击二级分类, 修改按钮文字,存储id
$('.dropdown-menu').on('click', 'li', function () {
    //   alert(1)
    $('.two_cate').text($(this).text());
    $('[name=brandId]').val($(this).data('id'))
    $('#produc_form').data('bootstrapValidator').updateStatus('brandId','VALID')

})
// 上传图片, 拿到上传图片的路径
var pic_arr = [];
$('#produc_img').fileupload({
    done: function (e, data) {
        console.log(data.result)
        $('.img_box').prepend('<img src="' + data.result.picAddr + '" alt="" width="100" height="100"> ');
        $('.img_box img').eq(3).remove();
        //  执行一次获取路径, 添加数组的项, 当数组的长度超过3, 删除最后一项
        // 执行一次添加一次对象, 
        pic_arr.unshift(data.result);
        if (pic_arr.length > 3) {
            pic_arr.pop();
            // 当数组长度为4, 删除最后一个长度为3
            // 因为只有数组大于3, 才会进入, 
            // 而等于3就已经验证成功, 所以验证成功写在外面
            console.log(pic_arr)
        }

        if(pic_arr.length === 3){
            // 手动改变校验的状态  是为了实时显示  只要有value值最后提交就能通过
            $('#produc_form').data('bootstrapValidator').updateStatus('picArr','VALID')
        }else{
            // 手动使验证不成功
            $('#produc_form').data('bootstrapValidator').updateStatus('picArr','INVALID')
       } 
        // 将数组转为字符串,并赋值给 name = picArr的表单项
        $('[name=picArr]').val(JSON.stringify(pic_arr));
    }
})

// 表单验证
$('#produc_form').bootstrapValidator({
    // 排除验证的项
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
        brandId: {
            validators: {
                notEmpty: {
                    message: '请选择一个二级分类'
                }
            }
        },
        proName: {
            validators: {
                notEmpty: {
                    message: '请输入商品的名称'
                }
            }
        },
        proDesc: {
            validators: {
                notEmpty: {
                    message: '请输入商品的描述'
                }
            }
        },
        num: {
            validators: {
                notEmpty: {
                    message: '请输入商品的库存'
                },
                // 1-99999 
                regexp: {
                    regexp: /^[1-9]\d{0,4}$/,
                    message: '商品库存只能是1-99999之间'
                }
            }
        },
        size: {
            validators: {
                notEmpty: {
                    message: '请输入商品的尺码'
                },
                // xx-xx
                regexp: {
                    regexp: /^\d{2}-\d{2}$/,
                    message: '尺码的格式必须是xx-xx'
                }
            }
        },
        oldPrice: {
            validators: {
                notEmpty: {
                    message: '请输入商品的原价'
                }
            }
        },
        price: {
            validators: {
                notEmpty: {
                    message: '请输入商品的价格'
                }
            }
        },
        picArr: {
            validators: {
                notEmpty: {
                    message: '请上传3张图片'
                }
            }
        }
    },
})

//表单验证成功  阻止默认行为
$("#produc_form").on('success.form.bv', function (e) {
    e.preventDefault();
    console.log($('#produc_form').serialize())
    //使用ajax提交添加表单
    $.ajax({
        type:'post',
        url:'/product/addProduct',
        data:$('#produc_form').serialize(),
        success:function(res){
          console.log(res);
          if(res.success){
            // 关闭模态框
            $('#add_produc').modal('hide');
            // 重置表单
            $('#produc_form').data('bootstrapValidator').resetForm(true);
            // 重置 pic_arr
            pic_arr=[];
            // 重置下拉菜单, 
            $('.two_cate').text('请选择二级分类')
            // 重置img
            $('.img_box img').remove();
            // 渲染
            rend();
          }
        }
    })

});
