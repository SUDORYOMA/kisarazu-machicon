import { useNavigate, useLocation, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import routes from "./config";

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
  }
}

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  const element = useRoutes(routes);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    window.REACT_APP_NAVIGATE = navigate;
    navigateResolver(window.REACT_APP_NAVIGATE);
  });
  // ページ遷移時：#events などのハッシュがあればそのセクションへ、無ければ先頭へ
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      // 描画後に要素が出来てからスクロールする
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return element;
}
