import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserProfile
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import { Main } from "./components/Main";
import { Home } from "./components/Home";
import { Favorites } from "./components/Favorites";
import { CenterLayout } from "./components/CenterLayout";

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key")
}

export function Clerk() {
  const navigate = useNavigate();

  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
      >
      <Routes>
        <Route path="/" element={<>
            <SignedIn>
              <Main />
            </SignedIn>
            <SignedOut>
              <Home />
            </SignedOut>
          </>} 
        />
        <Route path="/favorites" element={<>
            <SignedIn>
              <Favorites />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>} 
        />
        <Route
          path="/sign-in/*"
          element={<CenterLayout><SignIn routing="path" path="/sign-in" /></CenterLayout>}
        />
        <Route
          path="/sign-up/*"
          element={<CenterLayout><SignUp routing="path" path="/sign-up" /></CenterLayout>}
        />
        <Route
          path="/user"
          element={<CenterLayout><UserProfile routing="path" path="/user" /></CenterLayout>}
        />
      </Routes>
    </ClerkProvider>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Clerk />
    </BrowserRouter>
  )
}