import { LinkContainer } from 'react-router-bootstrap';
import { MainLayout } from './MainLayout';
import { Rate } from './rate/Rate';
import { rateStore } from '../stores/rate-store';
import { observer } from 'mobx-react-lite';

export const Favorites = observer(() => {
  return (
    <MainLayout>
      <LinkContainer to="/">
        <div className="container my-3 d-flex gap-1 align-items-center" role="button">
          <i className="bi bi-chevron-left"></i>
          <span>Back</span>
        </div>
      </LinkContainer>
      <Rate/>
      <div className="container my-3">
        <h1>Favorites</h1>

        <p>{rateStore.selectedCurrency?.name} : {rateStore.selectedCurrency?.ethCost}</p>
      </div>
    </MainLayout>
  );
});
