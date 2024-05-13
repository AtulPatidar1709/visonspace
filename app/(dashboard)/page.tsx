import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>
                Protected Route
            </h1>
            <UserButton />
        </main>
    );
}

export default DashboardPage;
