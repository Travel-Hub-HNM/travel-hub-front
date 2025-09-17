import { api, HTTP_METHOD } from '@/shared/api'
import { IMAGE_UPLOAD_API_KEY } from '@/shared/api/endpoints/image/apiKeys'
import { IImageUploadReq, IImageUploadRes } from '@/shared/api/endpoints/image/type'
import { queryStringify } from '@/shared/lib/utils'

const useImageUploadQuery = {
    upload: (queryParams: IImageUploadReq) =>
        api.mutate<IImageUploadRes>({
            mutationKey: [IMAGE_UPLOAD_API_KEY, queryParams],
            mutationFn: async (params) =>
                api.send({
                    method: HTTP_METHOD.POST,
                    url: queryStringify(IMAGE_UPLOAD_API_KEY.UPLOAD, queryParams),
                    data: params,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }),
        }),
}

export default Object.freeze(useImageUploadQuery)
