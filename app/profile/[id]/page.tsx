import { FC } from "react";
import { getUserProjects } from "@/session/actions";
import { UserProfile } from "@/common.types";
import ProfileComponent from "@/components/profile.component";

type UserProfileProps = {
  params: {
    id: string;
  };
};

const UserProfile: FC<UserProfileProps> = async ({ params }) => {
  const result = (await getUserProjects(params.id, 100)) as {
    user: UserProfile;
  };

  if (!result?.user)
    return <p className="no-result-text">Failed to fetch user info</p>;

  return <ProfileComponent user={result.user} />;
};

export default UserProfile;
