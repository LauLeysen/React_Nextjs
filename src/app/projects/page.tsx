'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Navigation } from "../components/nav";

type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/projects.json')
      .then((response) => response.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Head>
        <title>My Projects</title>
        <meta name="description" content="My projects are displayed on this page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="w-full mx-auto mt-16">
          <section id="projects" className="mt-16">
            <h2 className="text-4xl font-bold mb-8 text-white">Projects</h2>
            <p className="mt-4 mb-8 text-zinc-400">Some of the projects are from work and some are on my own time.</p>
            <div className="w-full h-px bg-zinc-800 mb-8"></div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.id} className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group hover:border-zinc-400/50 border-zinc-600">
                  <div className="pointer-events-none">
                    <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
                    <div className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50" style={{ maskImage: 'radial-gradient(240px at 179.5px 24px, white, transparent)' }}></div>
                    <div className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100" style={{ maskImage: 'radial-gradient(240px at 179.5px 24px, white, transparent)' }}></div>
                  </div>
                  <Link href={project.link} className="block h-full">
                    <article className="p-6 md:p-8 flex flex-col h-full">
                      <div className="flex justify-between gap-2 items-center mb-4">
                        <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white drop-shadow-orange">
                          <time dateTime={project.date}>{project.date}</time>
                        </span>
                      </div>
                      <h3 className="z-20 text-xl font-medium duration-1000 lg:text-2xl text-zinc-200 group-hover:text-white font-display mb-4">
                        {project.title}
                      </h3>
                      <p className="z-20 mt-6 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
                        {project.description}
                      </p>
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}