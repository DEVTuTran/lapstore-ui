import LapstoreCard from '@Atoms/ui/LapstoreCard'
import Image from '@Atoms/ui/LapstoreImage'
import FlexBox from '@Atoms/ui/FlexBox'
import LazyImage from '@Atoms/ui/LazyImage'
import NavLink from '@Molecules/navlink/NavLink'
import { H3, Small } from '@Atoms/utils/Typography'
import { Box, Grid } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import StyledMegaMenu from './StyledMegaMenu'

interface Image {
  imgUrl: string
  href: string
}

interface SubCategory {
  title: string
  href: string
}

interface Category {
  title: string
  href?: string
  subCategories: SubCategory[]
}

interface MegaMenu {
  categories: Category[]
  rightImage?: Image
}

interface MegaMenuProps {
  data: MegaMenu
  minWidth?: string
}

const MegaMenu3: React.FC<MegaMenuProps> = ({
  data: { categories, rightImage },
  minWidth,
}) => {
  return categories ? (
    <StyledMegaMenu>
      <LapstoreCard sx={{ ml: '1rem', minWidth }} elevation={2}>
        <FlexBox px={2.5} py={1.75}>
          <Box flex="1 1 0">
            <Grid container spacing={4}>
              {categories?.map((item, ind) => (
                <Grid item md={3} key={ind}>
                  {item.href ? (
                    <NavLink className="title-link" href={item.href}>
                      {item.title}
                    </NavLink>
                  ) : (
                    <Box className="title-link">{item.title}</Box>
                  )}
                  {item.subCategories?.map((sub, ind) => (
                    <NavLink className="child-link" href={sub.href} key={ind}>
                      {sub.title}
                    </NavLink>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Box>

          {rightImage && (
            <Link href={rightImage.href}>
              <a>
                <Box position="relative" width="153px" height="100%">
                  <LazyImage
                    src={rightImage.imgUrl}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              </a>
            </Link>
          )}
        </FlexBox>

        <Link href="/sale-page-2">
          <a>
            <Grid
              className="h-full"
              container
              spacing={0}
              wrap="wrap-reverse"
              alignItems="center"
            >
              <Grid item sm={6} xs={12}>
                <Box px={2.5}>
                  <H3 mb={1}>Big Sale Upto 60% Off</H3>

                  <Box color="grey.600" mb={1}>
                    Handcrafted from genuine Italian Leather
                  </Box>

                  <Small
                    fontWeight="700"
                    borderBottom="2px solid"
                    borderColor="primary.main"
                  >
                    SHOP NOW
                  </Small>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FlexBox
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="160px"
                  position="relative"
                >
                  <LazyImage
                    layout="fill"
                    objectFit="cover"
                    src="/images/models/model-1.png"
                    alt="model"
                  />
                </FlexBox>
              </Grid>
            </Grid>
          </a>
        </Link>
      </LapstoreCard>
    </StyledMegaMenu>
  ) : null
}

MegaMenu3.defaultProps = {
  minWidth: '760px',
}

export default MegaMenu3
