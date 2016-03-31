$(function() {          
  $('#inputSearch').keypress(function(event) {

    if (event.keyCode == 13) {
    
      event.preventDefault();  
      var search = $('#inputSearch').val();
      $(".well-card").css("display", "none");
      $("#well-card").load(location.href + " #well-card>*", "");
      $("#textEmpty").text("");

      if(!$(this).val()) {
        $("#textEmpty").text("Es necesario ingresar una matrícula..."); 
        return false;
      }

      document.activeElement.blur();
      
      $.ajax({
        type:'GET',
        url: "http://soporte.policiatijuana.gob.mx:105/api/oficiales/" + search,
        async: true,
        crossDomain: true,
        dataType: "json",            
        cache: false,
        beforeSend: function(){ $(".loader").fadeOut("200").css("display", "block"); },
        success: function(data) {
          $(".loader").css("display", "none");
          if(data.Data.length > 0) { $(".well-card").css("display", "block"); }
          else { $("#textEmpty").text("No se encontró al oficial"); }
          //bitacoraBusqueda();
        },
        error: function(xhr, textStatus, errorThrown) {
          if (textStatus === 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
              $.ajax(this);
              return;
            }            
            return;
          }
          $(".loader").css("display", "none");
          if (xhr.status === 500) {
            $("#textEmpty").text("No es posible buscar con esa matrícula");
            $.snackbar({
              content: "Ocurrió un error, no desistas e inténtalo nuevamente.", 
              timeout: 5000
            });
          } else {
            $("#textEmpty").text("No es posible buscar con esa matrícula");
            $.snackbar({
              content: "Ocurrió un error, no desistas e inténtalo nuevamente.", 
              timeout: 5000
            });
          }
        }         
      }).then(function(data) {

          var res = data.Data;

          $.each(res, function(key, value) {
            $('#photo').attr('src', "data:image/png;base64," + value.Foto);
            $('.name').append(value.Nombre);
            $('.firstName').append(value.Paterno);
            $('.lastName').append(value.Materno);
            $('.license').append(value.Matricula);
            $('.age').append(value.Edad);
            $('.civilStatus').append(value.EstadoCivil);
            $('.birthday').append(value.FechaNacimiento);
            $('.phone').append(value.Telefono);
            $('.address').append(value.Domicilio);
            $('.birthplace').append(value.EstadoNacimiento + ", " + value.CiudadNacimiento);
            $('.rfc').append(value.Rfc);
            $('.curp').append(value.Curp);
            $('.cuip').append(value.Cuip);
            $('.fired').append(value.TipoSeparacion);
            $('.department').append(value.Dependencia);
            $('.position').append(value.TipoPuesto);
            $('.reason').append(value.Razon);
            $('.status').append(value.Estatus);
            $('.hierarchy').append(value.Jerarquia);
            $('.district').append(value.Distrito);
            $('.dateStart').append(value.FechaInicio);
            $('.dateEnd').append(value.FechaFinal);
          });
      });
    }
  });
});

/*
function bitacoraBusqueda() {

  $.ajax({
      type:'POST',
      //url: "http://soporte.policiatijuana.gob.mx:85/api/HERE/",
      async: true,
      crossDomain: true,         
      cache: false,
      data: {
        'busqueda'  : $('#inputSearch').val(),
        'Imei'      : $('#Imei').val(),
        'Latitude'  : $('#latitude').val(),
        'Longitude' : $('#longitude').val()
      }, 
      success: function (result) {
        alert("Your bookmark has been saved");
      }
  });
}
*/