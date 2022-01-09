import {
  BiBroadcast as LiveIcon,
  BiRadio as RadioIcon,
  BiNews as ArticleIcon,
} from "react-icons/bi";
import { Link, NavLink } from "remix";
import { Container } from "./Container";

type Props = {};

const menus = [
  { title: "Online", icon: () => <LiveIcon size={16} />, to: "/" },
  { title: "Radio", icon: () => <RadioIcon size={16} />, to: "/radio" },
  { title: "Artikel", icon: () => <ArticleIcon size={16} />, to: "/article" },
];

export function Footer(props: Props) {
  return (
    <footer className="bg-white border-t border-t-gray-200">
      <Container>
        <nav className="flex">
          {menus.map((menu) => (
            <NavLink
              key={menu.title}
              to={menu.to}
              className={({ isActive }) =>
                `flex flex-col justify-center items-center flex-1 p-2 text-center text-xs ${
                  isActive ? "text-teal-600" : ""
                }`
              }
            >
              {menu.icon()}
              <small>{menu.title}</small>
            </NavLink>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
