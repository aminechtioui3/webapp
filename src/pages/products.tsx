import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProductsView } from 'src/sections/product/view';
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
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
