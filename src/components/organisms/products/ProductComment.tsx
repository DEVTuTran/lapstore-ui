import FlexBox from '@Atoms/ui/FlexBox'
import LapstoreAvatar from '@Atoms/ui/LapstoreAvatar'
import { H5, Paragraph, Span } from '@Atoms/utils/Typography'
import { getDateDifference } from '@Atoms/utils/utils'
import { Box } from '@material-ui/core'
import { Review } from '@Models/review'
import LapstoreRating from '@Molecules/rating/LapstoreRating'
import React from 'react'

export interface ProductCommentProps {
  reviews: Review
}

const ProductComment: React.FC<ProductCommentProps> = ({ reviews }) => {
  const { userName, userAvatar, rating, review, createdAt } = reviews
  return (
    <Box mb={4} maxWidth="600px">
      <FlexBox alignItems="center" mb={2}>
        <LapstoreAvatar src={userAvatar} height={48} width={48} />
        <Box ml={2}>
          <H5 mb={0.5}>{userName}</H5>
          <FlexBox alignItems="center">
            <LapstoreRating value={rating} color="warn" readOnly />
            <Span ml={2}>{getDateDifference(createdAt || '')}</Span>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color="grey.700">{review}</Paragraph>
    </Box>
  )
}

export default ProductComment
