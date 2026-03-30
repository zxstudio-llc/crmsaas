import { Head, Link, useForm } from '@inertiajs/react';

export default function Welcome() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    return (
        <>
            <Head title="Welcome to ListenUp!" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: 'DM Sans', sans-serif; background: #fff; }
            `}</style>

            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '48px 16px 32px',
                background: '#fff',
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#111', letterSpacing: '-0.3px' }}>
                        listenup.ai
                    </span>
                </div>

                {/* Main Card */}
                <div style={{
                    width: '100%',
                    maxWidth: '900px',
                    display: 'flex',
                    borderRadius: '16px',
                    border: '1px solid #e8e8e8',
                    overflow: 'hidden',
                    boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
                    minHeight: '480px',
                }}>
                    {/* Left: Auth Form */}
                    <div style={{
                        flex: '0 0 380px',
                        padding: '48px 40px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '16px',
                        borderRight: '1px solid #e8e8e8',
                    }}>
                        {/* Google Sign In */}
                        <Link
                            href="/auth/google"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                padding: '11px 20px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                background: '#fff',
                                color: '#333',
                                fontSize: '14px',
                                fontWeight: '500',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#f9f9f9')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
                                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                            </svg>
                            Sign in with Google
                        </Link>

                        {/* Divider */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
                            <div style={{ flex: 1, height: '1px', background: '#ebebeb' }} />
                            <span style={{ fontSize: '12px', color: '#aaa', fontWeight: '400' }}>or</span>
                            <div style={{ flex: 1, height: '1px', background: '#ebebeb' }} />
                        </div>

                        {/* Email Input */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#aaa',
                                }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your work email address"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '11px 14px 11px 38px',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        color: '#222',
                                        outline: 'none',
                                        background: '#fff',
                                        fontFamily: 'DM Sans, sans-serif',
                                    }}
                                    onFocus={e => (e.currentTarget.style.borderColor = '#3b82f6')}
                                    onBlur={e => (e.currentTarget.style.borderColor = '#e0e0e0')}
                                />
                            </div>

                            <Link
                                href="/login"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '11px 20px',
                                    background: '#2563eb',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    transition: 'background 0.15s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = '#1d4ed8')}
                                onMouseLeave={e => (e.currentTarget.style.background = '#2563eb')}
                            >
                                Continue
                            </Link>
                        </div>

                        <p style={{ fontSize: '11px', color: '#aaa', lineHeight: '1.6', marginTop: '8px' }}>
                            By inserting your email you confirm you agree to listenup.ai contacting you about our product and services. You can opt out at any time.
                        </p>

                        <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                            <Link href="/onboarding" style={{ fontSize: '13px', color: '#666', textDecoration: 'none', borderBottom: '1px solid #ddd' }}>
                                Create account
                            </Link>
                        </div>
                    </div>

                    {/* Right: Value Prop */}
                    <div style={{
                        flex: 1,
                        padding: '48px 44px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '16px',
                        background: '#fafafa',
                    }}>
                        <h1 style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            color: '#111',
                            letterSpacing: '-0.5px',
                            lineHeight: '1.3',
                        }}>
                            Welcome to ListenUp.
                        </h1>
                        <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', fontWeight: '400' }}>
                            ListenUp is a radically new type of CRM. Built on an entirely new type of data architecture, you'll have profiles and records of every interaction within your network in minutes, always updated in real-time.
                        </p>
                        <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', fontWeight: '400' }}>
                            You'll be able to customize and create your CRM <em>exactly</em> as you want it.
                        </p>
                        <p style={{ fontSize: '15px', color: '#111', fontWeight: '500' }}>
                            Let's begin.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#aaa' }}>© 2024 ListenUp Limited</span>
                    <Link href="/privacy" style={{ fontSize: '12px', color: '#888', textDecoration: 'underline' }}>Privacy Policy</Link>
                    <Link href="/support" style={{ fontSize: '12px', color: '#888', textDecoration: 'underline' }}>Support</Link>
                </div>
            </div>
        </>
    );
}