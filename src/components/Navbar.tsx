import {
  AiOutlineBug,
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineTeam,
} from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Logout from "./LoginComponents/Logout";

interface Props {
  isOpen: boolean
}

export const Navbar = ({isOpen}: Props) => {
  const Menu: Array<string> = ["Dashboard", "Projects", "Tickets", "Team"];
  const Icons = [
    <AiOutlineHome size="24" color="#9AD2D9" />,
    <AiOutlineAppstore size="24" color="#9AD2D9" />,
    <BiTask size="24" color="#9AD2D9" />,
    <AiOutlineTeam size="24" color="#9AD2D9" />,
  ];

  function CustomLink(item: string, index: number) {
    const resolvedPath = useResolvedPath(renderSwitch(index));
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <Link to={renderSwitch(index)} key={index}>
        <li
          className={`mx-2 mt-4 flex items-center gap-2 rounded px-1 ${
            isActive ? "bg-[#1D3557]" : null
          }`}
        >
          <div className="flex cursor-pointer items-center gap-2">
            {Icons[index]}
            <h2 className="flex w-fit text-white xl:text-xl" key={item}>
              {item}
            </h2>
          </div>
        </li>
      </Link>
    );
  }

  function renderSwitch(index: number): string {
    switch (index) {
      case 0:
        return "/";
        break;
      case 1:
        return "/projects";
        break;
      case 2:
        return "/tickets";
        break;
      case 3:
        return "/team";
        break;
      default:
        return "/";
    }
  }

  return (
    <section
      className={
        isOpen
          ? "fixed z-20 h-full w-3/5 flex-col bg-[#457b9d] md:flex md:max-h-screen md:w-1/6 border-r-2 border-black "
          : "z-0 hidden max-h-screen  w-2/5 flex-col bg-[#457b9d] md:flex md:w-1/6"
      }
    >
      <div className="relative mt-4 flex w-full flex-col gap-5 pt-4">
        <Link to="/">
          <span className="mb-10 flex cursor-pointer items-center justify-center gap-2 ">
            <AiOutlineBug size="24" color="#64C2CA" />
            <h2 className="flex w-fit font-bold text-white md:text-xl">
              Bug Tracker
            </h2>
          </span>
        </Link>

        <ul>
          {Menu.map((item, index) => {
            return CustomLink(item, index);
          })}
        </ul>
        <Logout />
      </div>
    </section>
  );
};
