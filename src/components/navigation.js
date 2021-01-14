import React from "react"
import {FaArrowLeft, FaArrowRight, FaFacebook, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";
import * as PropTypes from "prop-types";
import {Link} from "gatsby";
import SocialShare from "./socialshare";
import Layout from "./layout";

function siguienteArticulo(lista, actual) {
    let cantidad_articulos = lista.length
    let posicion_actual = lista.indexOf(actual, 0)
    let posicion_siguiente = posicion_actual + 1
    if (posicion_siguiente < cantidad_articulos) {
        return "/".concat(lista[posicion_siguiente].toString())
    } else {
        return "/"
    }
}

function anteriorArticulo(lista, actual) {
    let posicion_actual = lista.indexOf(actual, 0)
    let posicion_anterior = posicion_actual - 1
    if (posicion_anterior >= 0) {
        return "/".concat(lista[posicion_anterior].toString())
    } else {
        return "/"
    }
}


function Navigation({lista, actual, tituloActual}) {

    return (
        <div className="flex mx-auto mb-5 lg:mb-0">
            <Link
                to={anteriorArticulo(lista, actual)}
                className="w-1/4 flex flex-col text-center justify-center no-underline text-azul">
                <span>Anterior</span><span className="mx-auto hover:bg-amarillo hover:border-amarillo hover:text-azul bg-azul text-white rounded-full border border-azul w-7 h-7 flex items-center justify-center"><FaArrowLeft/></span>
            </Link>
            <div className="w-2/4">
            <SocialShare title={tituloActual} slug={actual}/>
            </div>
            <Link
                to={siguienteArticulo(lista, actual)}
                className="w-1/4 flex flex-col text-center justify-center no-underline text-azul">
                <span>Siguiente</span><span className="mx-auto hover:bg-amarillo hover:border-amarillo hover:text-azul bg-azul text-white rounded-full border border-azul w-7 h-7 flex items-center justify-center"><FaArrowRight/></span>
            </Link>

        </div>
    )
}

Navigation.propTypes = {
    lista: PropTypes.array.isRequired,
    actual: PropTypes.number.isRequired,
    tituloActual: PropTypes.string.isRequired
}

export default Navigation
