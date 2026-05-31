'use client';
import { useEffect, useState } from 'react';
import { useRouter } from '@bprogress/next';
import { useSelector } from 'src/lib/redux';
import Loading from 'src/components/loading';
import PropTypes from 'prop-types';

Guest.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Guest(props) {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useSelector(({ user }) => user);
  const [isAuth, setAuth] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setAuth(false);
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuth) {
    return <Loading />;
  }

  return children;
}
