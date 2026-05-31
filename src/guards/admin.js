'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// redux
import { useSelector } from 'src/lib/redux';
import { toast } from 'react-hot-toast';
import Loading from 'src/components/loading';
// next
import { useRouter } from '@bprogress/next';
import { usePathname } from 'next/navigation';

export default function Guest(props) {
  const { children } = props;
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setAdmin] = useState(true);
  const { isAuthenticated, user } = useSelector(({ user }) => user);

  useEffect(() => {
    if (!isAuthenticated) {
      setAdmin(false);
      toast.error("You're not allowed to access the dashboard");
      router.push('/auth/login?redirect=' + pathname);
    } else if (user?.role === 'user') {
      setAdmin(false);
      toast.error("You're not an admin to access the dashboard");
      router.push('/auth/login?redirect=' + pathname);
    }
  }, [isAuthenticated, user, pathname, router]);

  if (!isAdmin) {
    return <Loading />;
  }

  return children;
}

Guest.propTypes = {
  children: PropTypes.node.isRequired,
};
