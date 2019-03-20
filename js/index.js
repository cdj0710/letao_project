 // 基于准备好的dom，初始化echarts实例
 var myChart = echarts.init(document.querySelector('.content_main .pull-left'));

 // 指定图表的配置项和数据
 var option = {
     title: {
         text: '2017年注册人数'
     },
     tooltip: {},
     legend: {
         data:['人数','销量']
     },
     xAxis: {
         data: ["1月","2月","3月","4月","5月","6月"]
     },
     yAxis: {},
     series: [{
         name: '人数',
         type: 'bar',
         data: [115, 20, 369, 100, 190, 20]
     },{
        name: '销量',
        type: 'bar',
        data: [80, 120, 300, 190, 190, 20]
    }]
 };

 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);

 var myChart2 = echarts.init(document.querySelector('.content_main .pull-right'));
 var option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2019年3月',
        x:'right'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['阿迪达斯','匡威','Nike','回力','新百伦']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'阿迪达斯'},
                {value:310, name:'匡威'},
                {value:234, name:'Nike'},
                {value:135, name:'回力'},
                {value:1548, name:'新百伦'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
 myChart2.setOption(option2);
