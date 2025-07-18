import React from 'react'
import { motion } from "framer-motion";
import { Button } from './ui/button';
import { Link } from 'react-router-dom';


function Hero() {

  const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
  return (
    <section>
       <motion.div
  variants={fadeInVariant}
  initial="hidden"
  animate="visible"
  className="grid sm:grid-cols-2 place-items-center min-h-[500px] p-3 w-full"
>
  <div className="order-2 sm:order-1 min-h-[250px]">
    <motion.h2
      variants={fadeInVariant}
      className="text-6xl sm:text-8xl font-bold uppercase sm:ml-18 sm:pl-12 pl-8"
    >
      Ideas & Learning
    </motion.h2>
    <motion.p
      variants={fadeInVariant}
      className="text-sm mt-4 pl-12"
    >
      Share your thoughts, experiences, and ideas with the world.
    </motion.p>
    <Button className="mt-4 ml-12" size="lg">
      <Link to="/signup">Start Writing</Link>
    </Button>
  </div>

  <div className="order-1 sm:order-2 min-h-[250px]">
    <motion.img
      variants={fadeInVariant}
      src="/Group discussion-pana.png"
      alt="group discussion"
      className="w-full max-w-[550px] h-auto"
    />
  </div>
</motion.div>

    </section>
  )
}

export default Hero