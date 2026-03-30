import OnboardingLayoutTemplate from '@/layouts/onboard/simple-layout';

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <OnboardingLayoutTemplate>
            {children}
        </OnboardingLayoutTemplate>
    );
}
