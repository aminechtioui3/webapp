import 'src/global.css';

import Fab from '@mui/material/Fab';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';

import Select from 'react-select';
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const selectStyles = {
    control: (base: any) => ({ ...base, backgroundColor: 'white', opacity: 1, boxShadow: 'none' }),
    menu:    (base: any) => ({ ...base, backgroundColor: 'white', opacity: 1 }),
    menuPortal: (base: any) => ({ ...base, backgroundColor: 'white', opacity: 1, zIndex: 9999 }),
    option:  (base: any, state: any) => ({ ...base, backgroundColor: state.isFocused ? '#f0f0f0' : 'white', color: 'black' }),
    singleValue: (base: any) => ({ ...base, color: 'black' }),
  };

  ;(Select as any).defaultProps = {
    ...((Select as any).defaultProps || {}),
    styles: selectStyles,
    menuPortalTarget: typeof document !== 'undefined' ? document.body : null,
    classNamePrefix: 'react‑select‑global',
  };
  const githubButton = (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/BOUROUIS-MOHAMED"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="eva:github-fill" />
    </Fab>
  );

  return (
    <ThemeProvider>
      <Router />
      {githubButton}
    </ThemeProvider>
  );
}


/*
import 'src/global.css';

import Fab from '@mui/material/Fab';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { ThemeProvider } from 'src/theme/theme-provider';
import { Iconify } from 'src/components/iconify';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import { AuthProvider } from './authConf';
import { SignInPage } from './routes/sections';
import { ActiveMembershipView } from './sections/user/view';
import { ProductsView } from './sections/product/view';
import ProtectedRoute from './ProtectedRoutes';




// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const githubButton = (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/BOUROUIS-MOHAMED"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="eva:github-fill" />
    </Fab>
  );

  return (
    <AuthProvider> 
    <ThemeProvider>
    <Router>
      <Routes> 
        <Route path="/login" element={<SignInPage />} /> 
        <Route
          path="/user"
          element={<ProtectedRoute element={<ActiveMembershipView />} />} // Pass component as element prop
        />
        <Route
          path="/products"
          element={<ProtectedRoute element={<ProductsView />} />} // Pass component as element prop
        />
        <Route path="/" element={<div>Home Page</div>} /> 
      </Routes>
    </Router>
    {githubButton}
  </ThemeProvider>
</AuthProvider>
);
}

*/ 