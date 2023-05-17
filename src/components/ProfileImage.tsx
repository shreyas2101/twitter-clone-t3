import Image from "next/image";
import { VscAccount } from "react-icons/vsc";

interface IProfileImage {
  src?: string | null;
  className?: string;
}

export default function ProfileImage({
  src = null,
  className = "",
}: IProfileImage) {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src === null ? (
        <VscAccount className="h-full w-full" />
      ) : (
        <Image src={src} alt="Profile Image" quality={100} fill />
      )}
    </div>
  );
}
