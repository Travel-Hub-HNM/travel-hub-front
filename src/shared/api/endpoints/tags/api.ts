import { api } from '@/shared/api'
import { TAGS_API_KEY } from '@/shared/api/endpoints/tags/apiKeys'
import { ITagListRes } from '@/shared/api/endpoints/tags/type'

const useTagsQuery = {
    list: () =>
        api.query<ITagListRes>({
            queryKey: [TAGS_API_KEY.LIST],
            queryFn: async () => api.send({ url: TAGS_API_KEY.LIST }),
        }),
}

export default Object.freeze(useTagsQuery)
