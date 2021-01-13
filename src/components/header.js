import {Link} from "gatsby"
import PropTypes from "prop-types"
import React, {useState} from "react"
import {FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";
import {FaTelegram} from "react-icons/all";
import logo from "../images/LOGO_BANDERA_BLANCO.png";

function Header ({siteTitle}) {
    const [isExpanded, toggleExpansion] = useState(false)

    return (
        <header className="mb-8">
            <nav className="flex items-center justify-between flex-wrap bg-azul px-8 lg:px-20 py-6">
                <div className="flex items-center flex-no-shrink text-white w-2/3 mr-6 xl:mr-0 items-center">
                    <a target="_blank" title="Web oficial de la Campaña" className="w-20 md:w-24 mr-5"
                       href={'https://yofirmo.uy'}>
                        <img alt={'Logo Campaña oficial YoFirmoUy'}
                             src={logo}/>
                    </a>
                    <Link
                        to="/"
                        className="font-black text-amarillo uppercase w-1/3 md:w-2/3 text-md md:text-xl"
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
                <div className={`${isExpanded ? `block` : `hidden`} w-full xl:w-1/3 block flex-grow xl:flex xl:items-center xl:w-auto`}>
                    <div className="flex-grow"></div>
                    <div className="flex text-sm uppercase font-book justify-around flex-wrap">
                        <a href="#"
                           className="block mt-6 xl:inline-block xl:mt-0 no-underline text-white hover:text-amarillo xl:mr-4 w-full text-center">
                            Sobre este proyecto
                        </a>
                        <a href="https://yofirmo.uy" target="_blank" title="Página de la campaña"
                           rel="noopener noreferrer"
                           className="block mt-2 xl:inline-block xl:mt-0  no-underline text-white hover:text-amarillo xl:mr-4 w-full text-center">
                            yofirmo.uy
                        </a>

                    </div>
                    <div className="flex-grow"></div>

                    <div className="flex mt-4 xl:mt-0 flex-grow justify-center px-20 xl:px-0">
                        <a className="px-2 text-white hover:text-amarillo"
                           href="https://www.facebook.com/reafirmatusderechos" target="_blank" title="Facebook"
                           rel="noopener noreferrer">
                            <FaFacebook/>
                        </a>
                        <a className="px-2 text-white hover:text-amarillo"
                           href="https://www.instagram.com/yofirmo.uy" target="_blank" title="Instagram"
                           rel="noopener noreferrer">
                            <FaInstagram/>
                        </a>
                        <a className="px-2 text-white hover:text-amarillo"
                           href="https://bit.ly/3n0bMsK" target="_blank" title="Youtube"
                           rel="noopener noreferrer">
                            <FaYoutube/>
                        </a>
                        <a className="px-2 text-white hover:text-amarillo"
                           href="https://twitter.com/Yofirmouy" target="_blank" title="Twitter"
                           rel="noopener noreferrer">
                            <FaTwitter/>
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
