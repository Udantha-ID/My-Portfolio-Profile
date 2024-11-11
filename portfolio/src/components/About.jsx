import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const NewServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[300px] w-full">
    <motion.div
      variants={fadeIn("left", "spring", index * 0.5, 0.65)}
      className="w-full green-pink p-[1px] rounded-[15px] shadow-card"
    >
      <div
        options={{
          max: 25,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[15px] py-6 px-14 min-h-[300px] flex justify-center items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-20 h-20 object-contain"
        />

        <h3 className="text-white text-[22px] font-semibold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Who I Am</p>
        <h2 className={styles.sectionHeadText}>Professional Background</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[18px] max-w-3xl leading-[35px]"
      >
        With a deep understanding of software engineering, I specialize in full-stack development 
        using modern tools like TypeScript, React, Node.js, and Three.js. I focus on building 
        innovative solutions that empower businesses and individuals. My approach combines technical 
        proficiency with a commitment to creating seamless user experiences, ensuring that every 
        application I work on not only functions well but also excels in design and usability. 
        Together, we can turn your ideas into cutting-edge digital products.
      </motion.p>

      <div className="mt-24 flex justify-start gap-12 flex">
        {services.map((service, index) => (
          <NewServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
