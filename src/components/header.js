import {Link} from "gatsby"
import PropTypes from "prop-types"
import React, {useState} from "react"
import logo from "../images/LOGO_BANDERA_BLANCO.png";
import Social from "./social";

function Header({siteTitle}) {
    const [isExpanded, toggleExpansion] = useState(false)

    return (
        <header>
            <nav className="flex items-center justify-between flex-wrap bg-azul px-8 lg:px-20 py-6">
                <div className="flex items-center flex-no-shrink text-white  xl:mr-0 items-center">
                    <Link
                        to="/"
                        className="font-sans font-black text-amarillo uppercase text-md md:text-2xl"
                        style={{
                            color: `#FFCB05`,
                            textDecoration: `none`,
                        }}
                    >
                        {siteTitle}
                    </Link>
                </div>
                <div className="block xl:hidden">
                    <button onClick={() => toggleExpansion(!isExpanded)}
                            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-amarillo hover:border-amarillo">
                        <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path fill="white" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                        </svg>
                    </button>
                </div>
                <div
                    className={`${isExpanded ? `block` : `hidden`} w-full xl:w-1/3 block flex-grow xl:flex xl:items-center xl:w-auto`}>
                    <div className="flex-grow"></div>
                    <div className="flex text-sm justify-around flex-wrap">
                        <a href="/proyecto"
                           className="block mt-6 text-lg xl:inline-block xl:mt-0 font-sans font-medium no-underline text-white hover:text-amarillo hover:font-black xl:mr-4 w-full text-center">
                            Sobre este proyecto
                        </a>
                       

                    </div>
                   
                   
                </div>
            </nav>
        </header>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
