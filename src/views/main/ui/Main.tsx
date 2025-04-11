import { SearchSection } from '@/features/search'
import { Box, CardList, CustomTabs, Heading } from '@/shared/ui'

const Main = () => {
    return (
        <Box className="flex-col gap-2">
            <Heading>어디로 여행을 떠나시나요?</Heading>
            <SearchSection />
            <CustomTabs
                defaultValue="all"
                options={[
                    { value: 'all', label: '전체', content: <CardList /> },
                    { value: 'local', label: '국내', content: <CardList /> },
                    { value: 'global', label: '해외', content: <CardList /> },
                ]}
            />
        </Box>
    )
}

export { Main }
