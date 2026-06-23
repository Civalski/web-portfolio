import type { JSX } from "react";

import type { WindowContentProps } from "@/types/window.types";

interface ProjectItem {
  title: string;
  period: string;
  association: string;
  href?: string;
  description: string[];
  stack?: string[];
}

const projects: ProjectItem[] = [
  {
    title: "Online Food",
    period: "jun de 2026 - o momento",
    association: "Associado a Arkersoft",
    href: "https://onlinefood.com.br",
    description: [
      "Plataforma completa de delivery criada para conectar restaurantes, clientes e entregadores em uma experiencia integrada e eficiente.",
      "Reune cardapio digital, carrinho, checkout, acompanhamento de pedidos, painel administrativo para restaurantes, gestao de entregas e area de controle para o proprietario da plataforma.",
      "Construido com foco em uma experiencia semelhante ao iFood, incluindo fluxos publicos de compra, pedidos em tempo real, produtos, cupons, estoque, entregadores e configuracoes do restaurante.",
    ],
  },
  {
    title: "Architecture Blueprint",
    period: "mar de 2026 - abr de 2026",
    association: "Associado a Arkersoft",
    description: [
      "Ferramenta visual de checkup arquitetural para ajudar times e desenvolvedores a acompanharem a qualidade e a saude tecnica de softwares de forma clara, organizada e continua.",
      "Transforma revisoes de seguranca, performance, frontend, banco de dados, padroes de codigo, manutenibilidade e escalabilidade em um painel visual e interativo.",
      "Apoia auditorias tecnicas, refatoracoes planejadas, revisoes de arquitetura e evolucao sustentavel do produto com checklists, status de progresso e indicadores.",
    ],
    stack: ["React", "TypeScript", "Vite", "React Flow", "Zustand", "Lucide React"],
  },
  {
    title: "Arker CRM",
    period: "2026",
    association: "Associado a Arkersoft",
    href: "https://crm.arkersoft.com.br",
    description: [
      "Plataforma que opera na fronteira entre um CRM avancado e um ERP leve, centralizando a esteira comercial e administrativa de um negocio em uma unica aplicacao.",
      "Unifica prospeccao, funis e grupos de vendas, oportunidades, tarefas, catalogo de produtos, pedidos, orcamentos, propostas comerciais, contratos, financas empresariais e pessoais, e metas.",
      "A arquitetura foi desenhada para receber futuramente um microsservico proprietario de mensageria fiscal, evitando acoplamento direto com APIs de terceiros para emissao de Notas Fiscais.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "PostgreSQL",
      "Prisma 7",
      "NextAuth.js",
      "Supabase",
      "TanStack Query",
      "Stripe",
      "Resend",
      "Sentry",
    ],
  },
];

export default function ProjectsWindow({}: WindowContentProps): JSX.Element {
  return (
    <div className="space-y-4 p-3 text-[12px] leading-relaxed text-[#10233f]">
      <h2 className="text-[14px] font-bold">Projects</h2>
      <p>
        Projetos recentes desenvolvidos com foco em produto, arquitetura,
        inteligencia artificial, automacoes e sistemas orientados por dados.
      </p>

      <div className="space-y-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="winxp-inset bg-[#eef3fb] p-3"
          >
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-[13px] font-bold">
                  {project.href ? (
                    <a
                      className="text-[#174cbe] underline"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-[11px] text-[#10233f]/65">
                  {project.period} · {project.association}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {project.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {project.stack !== undefined ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="winxp-raised bg-white px-2 py-0.5 text-[10px] font-semibold text-[#10233f]/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <a
        className="inline-block text-[#174cbe] underline"
        href="https://github.com/Civalski"
        target="_blank"
        rel="noreferrer"
      >
        Ver mais projetos no GitHub
      </a>
    </div>
  );
}
