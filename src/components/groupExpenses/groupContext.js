import React, { createContext, useEffect, useState } from "react";
import LoaderComponent from "../../components/globalComponents/LoaderComponent/index";
import axiosInstance from "../../Base/api/axios";
import ApiUrls from "../../Base/api/apiUrls";

const GroupContextBase = createContext({});
const GroupContext = ({ children, match }) => {
  const [groupMetaData, setGroupMetadata] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getGroupExpensesMetaData = async () => {
    try {
      const groupId = match.params.id;
      setLoading(true);
      const res = await axiosInstance.get(ApiUrls.GET_GROUP_METADATA(groupId));
      const formatedUsersData = res.data.group_members.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      const data = {
        ...res.data,
        group_members: formatedUsersData,
      };

      setGroupMetadata(data);
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGroupExpensesMetaData();
  }, []);

  if (isLoading) {
    return <LoaderComponent position="center" />;
  }
  return (
    <GroupContextBase.Provider
      value={{
        getGroupExpensesMetaData,
        groupMetaData,
        setGroupMetadata,
        isLoading,
      }}
    >
      {children}
    </GroupContextBase.Provider>
  );
};

GroupContextBase.Wrapper = GroupContext;
export default GroupContextBase;
