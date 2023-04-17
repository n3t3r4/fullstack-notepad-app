import { Link } from "react-router-dom";
import Logo from "../../src/Note-Logo.png";

export function AppBar() {
  return (
    <div className="bg-gray-100 shadow-lg flex justify-center items-center h-20 w-auto">
      <Link to="/">
        <img src={Logo} className="max-w-[4rem]" />
      </Link>
    </div>
  );
}
