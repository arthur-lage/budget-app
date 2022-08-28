import { useAuth } from "../../hooks/useAuth"

export function Home () {
  const { currentUser } = useAuth()
  
  return (
    <div>
      <h1>Home</h1>
      <h2>Hello, {currentUser?.name}</h2>
    </div>
  )
}