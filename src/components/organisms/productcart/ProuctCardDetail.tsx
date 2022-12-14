import { MuiThemeProps } from '@Atoms/themes/theme'
import FlexBox from '@Atoms/ui/FlexBox'
import LapstoreCard from '@Atoms/ui/LapstoreCard'
import LazyImage from '@Atoms/ui/LazyImage'
import { H3, Span } from '@Atoms/utils/Typography'
import { Box, Chip, Dialog, DialogContent, IconButton } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import { CSSProperties, makeStyles } from '@material-ui/styles'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { formatVND, linkToName } from 'utils'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  getProductDetail,
  productDetailActions,
} from '../../../../store/slices/productBySubSlice'
import ProductIntro from '../products/ProductIntro'

export interface ProductCardDetailProps {
  className?: string
  style?: CSSProperties
  hoverEffect?: boolean
  productName: string
  productThumbnail: string
  description: string
  price: number
  rating: number
  discount: number
  status: number
  quantity: number
  _id?: string
}

const useStyles = makeStyles(({ palette, ...theme }: MuiThemeProps) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    margin: 'auto',
    overflow: 'hidden',
    transition: 'all 250ms ease-in-out',
    borderRadius: '8px',

    '&:hover': {
      '& $imageHolder': {
        '& .extra-icons': {
          display: 'flex',
        },
      },
    },

    '@media only screen and (max-width: 768px)': {
      '& $imageHolder': {
        '& .extra-icons': {
          display: 'flex',
        },
      },
    },
  },
  imageHolder: {
    position: 'relative',
    display: 'inlin-block',
    textAlign: 'center',

    '& .extra-icons': {
      display: 'none',
      flexDirection: 'column',
      position: 'absolute',
      top: '7px',
      right: '15px',
      cursor: 'pointer',
      zIndex: 2,
    },

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  offerChip: {
    position: 'absolute',
    fontSize: '10px',
    fontWeight: 600,
    paddingLeft: 3,
    paddingRight: 3,
    top: '10px',
    left: '10px',
  },
  details: {
    padding: '1rem',

    '& .title, & .categories': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    '& .icon-holder': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },

    '& .favorite-icon': {
      cursor: 'pointer',
    },
  },
  dialogContent: {
    paddingBottom: '1.25rem',
  },
}))

const ProductCardDetail: React.FC<ProductCardDetailProps> = ({
  _id,
  productThumbnail,
  productName,
  price,
  discount,
  hoverEffect,
}) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const classes = useStyles({ hoverEffect })

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  const productDetail = useAppSelector(getProductDetail)

  useEffect(() => {
    _id && dispatch(productDetailActions.fetchProductDetail(_id))
  }, [dispatch])

  return (
    <LapstoreCard className={classes.root} hoverEffect={hoverEffect}>
      <div className={classes.imageHolder}>
        {!!discount && (
          <Chip
            className={classes.offerChip}
            color="primary"
            size="small"
            label={`${discount}% off`}
          />
        )}

        <div className="extra-icons">
          <IconButton sx={{ p: '6px' }} onClick={toggleDialog}>
            <RemoveRedEye color="secondary" fontSize="small" />
          </IconButton>
        </div>

        <Link href={`/product/${linkToName(productName)}-sku.${_id}`}>
          <a>
            <LazyImage
              src={productThumbnail}
              width="100%"
              height="auto"
              layout="responsive"
              alt={productName}
            />
          </a>
        </Link>
      </div>

      <div className={classes.details}>
        <Box>
          <Box height="40px">
            <Link href={`/product/${linkToName(productName)}-sku.${_id}`}>
              <a>
                <H3
                  className="title"
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  color="text.secondary"
                  title={productName}
                >
                  {productName}
                </H3>
              </a>
            </Link>
          </Box>

          <FlexBox height="70px">
            <Box flex="1 1 0" minWidth="0px" mr={1}>
              <Box alignItems="center" mt={0.5}>
                <Box pr={1} fontWeight="600" color="primary.main">
                  {formatVND(price - (price * discount) / 100)}
                </Box>
                {!!discount && (
                  <Box color="grey.600" fontWeight="600">
                    <del>{formatVND(price)}</del>
                    <Span ml={2} color={'primary.main'}>
                      {discount}%
                    </Span>
                  </Box>
                )}
              </Box>
            </Box>
          </FlexBox>
        </Box>
      </div>

      <Dialog open={open} maxWidth={false} onClose={toggleDialog}>
        <DialogContent className={classes.dialogContent}>
          <ProductIntro imgUrl={[productThumbnail]} productDetail={productDetail} />
          <IconButton
            sx={{ position: 'absolute', top: '0', right: '0' }}
            onClick={toggleDialog}
          >
            <Close className="close" fontSize="small" color="primary" />
          </IconButton>
        </DialogContent>
      </Dialog>
    </LapstoreCard>
  )
}

ProductCardDetail.defaultProps = {
  productName: 'ASUS ROG Strix G15',
  productThumbnail: '/assets/images/products/macbook.png',
  price: 450,
  rating: 0,
  discount: 20,
}
export default ProductCardDetail
