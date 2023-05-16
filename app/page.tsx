import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import { nFormatter } from "@/lib/utils";
import { Linkedin } from "lucide-react";
import ArgusSystem from "@/components/home/ArgusSystem";

export default async function Home() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/orgs/DaedalusInstitute",
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every 60 seconds
      next: { revalidate: 60 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Bulding a better future for humanity
          </Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Daedalus Institute aims to provide a environment for research and development of new technologies.
          </Balancer>
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
           <a
            href="https://www.linkedin.com/company/daedalusinstitute/"
            target="_blank"
            rel="noreferrer"
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-400 bg-blue-400 px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-blue-400"
          >
            <Linkedin className="h-5 w-5" />
            <p className="text-sm font-semibold">
              Daedalus Institute
            </p>
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="https://github.com/DaedalusInstitute"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>
              <span className="hidden sm:inline-block">Followes on</span> GitHub{" "}
              <span className="font-semibold">{nFormatter(stars)}</span>
            </p>
          </a>
        </div>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              demo
            }
            large={large}
          />
        ))}
      </div>
    </>
  );
}

const features = [
  {
    title: "",
    description:
      "A security system built on top of the Daedalus platform, using the latest embedded technologies.",
    demo: <ArgusSystem />,
    large: true,
  },
  {
    title: "Drones",
    description:
      "Drones projects.",
    demo: <WebVitals />,
  },
  {
    title: "Internship Program",
    description:
      "We are searching for researchers to join our team.",
    demo: <WebVitals />,
  },
  {
    title: "Internship Program",
    description:
      "We are searching for researchers to join our team.",
    demo: <WebVitals />,
    large: true,
  },
];
