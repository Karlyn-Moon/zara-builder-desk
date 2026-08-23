import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  GitFork,
  MessageSquareMore,
  SearchX,
  Star,
} from "lucide-react";
import { formatNumber, type Product } from "../data/zara";

type ProductWorkbenchProps = {
  products: Product[];
  selected: Product | null;
  favorites: string[];
  onSelect: (product: Product | null) => void;
  onFavorite: (id: string) => void;
  onMentor: (product: Product) => void;
};

function ProductRow({
  product,
  favorite,
  onSelect,
  onFavorite,
}: {
  product: Product;
  favorite: boolean;
  onSelect: () => void;
  onFavorite: () => void;
}) {
  return (
    <div className="product-row" data-testid={`product-${product.id}`}>
      <button
        className={`favorite-button ${favorite ? "is-favorite" : ""}`}
        type="button"
        title={favorite ? "取消收藏" : "收藏"}
        aria-label={favorite ? `取消收藏 ${product.name}` : `收藏 ${product.name}`}
        onClick={onFavorite}
      >
        <Star size={16} fill={favorite ? "currentColor" : "none"} />
      </button>
      <button className="product-main" type="button" onClick={onSelect}>
        <span className="product-mark" style={{ background: product.accent }} aria-hidden="true">
          {product.name.slice(0, 1)}
        </span>
        <span className="product-copy">
          <span className="product-name-line">
            <strong>{product.name}</strong>
            {product.featured && <span className="featured-dot" title="Zara 主页精选项目" />}
          </span>
          <span className="product-description">{product.description}</span>
        </span>
      </button>
      <span className="table-cell product-category">{product.category}</span>
      <span className="table-cell product-format">{product.format}</span>
      <span className="table-cell product-stars">
        <Star size={14} /> {formatNumber(product.stars)}
      </span>
      <button
        className="icon-button row-open"
        type="button"
        title="查看产品"
        aria-label={`查看 ${product.name}`}
        onClick={onSelect}
      >
        <ArrowRight size={17} />
      </button>
    </div>
  );
}

function ProductDetail({
  product,
  favorite,
  onBack,
  onFavorite,
  onMentor,
}: {
  product: Product;
  favorite: boolean;
  onBack: () => void;
  onFavorite: () => void;
  onMentor: () => void;
}) {
  return (
    <article className="product-detail">
      <div className="detail-toolbar">
        <button className="text-button compact" type="button" onClick={onBack}>
          <ArrowLeft size={17} /> 返回产品库
        </button>
        <div className="toolbar-actions">
          <button
            className={`icon-button ${favorite ? "is-favorite" : ""}`}
            type="button"
            title={favorite ? "取消收藏" : "收藏"}
            aria-label={favorite ? "取消收藏" : "收藏"}
            onClick={onFavorite}
          >
            <Star size={17} fill={favorite ? "currentColor" : "none"} />
          </button>
          <a className="icon-button" href={product.url} target="_blank" rel="noreferrer" title="打开 GitHub">
            <ExternalLink size={17} />
          </a>
        </div>
      </div>

      <header className="detail-header">
        <div>
          <div className="eyebrow-row">
            <span className="category-label">{product.category}</span>
            <span>{product.format}</span>
          </div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
        <button className="primary-button" type="button" onClick={onMentor}>
          <MessageSquareMore size={17} /> 带入导师
        </button>
      </header>

      <div className="product-visual" style={{ borderColor: product.accent }}>
        <img src={product.image} alt={`${product.name} GitHub 项目预览`} />
      </div>

      <div className="detail-metrics" aria-label="项目数据">
        <div>
          <span>GitHub Stars</span>
          <strong>{formatNumber(product.stars)}</strong>
        </div>
        <div>
          <span>Forks</span>
          <strong><GitFork size={15} /> {formatNumber(product.forks)}</strong>
        </div>
        <div>
          <span>主要语言</span>
          <strong>{product.language ?? "未标注"}</strong>
        </div>
        <div>
          <span>最近推送</span>
          <strong><CalendarDays size={15} /> {product.updatedAt}</strong>
        </div>
      </div>

      <section className="workflow-section">
        <div className="section-heading">
          <span className="section-index">01</span>
          <div>
            <h2>产品闭环</h2>
            <p>按公开仓库定位整理</p>
          </div>
        </div>
        <ol className="workflow-line">
          {product.workflow.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="source-strip">
        <div>
          <span className="status-dot verified" />
          <strong>公开来源已核对</strong>
          <p>简介与数据来自 GitHub；工作流是基于仓库定位的结构化归纳。</p>
        </div>
        <a href={product.url} target="_blank" rel="noreferrer">
          查看原始仓库 <ExternalLink size={15} />
        </a>
      </section>
    </article>
  );
}

export function ProductWorkbench({
  products,
  selected,
  favorites,
  onSelect,
  onFavorite,
  onMentor,
}: ProductWorkbenchProps) {
  if (selected) {
    return (
      <ProductDetail
        product={selected}
        favorite={favorites.includes(selected.id)}
        onBack={() => onSelect(null)}
        onFavorite={() => onFavorite(selected.id)}
        onMentor={() => onMentor(selected)}
      />
    );
  }

  return (
    <div className="product-table" role="list" aria-label="Zara 的公开产品">
      <div className="product-table-head" aria-hidden="true">
        <span />
        <span>产品</span>
        <span>方向</span>
        <span>形态</span>
        <span>热度</span>
        <span />
      </div>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            favorite={favorites.includes(product.id)}
            onSelect={() => onSelect(product)}
            onFavorite={() => onFavorite(product.id)}
          />
        ))
      ) : (
        <div className="empty-state">
          <SearchX size={28} />
          <strong>没有匹配的产品</strong>
          <p>换一个关键词或筛选条件。</p>
        </div>
      )}
    </div>
  );
}
