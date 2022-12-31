//Récupération du numéro de commande dans l'url
const orderId = new URLSearchParams(document.location.search).get("orderId")

//Affichage du numéro de commande
document.getElementById("orderId").innerText = orderId