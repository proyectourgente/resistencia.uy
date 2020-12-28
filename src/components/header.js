import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {FaGithub, FaTwitter} from "react-icons/fa";

const Header = ({ siteTitle }) => (
  <header className="bg-red-700 mb-8">
    <div className="container mx-auto px-5 lg:px-20 py-5">
      <h1 className="w-full flex items-center justify-between text-md">
        <Link
          to="/"
          className="w-2/3 lg:w-100"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
          <div className="flex w-1/3 lg:w-10 text-right">
          <a className="px-2 text-white hover:text-gray-100 visited:text-gray-300" href="https://twitter.com/raulsperoni" target="_blank" title="Twitter" rel="noopener noreferrer">
              <FaTwitter />
          </a>
          <a className="px-2 text-white hover:text-gray-100 visited:text-gray-300" href="https://github.com/raulsperoni/resistencia.uy" target="_blank" title="Github" rel="noopener noreferrer">
              <FaGithub />
          </a>
          </div>
      </h1>

    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
