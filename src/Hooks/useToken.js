import { useEffect, useState } from "react";
import { useCreateOrLoginUserMutation } from "../redux/api/userApi";

const useToken = (user) => {
  const [createOrLoginUser] = useCreateOrLoginUserMutation();
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      if (user?.user?.email && user?.user?.displayName) {
        const email = user?.user?.email;
        const name = user?.user?.displayName;
        const userData = { name, email };

        const result = await createOrLoginUser(userData);
        localStorage.setItem(
          "accessToken",
          result?.data?.data?.data?.accessToken
        );
        setToken(result?.data?.data?.data?.accessToken);
      }
    };

    fetchToken();
  }, [user?.user?.email, user?.user?.displayName, createOrLoginUser]);

  return { token };
};
export default useToken;
