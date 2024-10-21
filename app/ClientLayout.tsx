'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(false)
        if (event === 'SIGNED_IN') {
          router.refresh()
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
