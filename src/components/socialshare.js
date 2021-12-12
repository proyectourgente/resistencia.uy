import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaWhatsapp } from "react-icons/all";
import { FaRegEnvelope, FaTelegramPlane } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";

const SocialShare = ({ slug, title }) => {
  const url = "https://resistencia.uy/" + slug;

  return (
    <div
      className={
        "flex flex-col text-center w-1/2 md:w-1/3 xl:w-1/4 mx-auto text-gray-600"
      }
    >
      <div className="flex justify-between mt-3 text-lg">
        <div className="hover:text-black">
          <EmailShareButton url={url} subject={title}>
            <FaRegEnvelope />
          </EmailShareButton>
        </div>
        <div className="hover:text-black">
          <FacebookShareButton url={url} quoute={title} hashtag={"proyectourgente"}>
            <FiFacebook />
          </FacebookShareButton>
        </div>
        <div className="hover:text-black">
          <TwitterShareButton
            url={url}
            title={title}
            hashtags={["proyectourgente"]}
          >
            <FiTwitter />
          </TwitterShareButton>
        </div>
        <div className="hover:text-black">
          <WhatsappShareButton url={url} title={title}>
            <FaWhatsapp />
          </WhatsappShareButton>
        </div>
        <div className="hover:text-black">
          <TelegramShareButton url={url} title={title}>
            <FaTelegramPlane />
          </TelegramShareButton>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
