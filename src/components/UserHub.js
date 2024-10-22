import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/Contexts";
import WorkProfile from "./WorkProfile";
import useSwitchCollection from "@/customHooks/useSwitchCollection";
import UserInfo from "./UserInfo";
import { useRouter } from "next/router";
import capitalizeStr from "@/functions/capitalizeStr";

const sendToFetchData = (token, section, data, user) => {
  const { id, collection } = section;
  return { id, token, collection, data, user };
};

export default function UserHub() {
  const { userData } = useContext(UserContext);
  const router = useRouter();

  if (!userData) return;

  const { user } = userData;
  let id;

  if (user.user) {
    id = user.user._id;
  }
  const { token } = user;

  // Array of objects returned from the requested data
  const [data, setData] = useState(null);
  // Use above information to get data from backend
  const [section, setSection] = useState({ id, collection: "projects" });

  // Prepares data into object
  const params = sendToFetchData(
    token,
    { id: section.id, collection: section.collection },
    data,
    user.user
  );

  const { requestedData, loading, error } = useSwitchCollection(params);

  useEffect(() => {
    // When data is successfully retrieved from backend, add to data state
    if (loading === true || data) return;
    setData(requestedData);
  }, [requestedData]);

  useEffect(() => {
    // When section is changed, reset data value to enable retrieval of new data
    setData(null);
  }, [section]);

  useEffect(() => {}, [data]);

  const visitAccountPage = () => {
    router.push({
      pathname: "/account/",
    });
  };

  return (
    <div className="font-comfort flex w-full h-full justify-center text-gray-800 mt-2">
      {error && <div>Error</div>}
      <div className="flex flex-row w-full h-full justify-center">
        <UserInfo
          visitAccountPage={visitAccountPage}
          user={user.user}
          token={token}
        />
        <div className="flex flex-col justify-center">
          <div className="flex justify-center text-3xl">
            {capitalizeStr(section.collection)}
          </div>
          {loading && <div>Loading...</div>}
          {data && data.length === 0 && (
            <h1>You don&apos;t have any {section.collection}</h1>
          )}
          {data && (
            <WorkProfile
              data={data}
              setData={setData}
              changeSection={setSection}
              section={section}
            />
          )}
        </div>
      </div>
    </div>
  );
}
