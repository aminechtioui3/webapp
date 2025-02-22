import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/overview/view';
import {useEffect, useState} from "react";
import {useRouter} from "../routes/hooks";
import {checkIfTokenExist} from "../sections/services/AccountService";

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
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}
