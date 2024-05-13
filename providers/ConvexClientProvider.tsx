"use client";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import { Loading } from "@/components/ui/auth/loading";


const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

interface ConvexClientProviderProps {
    children: React.ReactNode;
}

export default function ConvexClientProvider({
    children,
}: ConvexClientProviderProps) {
    return (
        <ClerkProvider publishableKey={publishableKey}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <Authenticated>
                    {children}
                </Authenticated>
                <AuthLoading>
                    <Loading />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}