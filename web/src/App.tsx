import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  useAuth,
  UserProfile,
  useUser
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Main } from "./components/Main";
import { Home } from "./components/Home";
import { Favorites } from "./components/Favorites";
import { CenterLayout } from "./components/CenterLayout";
import { useEffect } from "react";
import { authStore } from "./stores/lib/auth-store";
import { transaction } from "mobx";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key")
}

function Content() {
  return (
    <Routes>
      <Route path="/" element={<>
          <SignedIn>
            <ClerkUser><Main /></ClerkUser>
          </SignedIn>
          <SignedOut>
            <Home />
          </SignedOut>
        </>}
      />
      <Route path="/favorites" element={<>
          <SignedIn>
            <ClerkUser><Favorites /></ClerkUser>
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
  )
}

function ClerkUser(props: React.PropsWithChildren) {
  const { isSignedIn, user, isLoaded } = useUser();
  if (isLoaded && isSignedIn && user) {
    return props.children;
  }
  return null;
}

function ClerkAuthConnector() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  useEffect(() => {
    transaction(() => {
      authStore.getTokenDelegate = getToken;
      authStore.isLoaded = isLoaded;
      authStore.isSignedIn = isSignedIn || false;
    });
  }, [getToken, isLoaded, isSignedIn]);

  return null;
}

function Clerk() {
  const navigate = useNavigate();

  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
      >
        <ClerkAuthConnector />
        <Content />
        <ToastContainer />
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