export type ProductCategory = "表达" | "信息" | "工作流" | "专注";

export type Product = {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  format: string;
  stars: number;
  forks: number;
  language?: string;
  featured?: boolean;
  updatedAt: string;
  url: string;
  image: string;
  accent: string;
  workflow: [string, string, string];
  sourceIds: string[];
};

export type Source = {
  id: string;
  label: string;
  type: "GitHub" | "小红书" | "主页";
  url: string;
  checkedAt: string;
  status: "verified" | "limited";
  note: string;
};

export type Principle = {
  id: string;
  title: string;
  statement: string;
  kind: "direct" | "pattern";
  evidence: string;
  sourceIds: string[];
  mentorQuestion: string;
};

export type SocialNote = {
  title: string;
  engagement: string;
  url: string;
};

const repoImage = (name: string) =>
  `https://opengraph.githubassets.com/zara-desk-20260802/zarazhangrui/${name}`;

export const profile = {
  name: "Zara Zhang",
  handle: "@zarazhangrui",
  bio: "AI tinkerer",
  location: "San Jose, California",
  avatar: "https://avatars.githubusercontent.com/u/153693696?v=4",
  github: "https://github.com/zarazhangrui",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/59757acd50c4b45e6e9a90df",
  xiaohongshuName: "张咋啦",
  xiaohongshuId: "260679956",
  xiaohongshuLikes: "1.7M",
  followers: 12339,
  publicRepos: 18,
  checkedAt: "2026-08-02",
};

export const sources: Source[] = [
  {
    id: "github-profile",
    label: "GitHub 公开主页",
    type: "GitHub",
    url: "https://github.com/zarazhangrui",
    checkedAt: "2026-08-02",
    status: "verified",
    note: "个人简介、项目清单、公开仓库与热度数据已核对。",
  },
  {
    id: "profile-readme",
    label: "个人主页 README（中文）",
    type: "主页",
    url: "https://github.com/zarazhangrui/zarazhangrui/blob/main/README.zh-CN.md",
    checkedAt: "2026-08-02",
    status: "verified",
    note: "用于人物自述、精选项目和分类说明。",
  },
  {
    id: "xhs-profile",
    label: "小红书「张咋啦」",
    type: "小红书",
    url: "https://www.xiaohongshu.com/user/profile/59757acd50c4b45e6e9a90df",
    checkedAt: "2026-08-02",
    status: "verified",
    note: "账号名、小红书号、跨平台简介与公开笔记标题已核对；正文仍受登录限制。",
  },
];

const xhsProfileUrl = "https://www.xiaohongshu.com/user/profile/59757acd50c4b45e6e9a90df";

export const socialNotes: SocialNote[] = [
  { title: "如何一年在Twitter涨粉7万：我做内容的方法", engagement: "9,180", url: xhsProfileUrl },
  { title: "我在GitHub上有超过3万星（虽然并不会写代码", engagement: "2.6万", url: xhsProfileUrl },
  { title: "如何在团队里打造学习AI的氛围？3个建议", engagement: "488", url: xhsProfileUrl },
  { title: "线下见到了很多粉丝！内容和社区的联动关系", engagement: "652", url: xhsProfileUrl },
  { title: "录视频的时候，如何让自己表达更流畅？", engagement: "2,738", url: xhsProfileUrl },
  { title: "用coding agent辅助内容创作的几个实践", engagement: "507", url: xhsProfileUrl },
  { title: "这个时代的builder 最重要的素质是什么？", engagement: "549", url: xhsProfileUrl },
  { title: "给builders的几个做内容的建议", engagement: "843", url: xhsProfileUrl },
  { title: "30分钟完整版：4个可以落地的AI原生工作方式", engagement: "6,184", url: xhsProfileUrl },
  { title: "跟OpenAI的Codex团队学习build in public", engagement: "1,212", url: xhsProfileUrl },
  { title: "Taste越来越重要，如何提升自己的 taste？", engagement: "793", url: xhsProfileUrl },
  { title: "AI时代 内容创作和产品营销的5个趋势", engagement: "1,814", url: xhsProfileUrl },
];

const repoSource = (name: string): Source => ({
  id: `repo-${name}`,
  label: name,
  type: "GitHub",
  url: `https://github.com/zarazhangrui/${name}`,
  checkedAt: "2026-08-02",
  status: "verified",
  note: "公开仓库说明与元数据。",
});

export const products: Product[] = [
  {
    id: "frontend-slides",
    name: "Frontend Slides",
    description: "借助 coding agent 的前端能力，在浏览器里制作漂亮的演示文稿。",
    category: "表达",
    format: "Agent Skill",
    stars: 26762,
    forks: 2172,
    language: "JavaScript",
    featured: true,
    updatedAt: "2026-06-23",
    url: "https://github.com/zarazhangrui/frontend-slides",
    image: repoImage("frontend-slides"),
    accent: "#e84f3d",
    workflow: ["输入叙事与素材", "由 agent 组织网页视觉", "交付可编辑的浏览器幻灯片"],
    sourceIds: ["repo-frontend-slides", "profile-readme"],
  },
  {
    id: "follow-builders",
    name: "Follow Builders",
    description: "追踪 X 与 YouTube 上的 AI builder，把高信号内容重组为易读摘要。",
    category: "信息",
    format: "Content System",
    stars: 6125,
    forks: 797,
    language: "JavaScript",
    featured: true,
    updatedAt: "2026-08-02",
    url: "https://github.com/zarazhangrui/follow-builders",
    image: repoImage("follow-builders"),
    accent: "#159e80",
    workflow: ["监测 builder 内容", "筛选并重组高信号观点", "生成可持续消费的摘要"],
    sourceIds: ["repo-follow-builders", "profile-readme"],
  },
  {
    id: "codebase-to-course",
    name: "Codebase to Course",
    description: "把任意代码库转成漂亮、可交互的单页课程，面向非技术 vibe coder。",
    category: "表达",
    format: "Agent Skill",
    stars: 5317,
    forks: 539,
    language: "CSS",
    featured: true,
    updatedAt: "2026-03-30",
    url: "https://github.com/zarazhangrui/codebase-to-course",
    image: repoImage("codebase-to-course"),
    accent: "#3c68d8",
    workflow: ["读取代码库", "翻译结构与关键概念", "生成可交互单页课程"],
    sourceIds: ["repo-codebase-to-course", "profile-readme"],
  },
  {
    id: "beautiful-html-templates",
    name: "Beautiful HTML Templates",
    description: "让 coding agent 能自动挑选并使用的 HTML 幻灯片模板库。",
    category: "表达",
    format: "Template Library",
    stars: 4000,
    forks: 344,
    language: "HTML",
    featured: true,
    updatedAt: "2026-06-09",
    url: "https://github.com/zarazhangrui/beautiful-html-templates",
    image: repoImage("beautiful-html-templates"),
    accent: "#d9772d",
    workflow: ["识别内容类型", "匹配合适模板", "自动生成完整演示文稿"],
    sourceIds: ["repo-beautiful-html-templates", "profile-readme"],
  },
  {
    id: "lark-coding-agent-bridge",
    name: "Lark Coding Agent Bridge",
    description: "在飞书消息与本地 Claude Code / Codex CLI 之间建立可持续会话。",
    category: "工作流",
    format: "Bridge",
    stars: 2088,
    forks: 337,
    language: "TypeScript",
    featured: true,
    updatedAt: "2026-07-29",
    url: "https://github.com/zarazhangrui/lark-coding-agent-bridge",
    image: repoImage("lark-coding-agent-bridge"),
    accent: "#2876d8",
    workflow: ["在飞书发起任务", "本地 agent 执行并流式返回", "按会话与工作区保留上下文"],
    sourceIds: ["repo-lark-coding-agent-bridge", "profile-readme"],
  },
  {
    id: "tab-out",
    name: "Tab Out",
    description: "把浏览器新标签页变成标签任务中心，帮助清理越开越多的页面。",
    category: "专注",
    format: "Chrome Extension",
    stars: 1722,
    forks: 488,
    language: "JavaScript",
    featured: true,
    updatedAt: "2026-04-14",
    url: "https://github.com/zarazhangrui/tab-out",
    image: repoImage("tab-out"),
    accent: "#6b57c7",
    workflow: ["收拢打开的标签", "把页面显性化为任务", "集中关闭或继续处理"],
    sourceIds: ["repo-tab-out", "profile-readme"],
  },
  {
    id: "beautiful-feishu-whiteboard",
    name: "Beautiful Feishu Whiteboard",
    description: "35 套精选配色，让 agent 生成漂亮且可编辑的飞书画板。",
    category: "表达",
    format: "Agent Skill",
    stars: 621,
    forks: 35,
    language: "Shell",
    featured: true,
    updatedAt: "2026-06-11",
    url: "https://github.com/zarazhangrui/beautiful-feishu-whiteboard",
    image: repoImage("beautiful-feishu-whiteboard"),
    accent: "#df496a",
    workflow: ["选择画板用途", "匹配一套配色风格", "生成可编辑的飞书画板"],
    sourceIds: ["repo-beautiful-feishu-whiteboard", "profile-readme"],
  },
  {
    id: "youtube-to-ebook",
    name: "YouTube to Ebook",
    description: "把喜欢频道的视频字幕转成 EPUB，并定期发送到邮箱。",
    category: "信息",
    format: "Agent Skill",
    stars: 526,
    forks: 109,
    language: "Python",
    updatedAt: "2026-01-28",
    url: "https://github.com/zarazhangrui/youtube-to-ebook",
    image: repoImage("youtube-to-ebook"),
    accent: "#cc3a33",
    workflow: ["获取频道字幕", "整理成可读章节", "生成 EPUB 并定期投递"],
    sourceIds: ["repo-youtube-to-ebook", "profile-readme"],
  },
  {
    id: "personalized-podcast",
    name: "Personalized Podcast",
    description: "把任意内容转成可控制脚本、声音与主持人的个性化 AI 播客。",
    category: "信息",
    format: "Media Pipeline",
    stars: 411,
    forks: 49,
    language: "Python",
    updatedAt: "2026-04-08",
    url: "https://github.com/zarazhangrui/personalized-podcast",
    image: repoImage("personalized-podcast"),
    accent: "#ba594d",
    workflow: ["提供原始内容", "控制脚本与主持人", "发布到常用播客应用"],
    sourceIds: ["repo-personalized-podcast", "profile-readme"],
  },
  {
    id: "reading-block",
    name: "Reading Block",
    description: "每保存 5 篇文章，就在 Google Calendar 自动安排 30 分钟阅读块。",
    category: "专注",
    format: "Chrome Extension",
    stars: 93,
    forks: 24,
    language: "JavaScript",
    updatedAt: "2026-06-30",
    url: "https://github.com/zarazhangrui/reading-block",
    image: repoImage("reading-block"),
    accent: "#23885d",
    workflow: ["一键保存文章", "累计到 5 篇", "自动预约带链接的阅读时间"],
    sourceIds: ["repo-reading-block", "profile-readme"],
  },
  {
    id: "lark-minutes-tasks",
    name: "Lark Minutes Tasks",
    description: "读取飞书会议记录，提取行动项，并让 agent 真正推进执行。",
    category: "工作流",
    format: "Agent Skill",
    stars: 63,
    forks: 12,
    updatedAt: "2026-03-31",
    url: "https://github.com/zarazhangrui/lark-minutes-tasks",
    image: repoImage("lark-minutes-tasks"),
    accent: "#3f77c4",
    workflow: ["读取会议转录", "提取明确行动项", "调用 agent 推进完成"],
    sourceIds: ["repo-lark-minutes-tasks", "profile-readme"],
  },
  {
    id: "reading-block-lark",
    name: "Reading Block for Lark",
    description: "把稍后阅读列表转成飞书日历里的专属阅读时间。",
    category: "专注",
    format: "Chrome Extension",
    stars: 42,
    forks: 6,
    language: "JavaScript",
    updatedAt: "2026-07-01",
    url: "https://github.com/zarazhangrui/reading-block-lark",
    image: repoImage("reading-block-lark"),
    accent: "#436ee0",
    workflow: ["保存稍后阅读", "聚合待读条目", "预订飞书日历时间"],
    sourceIds: ["repo-reading-block-lark"],
  },
  {
    id: "longcut",
    name: "Longcut",
    description: "面向长视频学习的工具，帮助从较长内容中持续吸收知识。",
    category: "信息",
    format: "Web Product",
    stars: 35,
    forks: 7,
    updatedAt: "2026-02-08",
    url: "https://github.com/zarazhangrui/longcut",
    image: repoImage("longcut"),
    accent: "#a24f77",
    workflow: ["输入长视频", "聚焦可学习片段", "形成更易吸收的内容"],
    sourceIds: ["repo-longcut"],
  },
  {
    id: "call-me-skill",
    name: "Call Me Skill",
    description: "面向 agent 调用场景的公开实验仓库；仓库暂未提供公开简介。",
    category: "工作流",
    format: "Agent Skill",
    stars: 13,
    forks: 5,
    language: "Shell",
    updatedAt: "2026-04-21",
    url: "https://github.com/zarazhangrui/call-me-skill",
    image: repoImage("call-me-skill"),
    accent: "#6a716a",
    workflow: ["查看公开仓库", "核对可用入口", "按仓库说明进行实验"],
    sourceIds: ["repo-call-me-skill"],
  },
  {
    id: "vibe-coding-jam-presentation",
    name: "Vibe Coding Jam Presentation",
    description: "Vibe Coding Jam 的 HTML 演示项目；仓库暂未提供公开简介。",
    category: "表达",
    format: "Presentation",
    stars: 5,
    forks: 3,
    language: "HTML",
    updatedAt: "2026-02-21",
    url: "https://github.com/zarazhangrui/vibe-coding-jam-presentation",
    image: repoImage("vibe-coding-jam-presentation"),
    accent: "#e39f27",
    workflow: ["组织分享内容", "生成 HTML 演示", "用于现场表达"],
    sourceIds: ["repo-vibe-coding-jam-presentation"],
  },
  {
    id: "bilingual-subtitles",
    name: "Bilingual Subtitles",
    description: "把 CJK 与拉丁字符的双语字幕漂亮地烧录进视频。",
    category: "表达",
    format: "Agent Skill",
    stars: 3,
    forks: 0,
    language: "Python",
    updatedAt: "2026-07-01",
    url: "https://github.com/zarazhangrui/bilingual-subtitles",
    image: repoImage("bilingual-subtitles"),
    accent: "#1d8d8f",
    workflow: ["准备视频与双语字幕", "排版 CJK 与拉丁文字", "输出烧录后视频"],
    sourceIds: ["repo-bilingual-subtitles"],
  },
  {
    id: "podcast-feed",
    name: "Podcast Feed",
    description: "为 Zara 制作的个人播客 Feed 实验。",
    category: "信息",
    format: "Personal Feed",
    stars: 2,
    forks: 1,
    updatedAt: "2026-04-06",
    url: "https://github.com/zarazhangrui/podcast-feed",
    image: repoImage("podcast-feed"),
    accent: "#d15d44",
    workflow: ["汇集个人音频", "生成标准 Feed", "在播客客户端订阅"],
    sourceIds: ["repo-podcast-feed"],
  },
];

export const allSources: Source[] = [
  ...sources,
  ...products.map((product) => repoSource(product.id)),
];

export const principles: Principle[] = [
  {
    id: "code-as-expression",
    title: "把代码当作表达媒介",
    statement: "对我来说，代码是一种自我表达的媒介。",
    kind: "direct",
    evidence: "Zara 在个人主页中说明：即使没有传统工程背景，也借助 coding agent 把想法变成现实。",
    sourceIds: ["profile-readme"],
    mentorQuestion: "如果技术实现不再是门槛，你真正想表达的主张是什么？",
  },
  {
    id: "opinionated-products",
    title: "产品要有明确主张",
    statement: "我做有态度的 skills 和产品。",
    kind: "direct",
    evidence: "个人主页开篇自述；多个项目名称和默认工作流都明确服务特定行为。",
    sourceIds: ["profile-readme"],
    mentorQuestion: "这个产品替用户做出的、最不愿妥协的判断是什么？",
  },
  {
    id: "builders-over-influencers",
    title: "追踪建设者，而非声量",
    statement: "关注 builder，而不是网红。",
    kind: "direct",
    evidence: "Follow Builders 的公开定位把内容源和筛选标准写进产品主张。",
    sourceIds: ["repo-follow-builders", "profile-readme"],
    mentorQuestion: "你正在优化真实产出，还是优化看起来像产出的信号？",
  },
  {
    id: "intention-to-calendar",
    title: "把意愿变成已预约行为",
    statement: "不要只保存稍后阅读，把它变成日历上的时间。",
    kind: "pattern",
    evidence: "Reading Block 两个版本都把收藏阈值转换为带链接的日历事件。",
    sourceIds: ["repo-reading-block", "repo-reading-block-lark", "profile-readme"],
    mentorQuestion: "用户口头上的意愿，能否被转成一个已经发生在工具里的动作？",
  },
  {
    id: "change-the-format",
    title: "改变媒介，而不只是压缩内容",
    statement: "让内容进入用户真正会消费的格式。",
    kind: "pattern",
    evidence: "视频转电子书、内容转播客、代码库转课程，都通过改变交付媒介降低消费阻力。",
    sourceIds: ["repo-youtube-to-ebook", "repo-personalized-podcast", "repo-codebase-to-course"],
    mentorQuestion: "问题真的是内容不够好，还是它现在的格式不适合用户？",
  },
  {
    id: "agent-does-work",
    title: "让 agent 完成闭环",
    statement: "从提取行动项继续走到真正完成任务。",
    kind: "pattern",
    evidence: "Lark Minutes Tasks 与 Lark Coding Agent Bridge 都把对话输入接到真实执行环境。",
    sourceIds: ["repo-lark-minutes-tasks", "repo-lark-coding-agent-bridge"],
    mentorQuestion: "你的流程停在建议、摘要或待办，还是已经连接到执行结果？",
  },
  {
    id: "personal-friction",
    title: "从反复出现的个人摩擦开始",
    statement: "把标签堆积、稍后阅读、长内容难消费这些重复摩擦直接产品化。",
    kind: "pattern",
    evidence: "Tab Out、Reading Block、Longcut 和 Podcast Feed 均围绕具体的个人工作流。",
    sourceIds: ["repo-tab-out", "repo-reading-block", "repo-longcut", "repo-podcast-feed"],
    mentorQuestion: "过去两周里，哪件小事让你至少手动补救了三次？",
  },
  {
    id: "build-in-public",
    title: "把公开构建接入反馈回路",
    statement: "构建过程也可以成为内容、社区与产品反馈的一部分。",
    kind: "pattern",
    evidence: "小红书公开标题直接讨论 build in public、内容与社区联动；GitHub 同步公开产品与迭代。",
    sourceIds: ["xhs-profile", "github-profile"],
    mentorQuestion: "你能公开哪一个仍在形成中的判断，让真实反馈进入下一轮构建？",
  },
  {
    id: "taste-as-practice",
    title: "把 taste 当成可训练能力",
    statement: "AI 降低实现门槛后，选择、判断与审美成为更显性的差异。",
    kind: "pattern",
    evidence: "小红书公开标题把“taste 越来越重要、如何提升”设为问题；多个模板与视觉 skill 把判断固化为可复用系统。",
    sourceIds: ["xhs-profile", "repo-beautiful-html-templates", "repo-beautiful-feishu-whiteboard"],
    mentorQuestion: "这个结果里，哪三个判断真正体现了你的 taste，而不是模型的默认值？",
  },
];

export const formatNumber = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 1 : 1)}k`;
  }
  return String(value);
};
