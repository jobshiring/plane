'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

// components
import Table from 'src/components/table/table';
import UserRow from 'src/components/table/tableRows/users-list';
import RoleDialog from 'src/components/dialog/role';

// mock data
import { _users } from 'src/_mock/users';

const TABLE_HEAD = [
  { id: 'name', label: 'User' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'orders', label: 'Orders' },
  { id: 'role', label: 'Role' },
  { id: 'joined', label: 'Joined' },
  { id: '', label: 'Actions', alignRight: true },
];

export default function AdminUsers() {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('search')?.toLowerCase() || '';

  const initialUsers = Array.isArray(_users.data)
    ? _users.data
    : Array.isArray(_users)
    ? _users
    : [];

  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParam) {
      const filtered = users.filter(
        (u) =>
          `${u.firstName || ''} ${u.lastName || ''}`
            .toLowerCase()
            .includes(searchParam) ||
          u.email?.toLowerCase().includes(searchParam)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchParam, users]);

  const handleRoleChange = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers((prev) => {
        if (!Array.isArray(prev)) return prev;
        return prev.map((u) =>
          u._id === id
            ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' }
            : u
        );
      });
      toast.success('User role updated!');
      setLoading(false);
      setId(null);
    }, 600);
  };

  return (
    <>
      <RoleDialog
        open={Boolean(id)}
        onClose={() => setId(null)}
        onClick={handleRoleChange}
        loading={loading}
      />

      <Table
        headData={TABLE_HEAD}
        data={{ data: filteredUsers }}
        isLoading={loading}
        row={UserRow}
        setId={setId}
        isSearch
      />
    </>
  );
}
