import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const accountType = requestUrl.searchParams.get('account_type')

  const supabase = createRouteHandlerClient({ cookies })

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)

    // Set the account type in user metadata if it's provided
    if (accountType) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.auth.updateUser({
          data: { account_type: accountType }
        })
      }
    }
  }

  // Redirect based on account type
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.user_metadata?.account_type === 'employer') {
    return NextResponse.redirect(`${requestUrl.origin}/employer-dashboard`)
  } else {
    return NextResponse.redirect(`${requestUrl.origin}/profile`)
  }
}
