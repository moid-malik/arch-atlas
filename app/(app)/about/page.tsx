import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <main className="container mx-auto px-4 py-16 mt-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>

        <div className="prose dark:prose-invert">
          <p className="text-lg leading-relaxed">
            I'm a Full Stack Developer passionate about building robust and
            scalable web applications. With expertise in modern technologies, I
            create seamless user experiences and efficient backend solutions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Technical Expertise
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
            {[
              "Next.js",
              "React.js",
              "MongoDB",
              "PostgreSQL",
              "Mongoose",
              "Prisma",
              "Redux",
              "Radix UI",
              "TailwindCSS",
              "TypeScript",
              "JavaScript",
              "Python",
              "React Native",
            ].map((skill: any) => (
              <div
                key={skill}
                className="bg-secondary/50 rounded-lg p-3 text-center">
                {skill}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">What I Do</h2>
          <p className="text-lg leading-relaxed">
            I specialize in developing full-stack applications with a focus on
            performance, scalability, and user experience. From responsive
            front-end interfaces to robust backend architectures, I bring ideas
            to life using cutting-edge technologies.
          </p>

          <div className="flex gap-4 mt-8">
            <Link href={"https://wwww.github.com/moid-malik"} target="_blank">
              <Button variant="outline" size="lg">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </Link>
            <Link
              className="overflow-hidden"
              href={"https://www.linkedin.com/in/moid-malik-040993344"}>
              <Button variant="outline" size="lg">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </Button>
            </Link>
            <Link href={"mailto:moidmalikdev@gmail.com"}>
              <Button variant="outline" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-neutral-600 opacity-40 tracking-tighter ">
            let&apos;s own the code
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
