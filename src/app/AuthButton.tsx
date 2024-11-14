"use client"
import { useRouter } from "next/navigation"
import { signIn, signOut } from "next-auth/react"


export const LoginButton = () => {
    const router = useRouter()
    return <button className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={() => router.push('/auth/login')}>Login</button>
}

export const LoginLink = () => {
    const router = useRouter()
    return <a className="text-black hover:underline" onClick={() => router.push('/auth/login')}>Login here</a>
}

export const SignUpLink = () => {
    const router = useRouter()
    return <a className="text-black hover:underline" onClick={() => router.push('/auth/signup')}>Sing Up here</a>
}

export function LoginGit() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/" })}
      className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
    >
      <svg className="w-4" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
        />
      </svg>
      Sign in with Github
    </button>
  )
}

//onClick={() => signIn("GithubProvider", { callbackUrl: "/" })}
export const LogoutButton = () => {
  return <button
  type="button" // Changé de 'submit' à 'button'
  onClick={async () => {
      await signOut({ 
          redirect: true,
          callbackUrl: '/auth/login'
      })
  }}
  className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-5 opacity-75"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>

    <span
      className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
    >
      Logout
    </span>
  </button>
}



//onClick={() => signOut()}