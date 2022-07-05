import React, { FC } from 'react';
import { NotFoundPageWrapper } from './404.styles';

interface NotFoundPageProps {}

const NotFoundPage: FC<NotFoundPageProps> = ({}: NotFoundPageProps) => {
  return (
    <NotFoundPageWrapper>
      <p>
        <span>404</span> Page not found.
      </p>
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;
