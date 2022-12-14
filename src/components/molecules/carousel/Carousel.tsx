import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { CSSProperties, makeStyles } from '@material-ui/styles'
import { MuiThemeProps } from '@Atoms/themes/theme'
import clsx from 'clsx'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  Slide,
  Slider,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import React, { Fragment, ReactNode } from 'react'

export interface CarouselProps {
  naturalSlideWidth?: number
  naturalSlideHeight?: number
  totalSlides: number
  visibleSlides?: number
  currentSlide?: number
  isIntrinsicHeight?: boolean
  hasMasterSpinner?: boolean
  infinite?: boolean
  autoPlay?: boolean
  step?: number
  interval?: number
  showDots?: boolean
  showArrow?: boolean
  showArrowOnHover?: boolean
  dotClass?: string
  dotColor?: string
  dotGroupMarginTop?: string
  spacing?: string
  arrowButtonColor?: 'primary' | 'secondary' | 'inherit'
  arrowButtonClass?: string
  leftButtonClass?: string
  rightButtonClass?: string
  leftButtonStyle?: CSSProperties
  rightButtonStyle?: CSSProperties
  children: ReactNode
}

const useStyles = makeStyles(({ palette, breakpoints }: MuiThemeProps) => ({
  root: {
    position: 'relative',
    minWidth: 0,

    '& .focusRing___1airF.carousel__slide-focus-ring': {
      outline: 'none !important',
    },

    '& .carousel__inner-slide': {
      margin: 'auto',
      width: (props: any) => `calc(100% - ${props.spacing || '0px'})`,
    },

    '&:hover $arrowButton': {
      display: 'flex',
    },
  },

  slider: (props: any) => ({
    marginLeft: `calc(-1 * ${props.spacing || '0px'} / 2)`,
    marginRight: `calc(-1 * ${props.spacing || '0px'} / 2)`,
  }),

  dotGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: (props: any) => props.dotGroupMarginTop || '0px',
  },

  dot: {
    position: 'relative',
    height: 9,
    width: 9,
    borderRadius: '50%',
    margin: '0.25rem',
    cursor: 'pointer',
    background: (props: any) => props.dotColor || palette.secondary.main,
    opacity: '0.6',
    '&:after': {
      position: 'absolute',
      content: '""',
      alignItems: 'center',
      height: 9,
      width: 9,
      top: '50%',
      left: '50%',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%) scaleX(0)',
      background: 'white',
      opacity: '1',
    },
  },

  dotActive: {
    '&:after': {
      transform: 'translate(-50%, -50%) scaleX(1)',
    },
  },

  arrowButton: {
    display: (props: any) => (props.showArrowOnHover ? 'none' : 'flex'),
    position: 'absolute',
    transform: 'translateY(-50%)',
    border: 0,
    borderRadius: '50%',
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    top: 'calc(50%)',
    background: 'transparent',
    color: '#fff',
    '&:disabled': {
      color: palette.secondary.main,
      cursor: 'not-allowed',
    },
    '&:hover:not(:disabled)': {
      color: palette.secondary.contrastText,
    },

    [breakpoints.down('xs')]: {
      display: 'block !important',
    },
  },

  rightArrowButton: {
    right: '0',
  },

  leftArrowButton: {
    left: '0',
  },

  [breakpoints.down('md')]: {
    rightArrowButton: {
      right: -16,
    },
    leftArrowButton: {
      left: -16,
    },
  },
}))

const Carousel: React.FC<CarouselProps> = ({
  children,
  naturalSlideWidth,
  naturalSlideHeight,
  totalSlides,
  visibleSlides,
  currentSlide,
  isIntrinsicHeight,
  hasMasterSpinner,
  infinite,
  autoPlay,
  step,
  interval,
  showDots,
  showArrow,
  showArrowOnHover,
  dotClass,
  dotColor,
  dotGroupMarginTop,
  spacing,
  arrowButtonClass,
  leftButtonClass,
  rightButtonClass,
  leftButtonStyle,
  rightButtonStyle,
}) => {
  const classes = useStyles({
    spacing,
    dotColor,
    showDots,
    dotGroupMarginTop,
    showArrowOnHover,
  })

  return (
    <CarouselProvider
      className={classes.root}
      naturalSlideWidth={naturalSlideWidth || 100}
      naturalSlideHeight={naturalSlideHeight || 125}
      totalSlides={totalSlides}
      visibleSlides={visibleSlides}
      isIntrinsicHeight={isIntrinsicHeight}
      hasMasterSpinner={hasMasterSpinner}
      infinite={infinite}
      isPlaying={autoPlay}
      step={step}
      interval={interval}
      currentSlide={currentSlide}
    >
      <Slider className={classes.slider}>
        {React.Children.map(children, (child, ind) => (
          <Slide index={ind}>{child}</Slide>
        ))}
      </Slider>

      {showDots && (
        <DotGroup
          className={clsx(classes.dotGroup, dotClass)}
          renderDots={(props: any) => renderDots({ ...props, step, classes })}
        />
      )}

      {showArrow && (
        <Fragment>
          <ButtonBack
            className={clsx(
              classes.arrowButton,
              classes.leftArrowButton,
              arrowButtonClass,
              leftButtonClass
            )}
            style={leftButtonStyle || {}}
          >
            <KeyboardArrowLeft fontSize="small" color="inherit" />
          </ButtonBack>

          <ButtonNext
            className={clsx(
              classes.arrowButton,
              classes.rightArrowButton,
              arrowButtonClass,
              rightButtonClass
            )}
            style={rightButtonStyle || {}}
          >
            <KeyboardArrowRight fontSize="small" color="inherit" />
          </ButtonNext>
        </Fragment>
      )}
    </CarouselProvider>
  )
}

const renderDots = ({
  classes,
  step,
  currentSlide,
  visibleSlides,
  totalSlides,
  carouselStore,
}: any) => {
  const dots = []
  const total = totalSlides - visibleSlides + 1

  for (let i = 0; i < total; i += step) {
    dots.push(
      <div
        key={i}
        className={clsx({
          [classes.dot]: true,
          [classes.dotActive]: currentSlide === i,
        })}
        onClick={() =>
          carouselStore.setStoreState({
            currentSlide: i,
            autoPlay: false,
          })
        }
      />
    )

    if (total - i - 1 < step && total - i - 1 !== 0) {
      dots.push(
        <div
          key={i + total}
          className={clsx({
            [classes.dot]: true,
            [classes.dotActive]: currentSlide === totalSlides - visibleSlides,
          })}
          onClick={() =>
            carouselStore.setStoreState({
              currentSlide: totalSlides - visibleSlides,
              autoPlay: false,
            })
          }
        />
      )
    }
  }
  return dots
}

Carousel.defaultProps = {
  naturalSlideWidth: 100,
  naturalSlideHeight: 125,
  totalSlides: 10,
  visibleSlides: 5,
  isIntrinsicHeight: true,
  hasMasterSpinner: false,
  infinite: false,
  autoPlay: false,
  step: 1,
  interval: 2000,
  showDots: false,
  showArrow: true,
  dotGroupMarginTop: '2rem',
  spacing: '1.5rem',
  arrowButtonColor: 'secondary',
}

export default Carousel
