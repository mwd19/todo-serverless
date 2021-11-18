import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createAttachmentPresignedUrl } from '../../helpers/todos'
import { getUserId } from '../utils'

import { createLogger } from '../../utils/logger'

const logger = createLogger('Generate upload Url')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    if (!todoId) {
      logger.error('missing todoId')
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing todoId"
        })
      }
    }

    const attachementUrl = await createAttachmentPresignedUrl(todoId, userId)

    logger.info('Created url: ', { attachementUrl })

    return {
      statusCode: 201,
      body: JSON.stringify({
        uploadUrl: attachementUrl
      })

    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
