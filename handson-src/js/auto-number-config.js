jQuery.noConflict();

(function(PLUGIN_ID,$) {
    "use strict";
    //プラグインIDの設定
    var conf = kintone.plugin.app.getConfig(PLUGIN_ID);
    //TODO : 既に値が設定されている場合はフィールドに値を設定する
    if(){
    }
 
    //「保存する」ボタン押下時に入力情報を設定する
    $('#submit').click(function() {
        //TODO : ここに設定画面の値を取得し保存する処理
        
    });
     
    //「キャンセル」ボタン押下時の処理
    $('#cancel').click(function() {
        history.back();
    });
})(kintone.$PLUGIN_ID,jQuery);