import React from "react"
import {FaGithub, FaTelegramPlane} from "react-icons/fa";
import Social from "./social";

function Footer() {

    return (
        <footer className="mt-10 bg-azul text-white font-book">
            <div className="mx-auto p-5 w-100 lg:w-2/3 font-sans text-center">
                <a href="https://yofirmo.uy" target="_blank" title="Página de la campaña"
                   rel="noopener noreferrer"
                   className="no-underline text-blanco w-full text-center">
                    <span
                    className="font-black uppercase text-amarillo hover:text-white">yofirmo.uy</span>
                </a>
                <div className="mt-3">
                    <Social/>
                </div>
                <div className="flex flex-col md:flex-row items-center mt-3 text-sm">
                    <div className="flex mx-auto flex-col md:flex-row">
                        <div className="flex mx-auto md:mx-0 md:justify-end items-center">
                            <a className="px-2 text-white hover:text-amarillo"
                               href="https://github.com/raulsperoni/resistencia.uy" target="_blank" title="Github"
                               rel="noopener noreferrer">
                                <FaGithub/>
                            </a>
                            <a href="/proyecto"
                               className="uppercase font-book no-underline text-white hover:text-amarillo hover:font-black text-center">
                                Sobre este proyecto
                            </a>
                        </div>
                        <div className="flex mx-auto md:mx-0 md:justify-start items-center">
                            <a className="px-2 text-white hover:text-amarillo"
                               href="https://t.me/resistenciauy" target="_blank" title="Canal de Telegram"
                               rel="noopener noreferrer">
                                <FaTelegramPlane/>
                            </a>
                            <a href="https://t.me/resistenciauy"
                               className="uppercase font-book block no-underline text-white hover:text-amarillo text-center"
                               target="_blank" title="Canal de Telegram"
                               rel="noopener noreferrer">canal de telegram</a>
                        </div>
                    </div>
                </div>


            </div>

        </footer>
    )
}

/*Footer.propTypes = {
    siteTitle: PropTypes.string,
}

Footer.defaultProps = {
    siteTitle: ``,
}*/

export default Footer
