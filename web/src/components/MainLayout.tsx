import { PropsWithChildren }  from 'react';
import { UserButton } from "@clerk/clerk-react";
import { LinkContainer } from 'react-router-bootstrap';

import publicIconSvg from '../../public/icon.svg';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container justify-content-between">
          <a className="navbar-brand align-items-center d-flex gap-1">
            <img src={publicIconSvg} height="24px"  />
            <LinkContainer to="/">
              <span role="button">Check Wallet</span>
            </LinkContainer>
          </a>
          <div>
            <UserButton />
          </div>
        </div>
      </nav>

      {children}
    </>
  );
}