"use client";
import { useEffect, useState } from "react";

export default function useLocalData(key, initial = []) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  const createItem = (item) => {
    setData((prev) => [...prev, { ...item, _id: Date.now(), createdAt: new Date() }]);
  };

  const updateItem = (id, updated) => {
    setData((prev) =>
      prev.map((item) => (item._id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteItem = (id) => {
    setData((prev) => prev.filter((item) => item._id !== id));
  };

  return { data, createItem, updateItem, deleteItem, setData };
}
