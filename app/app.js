
const info = document.querySelectorAll(".info")
const tabla = document.getElementById("tabla")
const colocar_total= document.getElementById("colocar_total")
const carrito_flotante_total=document.getElementById("carrito_flotante_total")
const carrito_flotante_productos=document.getElementById("carrito_flotante_productos")
const a_pagar=document.querySelector(".a_pagar")
const carrito__ = document.getElementById("carrito")
const close_carrito=document.querySelector(".close_carrito")
let modelo=""
let precio=""
let carrito=[]
let total=0
let cantidad_productos =0
let array_pagar =[]
let array_tabla_precios=[]
let array_tabla_modelos=[]

close_carrito.addEventListener("click",()=>{
    carrito__.classList.replace("carrito_visible","carrito_invisible")
})

function mostrar_carrito(){
    carrito__.classList.replace("carrito_invisible","carrito_visible")

}

function pagar(){
    const lista_nombre = document.querySelectorAll(".td_a")
    const lista_precio= document.querySelectorAll(".td_b")

    for (const iterator of lista_precio) {
        array_tabla_precios.push(iterator.innerHTML)
    }
    for (const iterator of lista_nombre) {
        array_tabla_modelos.push(iterator.innerHTML)
        
    }
    
    for (let i = 0; i < array_tabla_precios.length; i++) {
        array_pagar.push(array_tabla_modelos[i]+"        "+array_tabla_precios[i]+"%0A")
        
    }
    
   
    let enlace = `https://wa.me/584243296202?text=hola quiero comprar: %0A  %0A ${array_pagar}%0A Total: ${total} USD`
    a_pagar.setAttribute("href",enlace)
    array_pagar =[]
    
}

function eliminarElemento(e){
    let vecino = e.target.parentElement.parentElement;
    let cantidad_a_restar= e.target.parentElement.previousElementSibling.textContent
    cantidad_a_restar_limpia=cantidad_a_restar.replace("USD","")
    total-=parseInt(cantidad_a_restar_limpia)
    
   
    vecino.remove()
    console.log(cantidad_a_restar_limpia)
    colocar_total.innerText= "Total: "+total+" USD"
}

for (const elemento of info) {
    const btn_ropa=elemento.querySelector(".btn_ropa")

    btn_ropa.addEventListener("click",()=>{
        modelo=btn_ropa.parentElement.firstElementChild.textContent
        precio=btn_ropa.previousElementSibling.textContent
        precio_limpio = precio.replace("Precio:", "")
        precio_limpioo = precio_limpio.replace("USD", "")

        let icono= document.createElement("i")
        icono.classList.add("bi","bi-trash3-fill", "btn_basura")
        icono.addEventListener("click",eliminarElemento)


        let tr =document.createElement("tr")
        tr.classList.add("tabla_producto")
        let td_a=document.createElement("td")
        td_a.classList.add("td_a")
        let td_b=document.createElement("td")
        td_b.classList.add("td_b")
        let td_c=document.createElement("td")
       
        

        td_a.append(modelo)
        td_b.append(precio_limpioo+ "USD")
        td_c.append(icono)
        tr.append(td_a,td_b,td_c)
        tabla.append(tr)
        cantidad_productos++
        
        total+=parseInt(precio_limpioo)
        colocar_total.replaceChildren("Total: "+total + " USD")
        carrito_flotante_total.replaceChildren(total+" USD")
        carrito_flotante_productos.replaceChildren(cantidad_productos)
       
        })
    }
