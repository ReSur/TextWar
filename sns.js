function shareSNS(s) {
    var   sns_text = '我在 #吐槽战机# 游戏中获得了' + s + '槽值，用微博吐槽来打飞机，快来玩玩看！';
    WB2.anyWhere(function(W){
        W.widget.publish({
            'id' : 'wb_publish',
            'default_text' : sns_text,
            'callback' : function(o) {
            }
        });
    });
}
var sns_string;
WB2.anyWhere(function (W) {
    W.widget.connectButton({
        id: "wb_connect",
        type: '3,2',
        callback: {
            login: function (o) { //登录后的回调函数
                    WB2.anyWhere(function(W){
                        //数据交互
                        W.parseCMD('/statuses/user_timeline.json', function(oResult, bStatus) {
                            if(bStatus) {
                                sns_string = oResult;
                            }
                        }, {
                        }, {
                            method : 'get',
                            cache_time : 30
                        });
                    });
                    gameStart();
            },
            logout: function () { //退出后的回调函数
                alert('logout');
            }
        }
    });
});