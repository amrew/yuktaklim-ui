import {
  BiBroadcast as LiveIcon,
  BiRadio as RadioIcon,
  BiNews as ArticleIcon,
} from "react-icons/bi";
import { Link } from "remix";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-white border-t border-t-gray-200">
      <Container>
        <nav className="flex">
          <Link
            to="/"
            className="flex flex-col justify-center items-center flex-1 p-2 text-center text-xs text-teal-600"
          >
            <LiveIcon size={16} />
            <small>Online</small>
          </Link>
          <Link
            to="/radio"
            className="flex flex-col justify-center items-center flex-1 p-2 text-center text-xs"
          >
            <RadioIcon size={16} />
            <small>Radio</small>
          </Link>
          <div className="flex flex-col justify-center items-center flex-1 p-2 text-center text-xs">
            <ArticleIcon size={16} />
            <small>Artikel</small>
          </div>
        </nav>
      </Container>
    </footer>
  );
}
