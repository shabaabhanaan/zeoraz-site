"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Cloud, Smartphone, Sparkles, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Product & Custom Software Engineering",
    description: "Full-lifecycle engineering of web applications, SaaS platforms, and enterprise software designed for high scalability and resilience.",
    tags: ["React / Next.js", "Node.js", "Python", "Microservices"],
  },
  {
    icon: Cpu,
    title: "Enterprise AI & Machine Learning",
    description: "Custom AI agents, LLM integrations, automated workflow intelligence, and predictive analytics tailored to business operations.",
    tags: ["Generative AI", "PyTorch / TensorFlow", "NLP", "MLOps"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Infrastructure",
    description: "Architecting cloud-native infrastructure, CI/CD pipelines, container orchestration, and serverless edge deployments.",
    tags: ["AWS / Azure / GCP", "Kubernetes", "Docker", "Terraform"],
  },
  {
    icon: Smartphone,
    title: "Mobile & Cross-Platform Applications",
    description: "High-performance native and cross-platform mobile experiences with fluid UI/UX, offline syncing, and enterprise security.",
    tags: ["React Native", "iOS & Android", "GraphQL", "REST APIs"],
  },
];

interface ServicesGridProps {
  onTalkToUs: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onTalkToUs }) => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
          >
            End-to-End Engineering Expertise <br className="hidden sm:inline" />
            <span className="text-[#2563eb]">Built Around Your Needs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed"
          >
            From initial concept to global enterprise deployment, we provide dedicated engineering teams and modern technology capabilities.
          </motion.p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-[#2563eb]/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-900 group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb] flex items-center justify-center mb-6 shadow-sm transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#2563eb] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onTalkToUs}
                    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                  >
                    Discuss Solution <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
