import { LinkContainer } from 'react-router-bootstrap';
import { MainLayout } from './MainLayout';
import { Rate } from './rate/Rate';
import { FavoritesList } from './FavoritesList';

export function Favorites() {
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

        <FavoritesList />
      </div>
    </MainLayout>
  );
}
