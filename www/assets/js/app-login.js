$(function() {
  $('#submitSesion').on('click touch', function(event) {
  
    event.preventDefault();       
    
    var dataLogin = $('#formLogin').serialize();

    $.ajax({
      method: 'POST',
      //url: 'http://soporte.policiatijuana.gob.mx:88/Api/Default1/',
      async: true,
      crossDomain: true,
      data: dataLogin,
      cache: false,
      beforeSend: function(){ $("#submitSesion").val('Iniciando...'); },
      success: function(data) {           
        $("body").load("home.html").hide().fadeIn(1500).delay(6000);
        window.location.href = "home.html";
      },
      error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
          this.tryCount++;
          if (this.tryCount <= this.retryLimit) {
            $.ajax(this);
            return;
          }            
          return;
        }  
        $("#submitSesion").val('Iniciar sesión');       
        if (xhr.status == 500) {
          $.snackbar({
            content: "Ocurrió un error, no desistas e inténtalo nuevamente", 
            timeout: 5000
          }); 
        } else {
          $.snackbar({
            content: "Usuario y/o contraseña son invalidas, inténtalo nuevamente", 
            timeout: 5000
          }); 
        }
      }
    });
    return false; 
  });
});