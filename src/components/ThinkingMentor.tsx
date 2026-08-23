import { useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  BookOpenCheck,
  Check,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import type { Product } from "../data/zara";
import {
  buildMentorResult,
  followUpQuestions,
  type Audience,
  type MentorMode,
  type MentorResult,
  type Timebox,
} from "../lib/mentor";

type ThinkingMentorProps = {
  context: Product | null;
  initialPrompt?: string;
  onClearContext: () => void;
  onSave: (title: string) => void;
  onClose?: () => void;
};

const modes: MentorMode[] = ["拆解", "反证", "推进"];
const timeboxes: Timebox[] = ["30 分钟", "今天", "7 天"];

export function ThinkingMentor({
  context,
  initialPrompt = "",
  onClearContext,
  onSave,
  onClose,
}: ThinkingMentorProps) {
  const [mode, setMode] = useState<MentorMode>("拆解");
  const [challenge, setChallenge] = useState(initialPrompt);
  const [timebox, setTimebox] = useState<Timebox>("今天");
  const [audience, setAudience] = useState<Audience>("自己");
  const [result, setResult] = useState<MentorResult | null>(null);
  const [followUpIndex, setFollowUpIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (initialPrompt) {
      setChallenge(initialPrompt);
      setResult(null);
    }
  }, [initialPrompt]);

  const placeholder = useMemo(
    () => context
      ? `关于 ${context.name}，你正在判断什么？`
      : "写下一个真实问题、想法或反复出现的摩擦…",
    [context],
  );

  const submit = () => {
    if (!challenge.trim()) return;
    setResult(buildMentorResult({ challenge, mode, timebox, audience, product: context ?? undefined }));
    setSaved(false);
  };

  const reset = () => {
    setResult(null);
    setFollowUpIndex(0);
    setSaved(false);
  };

  return (
    <aside className="mentor-panel" aria-label="Zara 思考导师">
      <div className="mentor-header">
        <div className="mentor-title">
          <span className="mentor-symbol"><Sparkles size={17} /></span>
          <div>
            <strong>思考导师</strong>
            <span>PUBLIC EVIDENCE MODE</span>
          </div>
        </div>
        {onClose && (
          <button className="icon-button mentor-close" type="button" title="关闭导师" onClick={onClose}>
            <X size={17} />
          </button>
        )}
      </div>

      <div className="mentor-mode" aria-label="导师模式">
        {modes.map((item) => (
          <button
            key={item}
            className={mode === item ? "active" : ""}
            type="button"
            onClick={() => setMode(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {context && (
        <div className="context-chip">
          <span className="context-color" style={{ background: context.accent }} />
          <div>
            <span>当前产品</span>
            <strong>{context.name}</strong>
          </div>
          <button type="button" title="移除产品上下文" aria-label="移除产品上下文" onClick={onClearContext}>
            <X size={15} />
          </button>
        </div>
      )}

      {!result ? (
        <div className="mentor-compose">
          <textarea
            value={challenge}
            onChange={(event) => setChallenge(event.target.value)}
            placeholder={placeholder}
            aria-label="描述你的问题"
            rows={7}
          />

          <div className="mentor-options">
            <label>
              <span>交付时限</span>
              <div className="mini-segmented">
                {timeboxes.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={timebox === item ? "active" : ""}
                    onClick={() => setTimebox(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </label>
            <label>
              <span>首位用户</span>
              <select value={audience} onChange={(event) => setAudience(event.target.value as Audience)}>
                <option>自己</option>
                <option>小团队</option>
                <option>公开用户</option>
              </select>
            </label>
          </div>

          <button className="mentor-submit" type="button" disabled={!challenge.trim()} onClick={submit}>
            用公开作品审视 <ArrowUp size={17} />
          </button>

          <div className="mentor-disclosure">
            <BookOpenCheck size={16} />
            <p>基于公开作品归纳，不是 Zara 本人，也不会补写未验证的小红书观点。</p>
          </div>
        </div>
      ) : (
        <div className="mentor-result" aria-live="polite">
          <div className="result-status">
            <span><Check size={14} /> 已完成一次{mode}</span>
            <button className="icon-button" type="button" title="重新输入" onClick={reset}>
              <RotateCcw size={15} />
            </button>
          </div>

          <section>
            <span className="result-label">当前判断</span>
            <p className="result-lead">{result.judgment}</p>
          </section>

          <section>
            <span className="result-label">作品依据</span>
            <ul className="evidence-list">
              {result.basis.map((item, index) => (
                <li key={item}><span>[{index + 1}]</span>{item}</li>
              ))}
            </ul>
          </section>

          <section className="assumption-block">
            <span className="result-label"><CircleAlert size={14} /> 需要挑战的假设</span>
            <p>{result.assumption}</p>
          </section>

          <section>
            <span className="result-label">最小交付物</span>
            <p>{result.artifact}</p>
          </section>

          <section>
            <span className="result-label">下一步</span>
            <ol className="action-list">
              {result.actions.map((action, index) => (
                <li key={action}>
                  <span>{index + 1}</span>
                  <p>{action}</p>
                </li>
              ))}
            </ol>
          </section>

          <details className="anti-feature">
            <summary>这轮先不做什么</summary>
            <p>{result.antiFeature}</p>
          </details>

          <div className="reference-products">
            <span className="result-label">相关作品</span>
            {result.references.map((product) => (
              <a key={product.id} href={product.url} target="_blank" rel="noreferrer">
                <span style={{ background: product.accent }} />
                {product.name}
                <ExternalLink size={12} />
              </a>
            ))}
          </div>

          <button
            className="follow-up-button"
            type="button"
            onClick={() => setFollowUpIndex((index) => (index + 1) % followUpQuestions.length)}
          >
            <span>追问</span>
            {followUpQuestions[followUpIndex]}
            <ChevronRight size={16} />
          </button>

          <button
            className={`save-decision ${saved ? "saved" : ""}`}
            type="button"
            onClick={() => {
              onSave(result.judgment);
              setSaved(true);
            }}
          >
            {saved ? <Check size={17} /> : <BookOpenCheck size={17} />}
            {saved ? "已存为决策" : "存为决策"}
          </button>
        </div>
      )}
    </aside>
  );
}
