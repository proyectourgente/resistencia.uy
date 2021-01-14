import {Link} from "gatsby"
import PropTypes from "prop-types"
import React, {useState} from "react"
import {FaFacebook, FaGithub, FaInstagram, FaTelegramPlane, FaTwitter, FaYoutube} from "react-icons/fa";
import logo from "../images/LOGO_BANDERA_BLANCO.png";

function Social() {

    return (
        <div className="flex flex-grow justify-center px-20 xl:px-0">
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
    )
}

/*Footer.propTypes = {
    siteTitle: PropTypes.string,
}

Footer.defaultProps = {
    siteTitle: ``,
}*/

export default Social
