import { Link } from "@inertiajs/react";
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';

export default function OnboardingSimpleLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col items-center bg-background px-6 py-6 md:px-10 md:py-8 overflow-hidden">

            <div className="flex h-full w-full max-w-6xl flex-col overflow-hidden">

                {/* Logo */}
                <div className="flex justify-center py-4 shrink-0">
                    <Link href={home()} className="flex items-center gap-2 font-medium">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md">
                            <AppLogoIcon className="size-9 fill-current text-foreground dark:text-white" />
                        </div>
                    </Link>
                </div>

                {/* Content (THIS IS THE KEY) */}
                <div className="flex-1 flex items-center justify-center ">
                    {children}
                </div>

                {/* Footer */}
                <div className="flex justify-center gap-6 py-4 text-xs text-muted-foreground shrink-0">
                    <span>© 2024 ListenUp</span>
                    <a href="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy</a>
                    <a href="/support" className="underline underline-offset-4 hover:text-foreground">Support</a>
                    <a href="/login" className="underline underline-offset-4 hover:text-foreground">Sign out</a>
                </div>

            </div>
        </div>
    );
}