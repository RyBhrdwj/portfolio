import { motion } from "framer-motion";
import { Code, Database, Smartphone, Cloud } from "lucide-react";

const About = ({ data }) => {
  const { personal, experience } = data;

  const skillCategories = [
    {
      name: "Frontend",
      icon: Code,
      skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      name: "Backend",
      icon: Smartphone,
      skills: ["Typescript", "Node.js", "Express", "JWT", "Passport.js"],
    },
    {
      name: "Databases",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB"],
    },
    {
      name: "DevOps",
      icon: Cloud,
      skills: ["Github Actions", "Docker", "CI/CD", "AWS S3"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      className="py-20 bg-gradient-to-b from-neutral-800 to-neutral-900"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0.5, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            {personal.bio}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Skills Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-white mb-8"
            >
              Skills & Technologies
            </motion.h3>

            <div className="grid gap-6">
              {skillCategories.map((category) => (
                <motion.div
                  key={category.name}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <category.icon className="text-primary-400" size={20} />
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      {category.name}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-neutral-700/50 text-neutral-300 rounded-full text-sm hover:bg-primary-500/20 hover:text-primary-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-white mb-8"
            >
              Experience
            </motion.h3>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative pl-12"
                >
                  {/* Timeline line */}
                  {index !== experience.length - 1 && (
                    <div className="absolute left-4 top-8 w-0.5 h-full bg-gradient-to-b from-primary-500/50 to-primary-500/20"></div>
                  )}

                  {/* Timeline point with glow */}
                  <div className="absolute left-2 top-2 w-4 h-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] border-2 border-white/20"></div>

                  {/* Content card */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-primary-500/30 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h4 className="text-xl font-semibold text-white">
                        {exp.position}
                      </h4>
                      <span className="text-primary-400 text-sm font-medium bg-primary-500/10 px-3 py-1 rounded-full mt-2 md:mt-0">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-secondary-400 font-medium mb-4 text-lg">
                      {exp.company}
                    </p>
                    <p className="text-neutral-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
