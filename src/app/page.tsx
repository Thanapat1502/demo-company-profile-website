import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to Thai locale by default
  redirect('/th');
}
