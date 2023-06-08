import { PropsWithChildren }  from 'react';

export function CenterLayout({ children }: PropsWithChildren) {
  return (
    <div className="d-flex justify-content-center">
      {children}
    </div>
  );
}