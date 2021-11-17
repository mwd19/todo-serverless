import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { createLogger } from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic

const logger = createLogger('AttachementUtils')

export class AttachmentUtils {
  constructor(
    private readonly s3Client = new XAWS.S3({
      signatureVersion: 'v4'
    }),
    private readonly images_bucket = process.env.ATTACHMENT_S3_BUCKET,
    private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
  ) { }

  createAttachmentPresignedUrl(todoId: string): string {
    const signedUrl = this.s3Client.getSignedUrl('putObject', {
      Bucket: this.images_bucket,
      Key: todoId,
      Expires: parseInt(this.urlExpiration)
    })
    logger.info("Signed url: ", { signedUrl, todoId })
    return signedUrl.split("?")[0]
  }
}