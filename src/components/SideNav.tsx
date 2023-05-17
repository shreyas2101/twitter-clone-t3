import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import IconHoverEffect from "./IconHoverEffect";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
import { type IconType } from "react-icons";

interface INavItem extends INavItemContent {
  route: string;
}

interface INavItemContent {
  icon: IconType;
  label: string;
  color?: "green" | "red";
}

function NavItemContent({ color, icon, label }: INavItemContent) {
  const Icon = icon;
  const colorClass =
    color === "red"
      ? "text-red-700"
      : color === "green"
      ? "text-green-700"
      : "";

  return (
    <IconHoverEffect>
      <span className={`flex items-center gap-4 ${colorClass}`}>
        <Icon className={`h-8 w-8`} />
        <span className={`hidden text-lg md:inline`}>{label}</span>
      </span>
    </IconHoverEffect>
  );
}

function NavItem({ route, icon, label, color }: INavItem) {
  return (
    <li>
      <Link href={route}>
        {<NavItemContent icon={icon} label={label} color={color} />}
      </Link>
    </li>
  );
}

export default function SideNav() {
  const session = useSession();
  const user = session.data?.user ?? null;
  // console.log(user);
  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <NavItem icon={VscHome} route="/" label="Home" />

        {user !== null ? (
          <NavItem
            icon={VscAccount}
            route={`/profiles/${user?.id ?? ""}`}
            label="Profile"
          />
        ) : null}

        {user === null ? (
          <li>
            <button onClick={() => void signIn()}>
              <NavItemContent label="Log In" color="green" icon={VscSignIn} />
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>
              <NavItemContent label="Log Out" color="red" icon={VscSignOut} />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
