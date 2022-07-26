import React, { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

const Contact = () => {
  const form = useRef();
  const [done, setDone] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_e88llwg",
        "template_o8if03g",
        form.current,
        "4KZ2RkUVoAsfhjF-B"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
          form.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="contact-form" id="contact">
      <div className="w-left">
        <div className="awesome">
          Get in Touch
          <span>Contact me</span>
          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
          ></div>
        </div>
      </div>
      {/* right side form */}
      <div className="c-right">
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="user_name"
            className="user"
            placeholder="Name"
          />
          <input
            type="email"
            name="user_email"
            className="user"
            placeholder="Email"
          />
          <textarea name="message" className="user" placeholder="Message" />
          <input type="submit" value="Send" className="button" id="c-button" />
          <span>{done && "Thanks for Contacting me"}</span>
          <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}
          ></div>
        </form>
      </div>

      {/* footer */}
      <div className="  foot" id="footer">
        <div className="col-lg-4 ">
          <Link to="/">
            <img
              src="/images/logo.png"
              style={{ width: "200px", marginTop: "15px" }}
            />
          </Link>
          <p style={{ color: "white", marginTop: "20px" }}>
            shopIT - The Multivendor Store
          </p>
          <p style={{ color: "white" }}>
            Make it easy to do business anywhere in the era of digital economy.
          </p>
        </div>
        <div className="col-lg-4  center-foot">
          <h2 style={{ color: "#f85706d3" }}>Email</h2>
          <p style={{ color: "white" }}>techdev45@outlook.com</p>

          <h2 style={{ color: "#f85706d3" }}>Phone</h2>
          <p style={{ color: "white" }}>+923334455666</p>
        </div>
        <div className="col-lg-4 payment-type">
          <h2 style={{ color: "#f85706d3" }}>Payment Method</h2>
          <img src="/images/visa.png" style={{ width: "55px" }} />
          <img src="/images/mastercard.png" style={{ width: "55px" }} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
