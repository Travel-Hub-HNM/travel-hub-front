import Header from '@/widgets/Header'

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}

export default HeaderLayout
