import React from "react"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {Link} from "gatsby";
import * as PropTypes from "prop-types";

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


function Navigation({lista, actual, seccion, capitulo}) {

    return (
        <div className="flex mx-auto mb-5 lg:mb-0 text-gray-500">
            <Link
                to={anteriorArticulo(lista, actual)}
                className="w-1/4 flex flex-col text-center justify-center no-underline  text-gray-600">
                <span>Anterior</span><span
                className="mx-auto hover:bg-gray-800 hover:text-gray-200  text-gray-600  rounded-full border  w-7 h-7 flex items-center justify-center"><FaArrowLeft/></span>
            </Link>
            <div className="w-2/4 flex text-center flex-col md:flex-row text-gray-500 justify-center items-center">
                <span>SECCIÓN <b>{seccion}</b></span>
                <span className="hidden md:block text-xl mx-3 "> > </span>
                <span> CAPÍTULO <b>{capitulo}</b></span>
                <span className="hidden md:block text-xl mx-3 "> > </span>

                <span> ARTÍCULO <b>{actual}</b></span>
            </div>
            <Link
                to={siguienteArticulo(lista, actual)}
                className="w-1/4 flex flex-col text-center justify-center no-underline text-gray-600">
                <span>Siguiente</span><span
                className="mx-auto hover:bg-gray-800 hover:text-gray-200  text-gray-600 rounded-full border  w-7 h-7 flex items-center justify-center"><FaArrowRight/></span>
            </Link>

        </div>
    )
}

Navigation.propTypes = {
    lista: PropTypes.array.isRequired,
    actual: PropTypes.string.isRequired,
    seccion: PropTypes.string.isRequired,
    capitulo: PropTypes.string.isRequired
}

export default Navigation
