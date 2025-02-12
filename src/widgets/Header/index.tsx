import Link from 'next/link'

const Header = () => {
    return (
        <header className="flex items-center justify-between h-12 px-10 bg-primary">
            <Link href="/">
                <h1 className="text-xl font-bold cursor-pointer">Travel Hub</h1>
            </Link>
            {/* <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>메뉴1</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>메뉴2</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink>
                                <CircleUserRound />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu> */}
        </header>
    )
}

export default Header
