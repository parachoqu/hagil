$(document).on('click','#btn-search',async function(){
    //alert('Hello Word!');
    
    await Swal.fire({
        title:'Pesquisa',
        input:'text',
        inputAttributes: {
            autocapitalize: 'off',
            id:'input-search'
        },        
        showConfirmButton:true,
        showDenyButton:true,
        confirmButtonText:"<i class='fa fa-search'></i>Pesquisar...",
        denyButtonText:'Sair',
        showLoaderOnConfirm:true,        
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm:(data)=>{
            
                var data = $('#input-search').val();
                var link = $('meta[name="search-link"]').attr('content')+"?data="+data;
                Swal.showLoading();
                return fetch(link)
                .then((result)=>{
                    if(result.ok){
                        return result.json();
                    }else{
                        return false;
                    }
                }).then((response)=>{
                    Swal.hideLoading();
                    var resultado;
                    if(response.html=="<ul id='list-result'><ul>"){
                        resultado = "Nenhum resultado encontrado."
                    }else{
                        resultado  = response.html
                    }
                    return resultado;                    
                    //$('.modal-body').html(response.html);
                    //$('#modal-title').html("Resultado");
                    //return true;
                });
               
            
        }

    }).then((result) => {
        
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Resultado',
                html:result.value,
                icon:'confirm',
            });
        }
      })
  
    
});


