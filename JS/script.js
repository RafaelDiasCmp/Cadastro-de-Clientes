$("#cep").mask("99999-999");

var cliente = [];

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