 // console.log($('.panel-body form'));
        
 var $form = $('.panel-body form');
 // 表单验证时的样式,初始化
 $form.bootstrapValidator({
     // 校验时的字体图标
     feedbackIcons: {
         // 正确的字体图标
         valid: 'glyphicon glyphicon-thumbs-up',
         // 错误的字体图标
         invalid: 'glyphicon glyphicon-thumbs-down',
         validating: 'glyphicon glyphicon-refresh'
     },
     // 关于表单校验时的提示
     fields: {
         // 关于name 属性是username 的校验
         username: {
             validators: {
                 //为空的  提示不能为空
                 notEmpty: {
                     message: '用户名不能为空'
                 },
                 // 字体长度  
                 // 设置最大最小长度 
                 // 不符合的提示信息
                 stringLength: {
                     min: 2,
                     max: 6,
                     message: '用户名长度必须在2到6之间'
                 },
                //  callback 不会在输入的过程中提示,
                 callback: {
                     message:'用户名错误',
                 }
                 
             }
         },
         password: {
             validators: {
                 //为空的  提示不能为空
                 notEmpty: {
                     message: '密码不能为空'
                 },
                 // 密码长度  
                 // 设置最大最小长度 
                 // 不符合的提示信息
                 stringLength: {
                     min: 6,
                     max: 12,
                     message: '密码长度必须是6-12位'
                 },
                 callback:{
                     message:'密码错误',
                 }
             }
         }
     }
 })
 
 
 // 表单校验成功时的回调函数
 $form.on('success.form.bv', function (e) {
     // 表单成功, submit 默认是提交表单, 
     // 需求: 表单验证成功, 发送请求, 验证账号和密码是否注册一致再提交表单
     e.preventDefault();
     
     //使用ajax提交逻辑
     $.ajax({
         url:'/employee/employeeLogin',
         type:'post',
         data:$form.serialize(),
         success:function(res){
             console.log($form.serialize());
            // 如果信息错误
             if(res.success){
                 location.href = 'index.html';
             }
            //  根据信息错误字段 ,改变校验结果, 显示callback
             if(res.error == 1001){
                //  alert('密码错误')
                // 重置验证器结果,
                //  $('#form').data('bootstrapValidator').updateStatus( )
                // (参数1表单项(字段)的name, 参数2改变成什么样的状态, 指定提示如果不写提示全显示)
                 $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
             }
             if(res.error == 1000){
                //  alert('用户名错误')
                 $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
             }
             
         }
     })
 });

 // 表单的重置, reset的按钮是清除掉表单的输入内容
 //  如果此时有提示信息, 重置后, 错误提示和图标还在
 // 需求 : 在点击重置后,重置内容, 也重置表单的校验功能,
 $('[type=reset]').on('click',function(){
    $('#form').data('bootstrapValidator').resetForm();
})



