var boiGordo, vacaGorda, milho, leite, soja, suino, frango,bezerro;
fazer_cotacao();

$(document).on('click','#btn-boi-gordo',async function(){
    console.log(boiGordo);
    Swal.fire({
        title:"Boi Gordo",
        html:boiGordo,
        width:'100%'        
    })
});
$(document).on('click','#btn-vaca-gorda',async function(){
    Swal.fire({
        title:"Vaca Gorda",
        html:vacaGorda        
    })
});
$(document).on('click','#btn-frango',async function(){
    Swal.fire({
        title:"Frango",
        html:frango        
    })
});
$(document).on('click','#btn-leite',async function(){
    Swal.fire({
        title:"Leite",
        html:leite        
    })
});
$(document).on('click','#btn-bezerro',async function(){
    Swal.fire({
        title:"Bezerro",
        html:bezerro        
    })
});
$(document).on('click','#btn-soja',async function(){
    Swal.fire({
        title:"Soja",
        html:soja        
    })
});
$(document).on('click','#btn-milho',async function(){
    Swal.fire({
        title:"Milho",
        html:milho        
    })
});
$(document).on('click','#btn-suino',async function(){
    Swal.fire({
        title:"Suíno",
        html:suino        
    })
});
async function fazer_cotacao(){
    var link =  $('meta[name="cotacao"]').attr('content');
    return await fetch(link)
            .then((result)=>{
                if(result.ok){
                    return result.json();
                }else{
                    return false;
                }
            }).then((resposta)=>{
                boiGordo = resposta.boiGordo;
                vacaGorda = resposta.vacaGorda;
                milho = resposta.milho;
                soja = resposta.soja;
                suino = resposta.suino;
                frango = resposta.frango;
                bezerro = resposta.bezerro;
                leite = resposta.leite;
                return resposta;

            })
}