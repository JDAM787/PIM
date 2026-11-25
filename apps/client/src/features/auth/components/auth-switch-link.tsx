import { Link } from 'react-router-dom';

interface AuthSwitchLinkProps {
  prompt: string;
  to: string;
  label: string;
}

/** Pie de tarjeta para saltar entre login y registro. */
export function AuthSwitchLink({ prompt, to, label }: AuthSwitchLinkProps) {
  return (
    <>
      <span>{prompt}</span>
      <Link
        to={to}
        className="inline-flex min-h-11 items-center font-medium underline underline-offset-2 hover:text-primary"
      >
        {label}
      </Link>
    </>
  );
}
