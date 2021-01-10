import React from "react"
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {FaTelegram, FaWhatsapp} from "react-icons/all"
import { FaRegEnvelope } from "react-icons/fa"
import { FiLinkedin, FiTwitter, FiFacebook } from "react-icons/fi"

const SocialShare = ({slug, color, title}) => {

  const url = 'https://resistencia.uy/'+ slug

  return (
    <div className={"mt-5 mb-5 flex justify-between w-2/3 md:w-1/3 xl:w-1/4 mx-auto text-"+color}>
        <span>Compartir:</span>
      <EmailShareButton url={url} subject={title}><FaRegEnvelope/></EmailShareButton>
      <FacebookShareButton url={url} quoute={title} hashtag={'yofirmo'}><FiFacebook/></FacebookShareButton>
      <TwitterShareButton url={url} title={title} via={'yofirmouy'} hashtags={['yofirmo']} related={['yofirmouy','raulsperoni']}><FiTwitter/></TwitterShareButton>
      <WhatsappShareButton url={url} title={title}><FaWhatsapp/></WhatsappShareButton>
        <TelegramShareButton url={url} title={title}><FaTelegram/></TelegramShareButton>
    </div>
  )


}

export default SocialShare
