import { signal }  from '@preact/signals-react';
import { Button, Alert } from 'react-bootstrap';
import { UserButton } from "@clerk/clerk-react";

const show$ = signal(true);

export function Main() {
  return (
    <>
      <UserButton />

      <h1>Main</h1>

      <Alert show={show$.value} variant="success">
        <Alert.Heading>My Alert</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => (show$.value = false)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>

      {!show$.value && <Button onClick={() => (show$.value = true)}>Show Alert</Button>}
    </>
  );
}
