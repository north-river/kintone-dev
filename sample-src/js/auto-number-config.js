jQuery.noConflict();

(function(PLUGIN_ID, $) {
    "use strict";
    // プラグインIDの設定
    var conf = kintone.plugin.app.getConfig(PLUGIN_ID);
    //既に値が設定されている場合はフィールドに値を設定する
    if (conf) {
        $('#num-field').val(conf['numCode']);
        $('#string-format').val(conf['stFormat']);
        $('#date-format').val(conf['dateFormat']);
    }
    //「保存する」ボタン押下時に入力情報を設定する
    $('#submit').click(function() {
        var config = [];
        var numCode = $('#num-field').val();
        var stFormat = $('#string-format').val();
        var dateFormat = $('#date-format').val();
        if (!numCode) {
            alert("必須項目が入力されていません");
            return;
        }
        config['numCode'] = numCode;
        config['stFormat'] = stFormat;
        config['dateFormat'] = dateFormat;
        kintone.plugin.app.setConfig(config);
    });
    //「キャンセル」ボタン押下時の処理
    $('#cancel').click(function() {
        history.back();
    });
})(kintone.$PLUGIN_ID, jQuery);
