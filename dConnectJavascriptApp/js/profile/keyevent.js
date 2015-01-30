/**
 keyevent.js
 Copyright (c) 2015 NTT DOCOMO,INC.
 Released under the MIT license
 http://opensource.org/licenses/mit-license.php
 */
 
/** 
 * Key Event
 */
function showKeyEvent(serviceId) {
    initAll();
    setTitle("Key Event Profile(Event)");

    var sessionKey = currentClientId;
    var btnStr = getBackButton('Device Top','doKeyEventBack', serviceId, sessionKey);
    reloadHeader(btnStr);
    reloadFooter(btnStr);

    var str = "";
        str += '<li><a href="javascript:showDownEvent(\'' + serviceId + '\');" >Key Event(onDown)</a></li>';
        str += '<li><a href="javascript:showUpEvent(\'' + serviceId + '\');" >Key Event(onUp)</a></li>';
    reloadList(str);
}

/**
 * Show Down Event
 *
 * @param {String}serviceId サービスID
 */
function showDownEvent(serviceId){
    initAll();
    setTitle("Down Event");

    var sessionKey = currentClientId;

    var btnStr = getBackButton('Device Top', 'doDownEventBack', serviceId, sessionKey);
    reloadHeader(btnStr);
    reloadFooter(btnStr);
    
    var str = "";
    str += '<form name="downForm">';
    str += 'Down<br>';
    str += '<input type="text" id="idD" width="100%">';
    str += '<input type="text" id="configD" width="100%">';
    str += '</form>';
    reloadContent(str);

    doDownRegist(serviceId, sessionKey);
    dConnect.connectWebSocket(sessionKey, function(errorCode, errorMessage) {});
}

/**
 * Show Up Event
 *
 * @param {String}serviceId サービスID
 */
function showUpEvent(serviceId){
    initAll();
    setTitle("Up Event");

    var sessionKey = currentClientId;

    var btnStr = getBackButton('Device Top', 'doUpEventBack', serviceId, sessionKey);
    reloadHeader(btnStr);
    reloadFooter(btnStr);
    
    var str = "";
    str += '<form name="upForm">';
    str += 'Up<br>';
    str += '<input type="text" id="idU" width="100%">';
    str += '<input type="text" id="configU" width="100%">';
    str += '</form>';
    reloadContent(str);

    doUpRegist(serviceId, sessionKey);
    dConnect.connectWebSocket(sessionKey, function(errorCode, errorMessage) {});
}

/**
 * Backボタン
 *
 * serviceId サービスID
 * sessionKey セッションKEY
 */
function doKeyEventBack(serviceId, sessionKey){
    searchSystem(serviceId);
}

/**
 * Backボタン
 *
 * serviceId サービスID
 * sessionKey セッションKEY
 */
function doDownEventBack(serviceId, sessionKey){
    doDownUnregister(serviceId, sessionKey);
    showKeyEvent(serviceId);
}

/**
 * Backボタン
 *
 * serviceId サービスID
 * sessionKey セッションKEY
 */
function doUpEventBack(serviceId, sessionKey){
    doUpUnregister(serviceId, sessionKey);
    showKeyEvent(serviceId);
}

/**
 * Down Event Regist
 */
function doDownRegist(serviceId, sessionKey) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile("keyevent");
    builder.setAttribute("ondown");
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.setSessionKey(sessionKey);
    var uri = builder.build();
    if (DEBUG) console.log("Uri: " + uri);

    dConnect.addEventListener(uri,function(message) {
        // イベントメッセージが送られてくる
        if(DEBUG) console.log("Event-Message:"+message)
        
        var json = JSON.parse(message);
        if (json.keyevent) {
            $('#idD').val("KeyID: "+json.keyevent.id);
            $('#configD').val("config: "+json.keyevent.config);
        }
    }, null, function(errorCode, errorMessage){
        alert(errorMessage);
    });
}

/**
 * Up Event Regist
 */
function doUpRegist(serviceId, sessionKey) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile("keyevent");
    builder.setAttribute("onup");
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.setSessionKey(sessionKey);
    var uri = builder.build();
    if (DEBUG) console.log("Uri: " + uri);

    dConnect.addEventListener(uri,function(message) {
        // イベントメッセージが送られてくる
        if(DEBUG) console.log("Event-Message:"+message)
        
        var json = JSON.parse(message);
        if (json.keyevent) {
            $('#idU').val("KeyID: "+json.keyevent.id);
            $('#configU').val("config: "+json.keyevent.config);
        }
    }, null, function(errorCode, errorMessage){
        alert(errorMessage);
    });
}

/**
 * Down Event Unregist
 */
function doDownUnregister(serviceId, sessionKey) {

    var builder = new dConnect.URIBuilder();
    builder.setProfile("keyevent");
    builder.setAttribute("ondown");
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.setSessionKey(sessionKey);
    var uri = builder.build();
    if (DEBUG) console.log("Uri : "+uri);

    dConnect.removeEventListener(uri, null, function(errorCode, errorMessage){
        alert(errorMessage);
    });
}

/**
 * Up Event Unregist
 */
function doUpUnregister(serviceId, sessionKey) {

    var builder = new dConnect.URIBuilder();
    builder.setProfile("keyevent");
    builder.setAttribute("onup");
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.setSessionKey(sessionKey);
    var uri = builder.build();
    if (DEBUG) console.log("Uri : "+uri);

    dConnect.removeEventListener(uri, null, function(errorCode, errorMessage){
        alert(errorMessage);
    });
}
