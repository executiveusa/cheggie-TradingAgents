import { redirect } from 'next/navigation'

// Models page is an internal configuration view — not linked in primary nav.
// Redirect to settings for user-facing configuration.
export default function ModelsPage() {
  redirect('/settings')
}
