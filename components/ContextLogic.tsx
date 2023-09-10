import { useEffect, useState } from "react";
import {
  UserDataContext,
  SelectedEntityContext,
} from "../components/contexts/userContext";
import { useSession } from "next-auth/react";

export default function ContextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState();
  const [selectedEntity, setSelectedEntity] = useState();

  const NA: any = useSession();

  const setDefaultSelectedEntity = () => {
    if (NA.status == "authenticated" && NA.data?.linkedEntities?.length > 0) {
      setSelectedEntity(NA.data?.linkedEntities[0]);

      return NA.data?.linkedEntities[0];
    }
  };

  useEffect(() => {
    if (!selectedEntity) {
      setDefaultSelectedEntity();
    }
  }, [NA]);

  return (
    <UserDataContext.Provider value={[userData, setUserData]}>
      <SelectedEntityContext.Provider
        value={[selectedEntity, setSelectedEntity]}
      >
        {children}
      </SelectedEntityContext.Provider>
    </UserDataContext.Provider>
  );
}
