import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submitFn = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submitFn(null, { action: "/logout", method: "POST" });
      return;
    }

    const tokenDuration = getTokenDuration()
    console.log('tokenDuration: ', tokenDuration)

    setTimeout(() => {
      submitFn(null, { action: "/logout", method: "POST" });
    }, tokenDuration); // 1 hour
  }, [token]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
