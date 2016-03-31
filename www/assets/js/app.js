function init() {
    document.addEventListener("deviceready", deviceReady, true);
    delete init;
    console.log("init");
}

function checkPreAuth() {
    console.log("checkPreAuth");
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
        console.log("checkPreAuth ~ Success");
    }
}

function handleLogin() {
    var form = $("#loginForm");
    var u = $("#username", form).val();
    var p = $("#password", form).val();

    console.log("Login");

    if(u != '' && p!= '') {
        $.post("http://localhost:89/actasBackend/session.php",
            { 
                user_name:$('#username', form).val(), 
                password:$('#password', form).val(), 
                rand:Math.random() 
            }, 
            function(data) {
                if(data == 'yes') {
                    window.localStorage["username"] = u;
                    window.localStorage["password"] = p;
                    $.mobile.changePage("home.html", { transition: "slideup"} );

                } else {
                   navigator.notification.alert("Your login failed", function() {});
                }
        });

    } else {
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;//not to post the  form physically
}

function deviceReady() {
    console.log("deviceReady");
    $("#loginPage").on("pageinit",function() {
        console.log("pageinit run");
        $("#loginForm").on("submit",handleLogin);
        checkPreAuth();
    });
    $.mobile.changePage("#loginPage");
}