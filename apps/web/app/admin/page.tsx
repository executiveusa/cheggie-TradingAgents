import { redirect } from 'next/navigation'

// The multi-tenant admin panel has been removed.
// This route redirects to the operator stack documentation.
export default function AdminPage() {
  redirect('/operator')
}
