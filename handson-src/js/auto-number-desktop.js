jQuery.noConflict();

(function(PLUGIN_ID,$) {
    "use strict";
    //設定値を取得する
    var config = kintone.plugin.app.getConfig(PLUGIN_ID);
    var numCode = config['numCode'];
    var stFormat = config['stFormat'];
    var dateFormat = config['dateFormat'];
    var eventsShow = ['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'];
    kintone.events.on(eventsShow, function(event) {
        var record = event.record;
        if (('app.record.create.show').indexOf(event.type) >= 0) {
            //TODO : フィールドコード書き換え
            record['No']['value'] = "";
        }
        //TODO : フィールドコード書き換え
        record['No']['disabled'] = true;
        return event;
    });
    // レコード追加画面の保存前処理
    kintone.events.on('app.record.create.submit', function(event) {
        var recNo = 1;
        var record = event.record;
        var m = moment();
        var params = {
                        'app': kintone.app.getId(),
                        'query': 'limit 1',
                        'fields': ['$id']
                     };
        return kintone.api('/k/v1/records', 'GET', params).then(function(resp) {
            if (resp.records.length > 0) {
                recNo = parseInt(resp.records[0]['$id'].value, 10) + 1;
            }else if(resp && resp.records.length == 0){
                recNo = 1;
            }else {
                event.error = '見積番号が取得できません。';
            }
            //TODO : 見積もりフォーマット書き換え
            var autoEstNo = m.format('YYYYMMDD') + "-E" + ('000' + recNo).slice(-3);
            alert("見積番号 " + autoEstNo + " を登録します");
            //TODO : フィールドコード書き換え
            record['No']['value'] = autoEstNo;
            return event;
        }, function(resp) {
            //TODO : フィールドコード書き換え
            record['No'].error = '見積番号が取得できません。';
            return event;
        });
    });
})(kintone.$PLUGIN_ID,jQuery);