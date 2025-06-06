import {useState, useEffect} from "react";
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import {useRouter} from "../routes/hooks";

import {checkIfTokenExist} from "../sections/services/AccountService";
import {NotificationView} from "../sections/Notification/view/notification-view";

// ----------------------------------------------------------------------

export default function Page() {
  const [isTokenValid, setIsTokenValid] = useState(false); // State to store token validity
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await checkIfTokenExist(); // Await the result of the checkIfTokenExist function
      if (!isValid) {
        router.push('/sign-in'); // Redirect to the sign-in page if token is not valid
      }
      setIsTokenValid(isValid); // Update the state based on token validity
    };

    checkToken(); // Run the token check when the component mounts
  }, [router]);

  if (!isTokenValid) {
    return null; // Optionally render a loading spinner here if needed while waiting for the token check
  }
  return (
      <>
        <Helmet>
          <title> {`Notifications - ${CONFIG.appName}`}</title>
        </Helmet>

        <NotificationView />
      </>
  );
}
