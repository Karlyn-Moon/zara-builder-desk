import { ExternalLink, GitBranch, Heart, RefreshCw } from "lucide-react";
import { allSources, profile } from "../data/zara";

export function SourceView() {
  return (
    <div className="source-view">
      <div className="source-summary-band">
        <div>
          <GitBranch size={20} />
          <span>GitHub</span>
          <strong>{allSources.filter((source) => source.type === "GitHub").length} 个已核对来源</strong>
        </div>
        <div>
          <Heart size={20} />
          <span>小红书 · {profile.xiaohongshuName}</span>
          <strong>{profile.xiaohongshuLikes} 次赞与收藏</strong>
        </div>
        <div>
          <RefreshCw size={20} />
          <span>核对日期</span>
          <strong>2026-08-02</strong>
        </div>
      </div>

      <div className="source-list">
        <div className="source-list-head" aria-hidden="true">
          <span>来源</span>
          <span>类型</span>
          <span>状态</span>
          <span>说明</span>
          <span />
        </div>
        {allSources.map((source) => (
          <div className="source-row" key={source.id}>
            <strong>{source.label}</strong>
            <span>{source.type}</span>
            <span className={`source-status ${source.status}`}>
              <span className={`status-dot ${source.status}`} />
              {source.status === "verified" ? "已核对" : "受限"}
            </span>
            <p>{source.note}</p>
            <a className="icon-button" href={source.url} target="_blank" rel="noreferrer" title="打开来源">
              <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
