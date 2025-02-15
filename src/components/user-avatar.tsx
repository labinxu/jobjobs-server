import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  image?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
}

const UserAvatar = ({ image, name, email }: UserAvatarProps) => {
  let initials = "";
  if (name) {
    const nameParts = name.split(" ");
    initials = nameParts.map((part) => part[0].toUpperCase()).join("");
  } else if (email) {
    initials = email[0].toUpperCase();
  }

  return (
    <Avatar>
      {image ? (
        <AvatarImage src={image} alt={name || "User Avatar"} />
      ) : (
        <AvatarFallback>{initials || "Guest"}</AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
