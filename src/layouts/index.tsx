import { Link, Outlet } from "umi";
import s from "./index.less";

export default function Layout() {
  return (
    <div className={s.root}>
      <Outlet />
    </div>
  );
}
