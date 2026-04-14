import {requireAuth} from "@/lib/auth-utils";

const Dashboard = async () => {
  await requireAuth();

  return <div>Dashboard</div>;
};

export default Dashboard;
