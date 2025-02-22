import type { ReactElement } from "react";
import { DiMsqlServer } from "react-icons/di";
import { FaCode, FaReact } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { MdCss, MdHtml, MdJavascript } from "react-icons/md";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiPrisma, SiReactrouter, SiRedux } from "react-icons/si";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";

interface Project {
  title: string;
  stack: ReactElement[];
  href?: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    title: "AccionMFB Policy Portal",
    stack: [
      <FaReact title="React" />,
      <RiTailwindCssFill title="Tailwinscss" />,
      <RiNextjsFill title="Nextjs" />,
      <DiMsqlServer title="MSSQL" />,
      <SiPrisma title="Prisma" />,
    ],
    href: "",
    description: "AccionMFB policy platform",
  },
  {
    title: "TinkerPal Web",
    stack: [
      <FaReact title="React" />,
      <RiTailwindCssFill title="Tailwinscss" />,
      <SiReactrouter title="React Router" />,
    ],
    description: "Connecting devs with client",
    href: "",
  },
  {
    title: "Octopus Web",
    href: "http://apiv2.accionmfb.com:3000/",
    stack: [
      <FaReact title="React" />,
      <RiTailwindCssFill title="Tailwinscss" />,
      <RiNextjsFill title="Nextjs" />,
      <SiRedux title="Redux" />,
    ],
    description: "AccionMonie app dashboard",
  },
  {
    title: "v1.jideotetic.dev",
    stack: [
      <FaReact title="React" />,
      <RiTailwindCssFill title="Tailwinscss" />,
      <RiNextjsFill title="Nextjs" />,
      <SiReactrouter title="React Router" />,
    ],
    description: "My portfolio website",
  },
  {
    title: "MathCollab",
    href: "https://math-collab-alpha.vercel.app/",
    stack: [
      <FaReact title="React" />,
      <RiTailwindCssFill title="Tailwinscss" />,
      <SiReactrouter title="React Router" />,
      <IoLogoFirebase title="Firebase" />,
    ],
    description: "Math collaboration platform",
  },
  {
    title: "Muzik",
    href: "https://muzik-dun.vercel.app/",
    stack: [
      <MdHtml title="HTML5" />,
      <MdCss title="CSS3" />,
      <MdJavascript title="JavaScript" />,
    ],
    description: "JavaScript music player",
  },
];

export default function Projects() {
  return (
    <>
      {PROJECTS.map((project, id) => (
        <div
          className={`p-8 flex border-b border-gray-200 ${
            id === 1 && "sm:border-l"
          } ${id === 2 && "md:border-l  md:border-b"} ${
            id === 3 &&
            "sm:border-l md:border-r md:border-l-0 md:border-b-0 sm:border-b"
          } ${
            id === 4 && "sm:border-r border-b-0"
          } flex-col gap-8 justify-between bg-gradient-to-b from-gray-50 via-white to-gray-50`}
          key={id}
        >
          <FaCode className="mx-auto text-4xl" />
          <Link to={project.href!}>
            <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
          </Link>
          <div className="flex justify-center items-center gap-2 text-2xl">
            {project.stack.map((stack, id) => (
              <Fragment key={id}>{stack}</Fragment>
            ))}
          </div>
          <p className="text-gray-600 font-pj">{project.description}</p>
        </div>
      ))}
    </>
  );
}
