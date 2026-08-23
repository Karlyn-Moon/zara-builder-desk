import { principles, products, type Product } from "../data/zara";

export type MentorMode = "拆解" | "反证" | "推进";
export type Timebox = "30 分钟" | "今天" | "7 天";
export type Audience = "自己" | "小团队" | "公开用户";

export type MentorInput = {
  challenge: string;
  mode: MentorMode;
  timebox: Timebox;
  audience: Audience;
  product?: Product;
};

export type MentorResult = {
  judgment: string;
  basis: string[];
  assumption: string;
  artifact: string;
  actions: string[];
  antiFeature: string;
  references: Product[];
  confidence: "有依据" | "模式推断";
};

const includesAny = (value: string, terms: string[]) =>
  terms.some((term) => value.toLowerCase().includes(term.toLowerCase()));

const detectAngle = (challenge: string) => {
  if (includesAny(challenge, ["内容", "视频", "播客", "文章", "阅读", "课程", "知识"])) return "format";
  if (includesAny(challenge, ["待办", "会议", "飞书", "流程", "自动", "重复", "agent"])) return "workflow";
  if (includesAny(challenge, ["设计", "演示", "ppt", "slides", "表达", "页面"])) return "expression";
  if (includesAny(challenge, ["标签", "拖延", "专注", "稍后", "日历"])) return "behavior";
  return "friction";
};

const referenceIds: Record<string, string[]> = {
  format: ["youtube-to-ebook", "personalized-podcast", "codebase-to-course"],
  workflow: ["lark-minutes-tasks", "lark-coding-agent-bridge", "reading-block"],
  expression: ["frontend-slides", "beautiful-html-templates", "beautiful-feishu-whiteboard"],
  behavior: ["reading-block", "tab-out", "reading-block-lark"],
  friction: ["tab-out", "reading-block", "follow-builders"],
};

export function buildMentorResult(input: MentorInput): MentorResult {
  const angle = detectAngle(input.challenge);
  const references = referenceIds[angle]
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
  const context = input.product ? `围绕 ${input.product.name}` : "针对这个想法";

  const judgments: Record<MentorMode, string> = {
    拆解: `${context}，先不要扩展功能。把它收束成一个明确摩擦、一次输入和一个可见结果。`,
    反证: `${context}，最危险的不是做不出来，而是把你自己的偏好误当成了稳定需求。先找行为证据。`,
    推进: `${context}，现在缺的不是更多分析，而是一个能在 ${input.timebox} 内被真实使用的交付物。`,
  };

  const artifacts: Record<string, string> = {
    format: `一份用真实素材完成的“旧媒介 → 新媒介”样例，让 ${input.audience} 能完整消费一次。`,
    workflow: `一条从真实输入到执行结果的最短自动化链路，允许人工兜底，但必须跑通闭环。`,
    expression: "一页可直接打开、编辑和分享的成品，用真实内容证明表达质量。",
    behavior: "一个会自动触发下一步的行为钩子，而不是新的收藏夹或待办列表。",
    friction: "一个只解决你过去两周最常手动补救动作的窄工具。",
  };

  const basis = [
    principles.find((principle) => principle.id === "personal-friction")!.statement,
    angle === "format"
      ? principles.find((principle) => principle.id === "change-the-format")!.statement
      : principles.find((principle) => principle.id === "agent-does-work")!.statement,
    principles.find((principle) => principle.id === "opinionated-products")!.statement,
  ];

  return {
    judgment: judgments[input.mode],
    basis,
    assumption:
      input.mode === "反证"
        ? "你假设用户愿意改变现有行为。先证明他们已经在用笨办法补救，而不是只说“这很好用”。"
        : "你假设问题足够频繁。用最近一次真实发生的场景替代抽象用户画像。",
    artifact: artifacts[angle],
    actions: [
      "写下最近一次问题发生时的原始输入、当前补救动作和最终结果。",
      `删到只剩一个输入和一个输出，在 ${input.timebox} 内做出可使用版本。`,
      `交给 1 位${input.audience === "自己" ? "未来的自己" : input.audience}完成一次真实任务，只记录卡住的地方。`,
    ],
    antiFeature: "先不做账号体系、通用设置、多人协作与完整自动化；它们都不能证明核心闭环成立。",
    references,
    confidence: "模式推断",
  };
}

export const followUpQuestions = [
  "最近一次这个问题真实发生在什么时候？",
  "你现在用什么笨办法补救？哪一步最耗注意力？",
  "如果只能保留一个输入和一个输出，它们分别是什么？",
  "什么行为证据能证明它值得继续，而不是只得到一句“很酷”？",
];
