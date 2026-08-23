import { ExternalLink, Heart, MessageSquareMore, Quote } from "lucide-react";
import { allSources, socialNotes, type Principle } from "../data/zara";

export function ThinkingIndex({
  principles,
  onAsk,
}: {
  principles: Principle[];
  onAsk: (principle: Principle) => void;
}) {
  return (
    <div className="thinking-index">
      <section className="social-evidence-band">
        <div className="social-band-heading">
          <div>
            <span>小红书 · 张咋啦</span>
            <h2>公开笔记雷达</h2>
          </div>
          <a href={socialNotes[0].url} target="_blank" rel="noreferrer">
            查看主页 <ExternalLink size={14} />
          </a>
        </div>
        <div className="social-note-grid">
          {socialNotes.map((note) => (
            <a key={note.title} href={note.url} target="_blank" rel="noreferrer">
              <span>{note.title}</span>
              <small><Heart size={11} /> {note.engagement}</small>
            </a>
          ))}
        </div>
        <p className="social-limit">标题与主页数据已核对；未登录状态无法读取正文，导师不会根据标题虚构细节。</p>
      </section>
      {principles.map((principle, index) => (
        <article className="principle-row" key={principle.id}>
          <div className="principle-number">{String(index + 1).padStart(2, "0")}</div>
          <div className="principle-content">
            <div className="principle-title-line">
              <h2>{principle.title}</h2>
              <span className={`evidence-tag ${principle.kind}`}>
                {principle.kind === "direct" ? "公开原话" : "模式归纳"}
              </span>
            </div>
            <blockquote>
              <Quote size={18} />
              <p>{principle.statement}</p>
            </blockquote>
            <p className="evidence-copy">{principle.evidence}</p>
            <div className="principle-footer">
              <div className="source-links">
                {principle.sourceIds.map((sourceId) => {
                  const source = allSources.find((item) => item.id === sourceId);
                  if (!source) return null;
                  return (
                    <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
                      {source.label} <ExternalLink size={12} />
                    </a>
                  );
                })}
              </div>
              <button className="text-button compact" type="button" onClick={() => onAsk(principle)}>
                <MessageSquareMore size={16} /> 用它审视我的问题
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
