import type { JSX } from "react";
import Image from "next/image";
import type { WindowContentProps } from "@/types/window.types";
import SystemInfoPanel from "./components/SystemInfoPanel";

interface PhotoProps {
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
  variant?: "portrait" | "work" | "hobby";
}

function Photo({
  src,
  alt,
  label,
  className = "",
  variant = "hobby",
}: PhotoProps) {
  const frameClass =
    variant === "portrait"
      ? "winxp-raised border-4 border-white p-2 scale-110 z-10 shadow-xl hover:scale-120 transition-transform duration-300"
      : "winxp-raised border-2 border-white p-1 shadow-md hover:scale-105 transition-transform duration-300";

  return (
    <div
      className={`${frameClass} relative bg-white flex flex-col items-center justify-center bg-[#f0f0f0] ${className}`}
    >
      {src ? (
        <Image src={src} alt={alt || ""} fill sizes="320px" className="object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center italic text-[#10233f]/40 text-center p-2 text-[10px]">
          {variant.toUpperCase()} PHOTO
        </div>
      )}
      {label && (
        <span className="mt-1 text-[9px] font-medium text-[#10233f]/60 uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
}

interface AboutSectionProps {
  title: string;
  children: React.ReactNode;
  imageContent: React.ReactNode;
  reverse?: boolean;
  imageWide?: boolean;
}

function AboutSection({
  title,
  children,
  imageContent,
  reverse = false,
  imageWide = false,
}: AboutSectionProps) {
  const textOrder = reverse ? "order-1" : "order-2";
  const imageOrder = reverse ? "order-2" : "order-1";

  const textWidth = imageWide ? "w-[45%]" : "w-[55%]";
  const imageWidth = imageWide ? "w-[55%]" : "w-[45%]";

  return (
    <section className="flex gap-12 py-16 first:pt-8 last:pb-24">
      <div className={`flex flex-col gap-6 ${textWidth} ${textOrder}`}>
        <h3 className="text-2xl font-bold flex items-center gap-3 text-[#10233f]">
          <span className="w-3 h-3 rounded-sm bg-[#235cdb] rotate-45 shadow-[1px_1px_0_rgba(0,0,0,0.2)]" />
          {title}
        </h3>
        <div className="winxp-inset bg-[#eef3fb] p-8 rounded-sm leading-relaxed text-[#10233f] shadow-inner backdrop-blur-sm">
          {children}
        </div>
      </div>
      <div
        className={`flex items-center justify-center ${imageWidth} ${imageOrder}`}
      >
        {imageContent}
      </div>
    </section>
  );
}

const techBadges = [
  { icon: "⚛", label: "React", url: "https://react.dev", color: "#2D9CD9" },
  { icon: "▲", label: "Next.js", url: "https://nextjs.org", color: "#000000" },
  {
    icon: "TS",
    label: "TypeScript",
    url: "https://www.typescriptlang.org",
    color: "#3178C6",
  },
  {
    icon: "🐘",
    label: "PostgreSQL",
    url: "https://www.postgresql.org",
    color: "#4169E1",
  },
  { icon: "🟢", label: "Node.js", url: "https://nodejs.org", color: "#339933" },
  {
    icon: "JS",
    label: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    color: "#C4A600",
  },
];

function hexToRgba(hex: string, alpha: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ResumePreview(): JSX.Element {
  return (
    <div className="winxp-raised flex w-full max-w-sm rotate-[-1deg] flex-col bg-white p-2 shadow-xl">
      <div className="mb-2 flex items-center justify-between border-b border-[#aca899] pb-1 text-[11px] font-bold text-[#10233f]">
        <span>Alisson_Civalski_Curriculo.pdf</span>
        <a
          className="text-[#174cbe] underline"
          href="/assets/resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Abrir
        </a>
      </div>
      <object
        data="/assets/resume.pdf#view=FitH"
        type="application/pdf"
        className="h-[420px] w-full bg-[#f0f0f0]"
        aria-label="Curriculo de Alisson Civalski"
      >
        <div className="flex h-[420px] items-center justify-center bg-[#f0f0f0] p-4 text-center text-[12px] text-[#10233f]/70">
          <a
            className="text-[#174cbe] underline"
            href="/assets/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Abrir curriculo em PDF
          </a>
        </div>
      </object>
    </div>
  );
}

export default function AboutWindow({}: WindowContentProps): JSX.Element {
  return (
    <div className="h-full overflow-y-auto bg-[#eef3fb] custom-scrollbar selection:bg-[#235cdb] selection:text-white">
      {/* Small subtle header */}
      <div className="px-12 pt-10 pb-6 border-b border-[#aca899]/20 bg-gradient-to-b from-white/30 to-transparent">
        <div className="flex items-start justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black text-[#10233f] tracking-tight">
              Alisson Civalski
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-[#4a7c2a] text-white text-[10px] font-bold rounded-sm uppercase tracking-tighter">
                Online
              </span>
              <p className="text-sm text-[#10233f]/60 font-medium">
                Desenvolvedor Web Full Stack · Engenheiro de IA
              </p>
            </div>
            <p className="text-[11px] italic text-[#10233f]/50 mt-1">
              Brasil
            </p>
            <p className="text-[11px] text-[#10233f]/60 mt-0.5">
              Data-Driven Systems Builder
            </p>
            <p className="text-[11px] text-[#10233f]/60">
              Mais de 10 anos de vivência prática em software
            </p>
            <p className="text-[11px] text-[#10233f]/60">
              90+ projetos pessoais, freelancers e experimentais
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 flex-shrink-0">
            {techBadges.map((badge) => (
              <a
                key={badge.label}
                href={badge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm border text-[11px] font-semibold transition-transform duration-150 hover:scale-110 whitespace-nowrap"
                style={{
                  borderColor: badge.color,
                  color: badge.color,
                  backgroundColor: hexToRgba(badge.color, 0.1),
                }}
              >
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-12">
        {/* Section 1: About Me */}
        <AboutSection
          title="About Me"
          imageWide={true}
          imageContent={<ResumePreview />}
        >
          <p>
            Sou <span className="font-bold">Desenvolvedor Web Full Stack</span>,
            Engenheiro de IA e construtor de sistemas orientados por dados.
            Tenho mais de 10 anos de vivência prática com desenvolvimento de
            software e, ao longo dessa trajetória, desenvolvi mais de 90
            projetos entre iniciativas pessoais, freelancers e experimentais.
          </p>
          <p className="mt-3 ">
            Nesse caminho, trabalhei com desenvolvimento web full stack,
            inteligência artificial, machine learning, automações, engenharia de
            dados e sistemas voltados para resolver problemas reais.
          </p>

          <p className="mt-3 text-[#10233f]/80 italic">
            Meu foco é transformar ideias complexas em soluções práticas,
            eficientes e bem estruturadas.
          </p>
        </AboutSection>

        {/* Section 2: Professional Progress */}
        <AboutSection
          title="Professional Progress"
          reverse={true}
          imageContent={
            <div className="relative w-full max-w-sm grid grid-cols-2 gap-4 p-4">
              <Photo
                variant="work"
                label="Architecture"
                className="w-full aspect-[4/5] rotate-[2deg]"
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80"
                alt="Software architecture planning"
              />
              <Photo
                variant="work"
                label="Development"
                className="w-full aspect-[4/5] rotate-[-2deg] mt-8"
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&q=80"
                alt="Software development workspace"
              />
            </div>
          }
        >
          <p>
            Minha trajetória combina execução técnica, pensamento analítico e
            visão de produto. Gosto de dividir grandes problemas em fragmentos
            menores, entender o que realmente precisa ser resolvido e construir
            sistemas que entreguem valor de forma clara.
          </p>
          <p className="mt-4">
            Atualmente, meu foco está em aplicações full stack, IA aplicada,
            automações e pipelines de dados que conectam produto, operação e
            tomada de decisão.
          </p>
        </AboutSection>

        {/* Section 3: Interests & Hobbies */}
        <AboutSection
          title="Interests & Hobbies"
          imageWide={true}
          imageContent={
            <div className="relative w-full max-w-sm flex flex-wrap gap-4 justify-center items-center">
              <Photo
                variant="hobby"
                label="Chess"
                className="w-40 h-40 rotate-[-3deg]"
                src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=500&q=80"
                alt="Chess board"
              />
              <Photo
                variant="hobby"
                label="Music"
                className="w-36 h-36 rotate-[2deg] -mt-4"
                src="https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?auto=format&fit=crop&w=500&q=80"
                alt="Electric guitar"
              />
              <Photo
                variant="hobby"
                label="Astronomy"
                className="absolute -bottom-8 left-4 w-28 h-28 rotate-[6deg] opacity-60 hidden lg:flex"
                src="/assets/about-me/galaxy.jpg"
                alt="Galaxy"
              />
              <Photo
                variant="hobby"
                label="Art"
                className="w-32 h-32 rotate-[-1deg]"
                src="/assets/about-me/painting.jpg"
                alt="Painting"
              />
            </div>
          }
        >
          <p>
            Fora do codigo, gosto de xadrez, instrumentos musicais, guitarra,
            violao, sintetizadores digitais, mixagem e masterizacao de audio.
            Tambem curto arte, pinturas, tatuar e ser tatuado.
          </p>
          <p className="mt-4 text-[#10233f]/70">
            Astronomia, ciencia e nerdices no geral tambem fazem parte do meu
            repertorio. Gosto de explorar ideias, testar ferramentas e
            transformar curiosidade em projetos concretos.
          </p>
        </AboutSection>
      </div>

      {/* Continuous footer/spacer */}
      <div className="h-32 bg-gradient-to-t from-white/10 to-transparent" />

      {/* System Info Panel */}
      <div className="px-12 pb-8">
        <SystemInfoPanel
          os="Windows"
          kernel="WIN32_NT 10.0.268"
          shell="PowerShell"
          wm="GlazeWM"
          editor="Neovim"
          terminal="Wezterm"
          theme="Catppuccin Macchiato"
          agents="Opencode + Customized Openspec"
          disk="195.12 / 200 GiB"
        />
      </div>
    </div>
  );
}
