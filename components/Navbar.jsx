"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders} from "next-auth/react"
import { useRouter } from "next/navigation"

const Navbar = () => {
    const {data: session } = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }

        setUpProviders()
    }, [])

    useEffect(() => {
		if (!session) router.push('/');
	}, [session]);

    return (
        <nav className="sticky top-0 flex-between w-full mb-16 py-2 px-4">
            <Link href="/" className="flex gap-2 flex-center">
                <Image 
                    src="/assets/images/innovation.png"
                    alt="AI Prompt Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                />
                <p className="logo_text">AI Prompts</p>
            </Link>
            
            {/* Desktop navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link
                            href="/create-prompt"
                            className="black_btn"
                        >
                            Create Prompt
                        </Link>
                        
                        <button 
                            type="button"
                            onClick={signOut}
                            className="outline_btn"
                        >
                            Sign out
                        </button>

                        <Link 
                            href="/profile"
                        >
                            <Image
                                src={session?.user.image} 
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile-picture"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                    {providers && 
                        Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign In 
                            </button>
                        ))
                    }
                    </>
                )}

            </div>

            {/* Mobile navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user.image} 
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile-picture"
                            onClick={() => setToggleDropDown((prev) => !prev)}
                        />

                        {toggleDropDown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    Create Prompt
                                </Link>
                                
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropDown(false)
                                        signOut()
                                    }}
                                    className="black_btn"
                                >
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                    {providers && 
                        Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign In 
                            </button>
                        ))
                    }
                    </>
                )}
            </div>
        
        </nav>
    )
}

export default Navbar