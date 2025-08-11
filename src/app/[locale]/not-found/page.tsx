import { notFound } from 'next/navigation';

export default function NotFoundTestPage() {
  // This page will always trigger the 404
  notFound();
}
