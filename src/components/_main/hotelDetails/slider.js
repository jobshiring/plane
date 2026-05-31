'use client';
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './thumbs';
import Box from '@mui/material/Box';
import Image from 'next/image';

const EmblaCarousel = ({ slides, options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <Box>
      {/* Main carousel */}
      <Box ref={emblaMainRef} sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            touchAction: 'pan-y pinch-zoom',
            ml: '-1rem',
          }}
        >
          {slides.map((index) => (
            <Box
              key={index}
              sx={{
                flex: '0 0 100%',
                minWidth: 0,
                pl: '1rem',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <Box
                sx={{
                  boxShadow: 'inset 0 0 0 0.2rem #999',
                  borderRadius: '1rem',

                  height: '29rem',
                  userSelect: 'none',
                  position: 'relative',
                  img: {
                    borderRadius: '1rem',
                    zIndex: 0,
                  },
                }}
              >
                <Image
                  alt="hotel"
                  src={require('public/images/cities/Cairo.jpg')}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                  priority
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Thumbnails */}
      <Box sx={{ mt: '0.8rem' }}>
        <Box ref={emblaThumbsRef} sx={{ overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              ml: '-0.8rem',
            }}
          >
            {slides.map((index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmblaCarousel;
