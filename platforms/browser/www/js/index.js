function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
    var db = openDatabase('naracrm', '1.0', 'naracrm', 1024*1024);
    db.transaction(populateDB, failed, success);
    db.transaction(successDB, failed, success);
}
function populateDB(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY, email VARCHAR, password VARCHAR, login CHAR)");
}
function successDB(tx) {
    tx.executeSql("SELECT * FROM members WHERE login = 'yes'", [], querySuccess, failed);
}
function querySuccess(tx, results) {
    var rowid = results.rows.item(0).id;
    var email = results.rows.item(0).email;
    var password = results.rows.item(0).password;
    var dataString="email="+email+"&password="+password+"&login=";
    var url="https://naracodinglabs.com/cloud/app/login.php";
    if($.trim(email).length>0 & $.trim(password).length>0) {
        $.ajax({
            type: "POST",
            url: url,
            data: dataString,
            crossDomain: true,
            cache: false,
            beforeSend: function(){ $("#login").html('Connecting...');},
            success: function(data){
                if(data=="success") {
                    alert("Login Successful");
                    window.location.href = "calls.html";
                } else {
                    alert("Login error");
                    $("#login").html('Login');
                }
            }
        });
    }return false;
}
$("#login").click(function(){
    var email=$("#email").val();
    var password=$("#password").val();
    var dataString="email="+email+"&password="+password+"&login=";
    var url="https://naracodinglabs.com/cloud/app/login.php";
    if($.trim(email).length>0 & $.trim(password).length>0) {
        $.ajax({
            type: "POST",
            url: url,
            data: dataString,
            crossDomain: true,
            cache: false,
            beforeSend: function(){ $("#login").html('Connecting...');},
            success: function(data){
                if(data=="success") {
                    var db = openDatabase('naracrm', '1.0', 'naracrm', 1024*1024);
                    db.transaction(insertoDB, failed, success);
                    alert("Login Successful");
                    window.location.href = "calls.html";
                } else {
                    alert("Login error");
                    window.location.href = "index.html";
                }
            }
        });
    }return false;
});
function insertoDB(tx) {
    tx.executeSql("INSERT INTO members (email, password, login) VALUES ( ?, ?, 'yes')", [$("#email").val(), $("#password").val()]);
}
function success() {
    
}
function failed() {
    
}
$("#logout").click(function(){
    var db = openDatabase('naracrm', '1.0', 'naracrm', 1024*1024);
    db.transaction(deleteDB, failed, success);
    window.location.href = "index.html";
});
function deleteDB(tx) {
    tx.executeSql("DROP TABLE IF EXISTS members");
}