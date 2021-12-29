import { Link } from "remix";
import { BiUser as UserIcon } from "react-icons/bi";

export function Header() {
  return (
    <header className="bg-teal-500 text-white p-4 border-b border-b-teal-600 shadow-sm">
      <div className="container max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-semibold hover:opacity-80">
          YukTaklim!
        </Link>
        <Link to="/login" className="flex items-center hover:opacity-80">
          <UserIcon className="mr-1" />
          Log in
        </Link>
      </div>
    </header>
  );
}
