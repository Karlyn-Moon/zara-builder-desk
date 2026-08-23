import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Zara Desk", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("filters the public product catalog", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText("Frontend Slides")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /专注/ }));

    expect(screen.getByText("Reading Block")).toBeInTheDocument();
    expect(screen.getByText("Tab Out")).toBeInTheDocument();
    expect(screen.queryByText("Frontend Slides")).not.toBeInTheDocument();
  });

  it("opens a product evidence view", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "查看 Frontend Slides" }));

    expect(screen.getByRole("heading", { name: "Frontend Slides" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "产品闭环" })).toBeInTheDocument();
    expect(screen.getByText("公开来源已核对")).toBeInTheDocument();
  });

  it("turns a concrete problem into a structured decision", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByRole("textbox", { name: "描述你的问题" }),
      "我总是收藏长视频，但从来没有时间看完。",
    );
    await user.click(screen.getByRole("button", { name: /用公开作品审视/ }));

    expect(screen.getByText("当前判断")).toBeInTheDocument();
    expect(screen.getByText("需要挑战的假设")).toBeInTheDocument();
    expect(screen.getByText("最小交付物")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "存为决策" })).toBeInTheDocument();
  });

  it("shows verified Xiaohongshu topics with an evidence boundary", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      within(screen.getByRole("navigation", { name: "主导航" })).getByRole("button", { name: "思考索引" }),
    );

    expect(screen.getByText("公开笔记雷达")).toBeInTheDocument();
    expect(screen.getByText("Taste越来越重要，如何提升自己的 taste？")).toBeInTheDocument();
    expect(screen.getByText(/未登录状态无法读取正文/)).toBeInTheDocument();
  });
});
