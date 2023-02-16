import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={async (event) => {
        event.preventDefault()
        try {
          const response = await fetch("/api/v1/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email, name})
          })
          const data = await response.json()
          if (response.status >= 400 && response.status < 500) {
            // User input was incorrect or email already used
            setError(data.message)
            return
          }
          if (response.status >= 500) {
            // Something went wrong on the server that is not related to the user
            setError("Something went wrong")
            return
          }
        } catch(e) {
          // Handle network errors
          if (e instanceof Error) {
            setError(e.message)
          }
          return
        }
        // If everything went fine, navigate to the feed
        navigate("/")
      }}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
        />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
        />
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </>
  )
}
