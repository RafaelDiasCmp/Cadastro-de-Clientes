$("#cep").mask("99999-999");

var cliente = [];

function search() {

    var cep = document.getElementById("cep").value;

    var url = `https://viacep.com.br/ws/${cep}/json/`


    $.getJSON(url, (response) => {

        console.log(response);
    });
}


function save() {
    var infoCliente = {

    id: cliente.length + 1,
    primaryName: document.getElementById("primaryName").value,
    secondaryName: document.getElementById("secondaryName").value,
    cep: document.getElementById("cep").value,
};
    
    cliente.push(infoCliente);
    console.log(infoCliente);
}