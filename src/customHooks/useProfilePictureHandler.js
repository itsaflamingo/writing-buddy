import { useEffect, useState } from "react";
import defaultPicture from "../images/defaultProfilePicture";
export default function useProfilePictureHandler({ profilePicture }) {
  const [picture, setPicture] = useState(profilePicture);

  useEffect(() => {
    if (!profilePicture) setPicture(defaultPicture);
  }, [profile]);

  return picture;
}
