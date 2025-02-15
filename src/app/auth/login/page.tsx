import LoginForm from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";

export default async function Login() {
  return (
    <section>
      <Card>
        <LoginForm />
      </Card>
    </section>
  );
}
