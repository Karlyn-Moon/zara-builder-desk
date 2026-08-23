import { useEffect, useMemo, useState } from "react";
import {
  Archive,
  BookOpenText,
  Boxes,
  ExternalLink,
  GitBranch,
  Menu,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { ProductWorkbench } from "./components/ProductWorkbench";
import { SourceView } from "./components/SourceView";
import { ThinkingIndex } from "./components/ThinkingIndex";
import { ThinkingMentor } from "./components/ThinkingMentor";
import {
  principles,
  products,
  profile,
  type Principle,
  type Product,
  type ProductCategory,
} from "./data/zara";

type View = "products" | "thinking" | "sources";
type CategoryFilter = "全部" | ProductCategory;

const categories: CategoryFilter[] = ["全部", "表达", "信息", "工作流", "专注"];

const navItems: Array<{ id: View; label: string; icon: typeof Boxes }> = [
  { id: "products", label: "产品", icon: Boxes },
  { id: "thinking", label: "思考索引", icon: BookOpenText },
  { id: "sources", label: "来源", icon: Archive },
];

function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

function App() {
  const [view, setView] = useStoredState<View>("zara-desk-view", "products");
  const [category, setCategory] = useState<CategoryFilter>("全部");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useStoredState<string[]>("zara-desk-favorites", []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mentorContext, setMentorContext] = useState<Product | null>(null);
  const [mentorPrompt, setMentorPrompt] = useStoredState("zara-desk-draft", "");
  const [mentorOpen, setMentorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [decisions, setDecisions] = useStoredState<string[]>("zara-desk-decisions", []);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products
      .filter((product) => category === "全部" || product.category === category)
      .filter((product) => !favoritesOnly || favorites.includes(product.id))
      .filter((product) => {
        if (!normalized) return true;
        return [product.name, product.description, product.category, product.format, product.language]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalized));
      })
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.stars - a.stars);
  }, [category, favorites, favoritesOnly, query]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const openMentorWithProduct = (product: Product) => {
    setMentorContext(product);
    setMentorPrompt(`我想借鉴 ${product.name} 的产品路径，审视这个问题：`);
    setMentorOpen(true);
  };

  const askPrinciple = (principle: Principle) => {
    setMentorPrompt(`${principle.mentorQuestion}\n\n我的具体情况是：`);
    setMentorOpen(true);
  };

  const switchView = (nextView: View) => {
    setView(nextView);
    setSelectedProduct(null);
    setMobileMenuOpen(false);
  };

  const viewMeta = {
    products: {
      title: selectedProduct ? selectedProduct.name : "产品工作台",
      meta: selectedProduct ? "产品详情与公开证据" : `${products.length} 个公开产品 · 47.8k GitHub stars`,
    },
    thinking: {
      title: "思考索引",
      meta: `${principles.filter((item) => item.kind === "direct").length} 条公开原话 · ${principles.filter((item) => item.kind === "pattern").length} 条模式归纳`,
    },
    sources: { title: "来源账本", meta: "每个判断都能回到公开出处" },
  }[view];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="brand-block">
          <div className="brand-mark">Z/</div>
          <div className="brand-copy">
            <strong>ZARA DESK</strong>
            <span>BUILDER WORKSPACE</span>
          </div>
          <button
            className="icon-button mobile-menu-close"
            type="button"
            title="关闭菜单"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={17} />
          </button>
        </div>

        <nav className="side-nav" aria-label="主导航">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={view === item.id ? "active" : ""}
                type="button"
                title={item.label}
                onClick={() => switchView(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.id === "products" && <small>{products.length}</small>}
              </button>
            );
          })}
          <button className="mentor-nav" type="button" title="打开思考导师" onClick={() => setMentorOpen(true)}>
            <Sparkles size={18} />
            <span>思考导师</span>
            {decisions.length > 0 && <small>{decisions.length}</small>}
          </button>
        </nav>

        <div className="sidebar-spacer" />

        {decisions.length > 0 && (
          <div className="latest-decision">
            <span>最近决策</span>
            <p>{decisions[0]}</p>
          </div>
        )}

        <div className="profile-block">
          <img src={profile.avatar} alt="Zara Zhang 的 GitHub 头像" />
          <div>
            <strong>{profile.name}</strong>
            <span>{profile.bio}</span>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" title="打开 GitHub">
            <ExternalLink size={15} />
          </a>
        </div>
      </aside>

      {mobileMenuOpen && <button className="sidebar-scrim" type="button" aria-label="关闭菜单" onClick={() => setMobileMenuOpen(false)} />}

      <main className="workspace">
        <header className="workspace-header">
          <button className="icon-button mobile-menu-button" type="button" title="打开菜单" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={18} />
          </button>
          <div className="page-title">
            {view === "products" && selectedProduct ? (
              <span className="workspace-title">产品详情</span>
            ) : (
              <h1>{viewMeta.title}</h1>
            )}
            <span>{viewMeta.meta}</span>
          </div>
          <div className="header-tools">
            {view === "products" && !selectedProduct && (
              <label className="search-field">
                <Search size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="search"
                  placeholder="搜索产品、形态或技术"
                  aria-label="搜索产品"
                />
                {query && (
                  <button type="button" title="清除搜索" aria-label="清除搜索" onClick={() => setQuery("")}>
                    <X size={14} />
                  </button>
                )}
              </label>
            )}
            <button
              className="icon-button mentor-trigger"
              type="button"
              title="打开思考导师"
              onClick={() => setMentorOpen(true)}
            >
              <Sparkles size={17} />
            </button>
            <a className="icon-button github-link" href={profile.github} target="_blank" rel="noreferrer" title="Zara 的 GitHub">
              <GitBranch size={18} />
            </a>
          </div>
        </header>

        {view === "products" && !selectedProduct && (
          <div className="filter-bar">
            <div className="category-tabs" aria-label="产品分类">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                  <span>
                    {item === "全部" ? products.length : products.filter((product) => product.category === item).length}
                  </span>
                </button>
              ))}
            </div>
            <button
              className={`filter-toggle ${favoritesOnly ? "active" : ""}`}
              type="button"
              title="只看收藏"
              onClick={() => setFavoritesOnly((current) => !current)}
            >
              {favoritesOnly ? <Star size={15} fill="currentColor" /> : <SlidersHorizontal size={15} />}
              <span>{favoritesOnly ? "已收藏" : "筛选"}</span>
            </button>
          </div>
        )}

        <div className="workspace-scroll">
          {view === "products" && (
            <ProductWorkbench
