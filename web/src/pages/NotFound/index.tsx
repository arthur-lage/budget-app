import { Link } from "react-router-dom";

export function NotFound () {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Sorry, we couldn't find this page!</p>
      <Link to="/">Return to Home</Link>
    </div>
  )
}