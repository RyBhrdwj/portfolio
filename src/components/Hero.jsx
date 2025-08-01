import { motion } from "framer-motion";
import {
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
} from "lucide-react";

const Hero = ({ data }) => {
  const { personal } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Geometric backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1))',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1))',
          }}
        >
          {/* First grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0',
            }}
          />

          {/* Second (offset) grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: '20px 20px',
            }}
          />
        </div>
      </div>


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {personal.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl md:leading-tight font-bold mb-6 bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent"
        >
          {personal.name}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl text-primary-400 mb-4 font-light"
        >
          {personal.title}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {personal.subtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center flex-wrap gap-6 mb-16"
        >
          {Object.entries(personal.social).map(([platform, url]) => {
            const Icon = socialIcons[platform];
            if (!Icon) return null;

            return (
              <motion.a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary-500/20 hover:scale-110 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
          <motion.a
            href={`mailto:${personal.email}`}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary-500/20 hover:scale-110 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
          </motion.a>

          {/* CV Button */}
          <motion.a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-500 bg-transparent hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:text-gray-900 cursor-pointer hover:border-transparent ml-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={18} />
            <span className="text-sm">View CV</span>
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <p className="text-neutral-400 mb-4">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-neutral-400"
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
