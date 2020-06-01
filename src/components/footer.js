import React from "react"
import { FaGithub, FaLinkedin, FaChessKnight } from "react-icons/fa"

const Footer = () => (
  <div className="footer footer-contact">
    <span className="block">
      <FaGithub />
      <a href="https://github.com/julianmclain"> julianmclain</a>
    </span>
    <span className="block footer-contact">
      <FaLinkedin />
      <a href="https://www.linkedin.com/in/julianrmclain/"> LinkedIn</a>
    </span>
  </div>
)

export default Footer
