import React from "react";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import Social from "./social";
import { GiClick } from "react-icons/gi";

function Footer() {
  return (
    <footer className="mt-10 bg-azul text-white font-book">
      {true && <a className="no-underline text-white " href="https://luc.com.uy">
        <div className="mx-auto p-5 w-100 font-sans text-center flex flex-col md:flex-row justify-center align-middle">
          <h1 className="text-center text-polisBlue text-xl md:text-2xl justify-center flex align-middle">
            <span className="mr-2">y vos, </span>
            <span className="font-black">¿QUÉ PENSÁS?</span>
            <GiClick className="text-amarillo mx-2 text-2xl mt-1 animate-bounce" />
          </h1>
          <div className="flex flex-col md:flex-row items-center mt-3 md:mt-0 text-sm md:text-lg font-sans font-medium text-center ">
            <span className="mx-auto">
              Respondé algunas preguntas y conocé en qué grupo de opinión estás.
            </span>
          </div>
        </div>
      </a> }
    </footer>
  );
}

/*Footer.propTypes = {
    siteTitle: PropTypes.string,
}

Footer.defaultProps = {
    siteTitle: ``,
}*/

export default Footer;
