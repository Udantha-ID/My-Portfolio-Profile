import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particleOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 50, density: { enable: true, area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      move: { enable: true, speed: 0.6, direction: "none", outMode: "bounce" },
    },
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="relative w-full xl:w-[1350px] h-[500px] xl:h-[720px] xl:mt-10 flex xl:flex-row gap-2 overflow-hidden px-100">
      {/* Background Animation */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Contact Form Section */}
      <motion.div
        variants={slideIn("left", "tween", 0.3, 1)}
        className="flex-1 xl:flex-[0.6] bg-gradient-to-r from-blue-900 to-black-800 p-10 rounded-xl shadow-xl transform transition-all hover:scale-105 z-10 relative"
      >
        <p className={`${styles.sectionSubText} text-yellow-400`}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} text-white font-extrabold text-3xl`}>Contact</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-4">
          {/* Name Input */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 text-lg">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-gray-900 py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-none font-medium transition-all focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
          </label>

          {/* Email Input */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 text-lg">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-gray-900 py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-none font-medium transition-all focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
          </label>

          {/* Message Input */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 text-lg">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              className="bg-gray-900 py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-none font-medium transition-all focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-800 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-blue-500 transform transition-all hover:scale-105"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      {/* Earth Canvas Section */}
      <motion.div
        variants={slideIn("right", "tween", 0.3, 1)}
        className="xl:flex-1 xl:h-auto md:h-[600px] h-[400px] w-full bg-gradient-to-r from-black-800 to-blue-700 rounded-xl shadow-lg transform transition-all hover:scale-105 z-10 relative"
      >
        {/* <EarthCanvas /> */}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
