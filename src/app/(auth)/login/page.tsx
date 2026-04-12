import prisma from "@/lib/db";

const Login = async () => {
  const users = await prisma.user.findMany();

  return (
    <div>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
};

export default Login;
