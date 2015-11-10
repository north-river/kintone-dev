jQuery.noConflict();

(function(PLUGIN_ID, $) {
    "use strict";
    var config = kintone.plugin.app.getConfig(PLUGIN_ID);
    var numCode = config['numCode'];
    var stFormat = config['stFormat'];
    var dateFormat = config['dateFormat'];
    // レコード追加、編集画面の表示前処理
    var eventsShow = ['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'];
    kintone.events.on(eventsShow, function(event) {
        var record = event.record;
        if (('app.record.create.show').indexOf(event.type) >= 0) {
            record[numCode]['value'] = "";
        }
        record[numCode]['disabled'] = true;
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
            if (resp.records[0] !== null) {
                recNo = parseInt(resp.records[0]['$id'].value, 10) + 1;
            }else {
                event.error = '見積番号が取得できません。';
            }
            var autoEstNo = "";
            //自動採番を見積番号に設定する
            if (dateFormat === "指定しない") {
                autoEstNo = stFormat + recNo;
            }else {
                autoEstNo = m.format(dateFormat) + stFormat + recNo;
            }
            alert("見積番号 " + autoEstNo + " を登録します");
            record[numCode]['value'] = autoEstNo;
            return event;
        }, function(resp) {
            record[numCode].error = '見積番号が取得できません。';
            return event;
        });
    });
})(kintone.$PLUGIN_ID, jQuery);
