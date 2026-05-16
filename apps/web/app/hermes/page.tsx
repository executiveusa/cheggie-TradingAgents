import { redirect } from 'next/navigation'

// Legacy route — redirect to the assistant page
export default function LegacyRedirectPage() {
  redirect('/assistant')
}
