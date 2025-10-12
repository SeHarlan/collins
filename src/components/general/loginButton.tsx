import { useAuth } from "@/lib/auth/hooks";
import { Button } from "../ui/button";
import { Loader2Icon, LogInIcon, LogOutIcon, WalletIcon } from "lucide-react";

interface LoginButtonProps { 
  className?: string;
}
export const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
  const { isAuthenticated, authReady, login, logout } = useAuth();

  if (!authReady) {
    return (
      <Button disabled className={className}>
        Loading... <Loader2Icon className="animate-spin" />
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <Button onClick={logout} className={className}>
        Logout <LogOutIcon />
      </Button>
    );
  }

  return (
    <Button onClick={login} className={className}>
      Login <LogInIcon />
    </Button>
  );
}